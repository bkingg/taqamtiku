import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { writeClient } from "@/sanity/writeClient";
import { ORDER_QUERY } from "@/lib/queries/order";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await client.fetch(ORDER_QUERY, { id });

  if (!order) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }

  return NextResponse.json(order);
}

const VALID_STATUSES = ["received", "preparing", "ready", "served"] as const;
const VALID_PAYMENT_STATUSES = ["pending", "paid", "failed"] as const;

// NOTE: not yet auth-protected — this must be locked down to authenticated
// kitchen/admin staff once NextAuth middleware lands (see the ordering
// system plan, Phase 3): protect this route the same way /admin is protected,
// not just the /admin pages themselves.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json().catch(() => null);

  const patch: Record<string, string> = {};

  if (body?.status !== undefined) {
    if (!VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    patch.status = body.status;
  }

  if (body?.paymentStatus !== undefined) {
    if (!VALID_PAYMENT_STATUSES.includes(body.paymentStatus)) {
      return NextResponse.json({ error: "Statut de paiement invalide." }, { status: 400 });
    }
    patch.paymentStatus = body.paymentStatus;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Aucune modification fournie." }, { status: 400 });
  }

  await writeClient.patch(id).set(patch).commit();
  return NextResponse.json({ ok: true });
}
