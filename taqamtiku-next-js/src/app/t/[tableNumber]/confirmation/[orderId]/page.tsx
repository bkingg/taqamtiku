import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCheck } from "lucide-react";
import { client } from "@/sanity/client";
import { ORDER_QUERY, type OrderQueryResult } from "@/lib/queries/order";
import { formatFcfa } from "@/lib/formatFcfa";

const STATUS_LABEL: Record<OrderQueryResult["status"], string> = {
  received: "En cuisine",
  preparing: "En préparation",
  ready: "Prête",
  served: "Servie",
};

const PAYMENT_LABEL: Record<OrderQueryResult["paymentMethod"], string> = {
  wave: "Wave",
  counter: "Au comptoir",
};

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ tableNumber: string; orderId: string }>;
}) {
  const { tableNumber, orderId } = await params;
  const order = await client.fetch<OrderQueryResult | null>(ORDER_QUERY, {
    id: orderId,
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-7 py-14">
      <div className="mb-5.5 flex size-21 items-center justify-center rounded-full bg-[#3fb27f]/12">
        <div className="flex size-15 items-center justify-center rounded-full bg-[#3fb27f]">
          <CheckCheck className="size-7 text-white" />
        </div>
      </div>

      <h1 className="font-heading text-xl text-foreground">
        Commande envoyée !
      </h1>
      <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
        Votre commande a été transmise en cuisine.
        <br />
        Merci pour votre confiance.
      </p>

      <div className="mt-6.5 flex w-full max-w-sm flex-col gap-3.5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg text-foreground">
            Commande #{order.orderNumber}
          </span>
          <span className="rounded-full bg-dark px-3 py-1.5 text-[10px] font-bold tracking-wide text-primary uppercase">
            {STATUS_LABEL[order.status]}
          </span>
        </div>
        <div className="flex justify-between border-t border-dashed border-border pt-3 text-xs text-muted-foreground">
          <div>
            Table
            <div className="text-sm font-bold text-foreground">
              {order.table?.number ?? tableNumber}
            </div>
          </div>
          <div>
            Paiement
            <div className="text-sm font-bold text-foreground">
              {PAYMENT_LABEL[order.paymentMethod]}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex w-full max-w-sm flex-col gap-2.5">
        <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
          Récapitulatif
        </span>
        {order.items.map((line, index) => (
          <div
            key={index}
            className="flex justify-between text-sm text-foreground"
          >
            <span>
              <span className="text-muted-foreground">{line.quantity}x</span>{" "}
              {line.title}
            </span>
            <span>{formatFcfa(line.unitPrice * line.quantity)}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-dashed border-border pt-2.5 text-base font-bold text-foreground">
          <span>Total</span>
          <span>{formatFcfa(order.total)}</span>
        </div>
      </div>

      <Link
        href={`/t/${tableNumber}/menu`}
        className="mt-8 w-full max-w-sm rounded-2xl border border-dark py-4 text-center text-xs font-bold tracking-[0.15em] text-dark uppercase"
      >
        Retour au menu
      </Link>
    </div>
  );
}
