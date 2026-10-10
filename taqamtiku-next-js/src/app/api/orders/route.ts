import { NextRequest, NextResponse } from "next/server";
import { createOrder, type CartItemInput } from "@/lib/orders/createOrder";

export async function POST(req: NextRequest) {
  let body: {
    tableNumber?: unknown;
    items?: unknown;
    note?: unknown;
    paymentMethod?: unknown;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { tableNumber, items, note, paymentMethod } = body;

  if (typeof tableNumber !== "string" || !tableNumber.trim()) {
    return NextResponse.json({ error: "Numéro de table manquant." }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Le panier est vide." }, { status: 400 });
  }
  if (paymentMethod !== "wave" && paymentMethod !== "counter") {
    return NextResponse.json({ error: "Méthode de paiement invalide." }, { status: 400 });
  }

  try {
    const result = await createOrder({
      tableNumber,
      items: items as CartItemInput[],
      note: typeof note === "string" ? note : undefined,
      paymentMethod,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to create order", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
