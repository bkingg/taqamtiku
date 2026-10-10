import { groq } from "next-sanity";

export const KITCHEN_ORDERS_QUERY = groq`*[
  _type == "order" && _createdAt > $since
] | order(_createdAt asc) {
  _id,
  orderNumber,
  status,
  paymentMethod,
  paymentStatus,
  total,
  _createdAt,
  "table": table->{number},
  items[]{title, quantity}
}`;

export interface KitchenOrder {
  _id: string;
  orderNumber: string;
  status: "received" | "preparing" | "ready" | "served";
  paymentMethod: "wave" | "counter";
  paymentStatus: "pending" | "paid" | "failed";
  total: number;
  _createdAt: string;
  table: { number: string } | null;
  items: { title: string; quantity: number }[];
}
