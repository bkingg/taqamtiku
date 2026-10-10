import "server-only";

import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import { writeClient } from "@/sanity/writeClient";
import { nextOrderNumber } from "./orderNumber";

export interface CartItemInput {
  itemKey: string;
  categoryKey: string;
  quantity: number;
  lineNote?: string;
}

export interface CreateOrderInput {
  tableNumber: string;
  items: CartItemInput[];
  note?: string;
  paymentMethod: "wave" | "counter";
}

export interface CreateOrderResult {
  orderId: string;
  orderNumber: string;
  total: number;
}

const MENU_QUERY = groq`*[_type == "restaurantMenu"][0]{
  categories[]{items[]{_key, title, price}}
}`;

interface MenuQueryResult {
  categories?: { items?: { _key: string; title: string; price: number }[] }[];
}

/**
 * Creates an order document. Prices are always looked up server-side from
 * the live menu document — a client-submitted price is never trusted.
 */
export async function createOrder(
  input: CreateOrderInput,
): Promise<CreateOrderResult> {
  if (!input.items.length) {
    throw new Error("Le panier est vide.");
  }

  const menu = await client.fetch<MenuQueryResult>(MENU_QUERY);
  const priceByItemKey = new Map<string, { title: string; price: number }>();
  for (const category of menu?.categories ?? []) {
    for (const item of category.items ?? []) {
      priceByItemKey.set(item._key, { title: item.title, price: item.price });
    }
  }

  const lineItems = input.items.map((line) => {
    const menuItem = priceByItemKey.get(line.itemKey);
    if (!menuItem) {
      throw new Error(`Article introuvable dans le menu (${line.itemKey}).`);
    }
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
      throw new Error("Quantité invalide.");
    }
    return {
      _type: "orderLineItem" as const,
      _key: line.itemKey,
      itemKey: line.itemKey,
      categoryKey: line.categoryKey,
      title: menuItem.title,
      unitPrice: menuItem.price,
      quantity: line.quantity,
      lineNote: line.lineNote,
    };
  });

  const total = lineItems.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );

  const [orderNumber, tableId] = await Promise.all([
    nextOrderNumber(),
    findOrCreateTable(input.tableNumber),
  ]);

  const created = await writeClient.create({
    _type: "order",
    orderNumber,
    table: { _type: "reference", _ref: tableId },
    items: lineItems,
    note: input.note,
    subtotal: total,
    total,
    status: "received",
    paymentMethod: input.paymentMethod,
    paymentStatus: "pending",
    posSyncStatus: "not_synced",
  });

  return { orderId: created._id, orderNumber, total };
}

async function findOrCreateTable(number: string): Promise<string> {
  const existingId = await client.fetch<string | null>(
    groq`*[_type == "restaurantTable" && number == $number][0]._id`,
    { number },
  );
  if (existingId) return existingId;

  const created = await writeClient.create({
    _type: "restaurantTable",
    number,
    qrSlug: { _type: "slug", current: number },
    isActive: true,
  });
  return created._id;
}
