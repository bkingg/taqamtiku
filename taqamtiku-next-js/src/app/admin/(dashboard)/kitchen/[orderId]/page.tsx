import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/client";
import { ORDER_QUERY, type OrderQueryResult } from "@/lib/queries/order";
import { formatFcfa } from "@/lib/formatFcfa";
import AdvanceStatusButton from "@/components/kitchen/AdvanceStatusButton";

const STATUS_LABEL: Record<OrderQueryResult["status"], string> = {
  received: "Reçue",
  preparing: "En préparation",
  ready: "Prête",
  served: "Servie",
};

export default async function KitchenOrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await client.fetch<OrderQueryResult | null>(ORDER_QUERY, {
    id: orderId,
  });

  if (!order) {
    notFound();
  }

  const elapsedMinutes = Math.max(
    0,
    Math.round((Date.now() - new Date(order._createdAt).getTime()) / 60000),
  );

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5.5 p-7">
      <div className="flex items-center gap-3.5">
        <Link
          href="/admin/kitchen"
          className="flex size-9.5 items-center justify-center rounded-lg bg-card shadow-sm"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex-1">
          <div className="text-[11px] tracking-wide text-muted-foreground uppercase">
            Commande #{order.orderNumber}
          </div>
          <h1 className="font-heading text-xl text-foreground">
            Table {order.table?.number ?? "?"}
          </h1>
        </div>
        <span className="rounded-full bg-[#e0762f]/15 px-3.5 py-2 text-[11px] font-bold tracking-wide text-[#e0762f] uppercase">
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <InfoCard
          label="Reçue à"
          value={new Date(order._createdAt).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
        <InfoCard label="Écoulé" value={`${elapsedMinutes} min`} warn={elapsedMinutes >= 15} />
        <InfoCard
          label="Articles"
          value={String(order.items.reduce((sum, item) => sum + item.quantity, 0))}
        />
      </div>

      <div>
        <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
          Détail de la commande
        </span>
        <div className="mt-2.5 rounded-2xl bg-card px-4 shadow-sm">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 border-b border-border py-3.5 last:border-none"
            >
              <div className="flex size-7 flex-none items-center justify-center rounded-lg bg-dark text-xs font-extrabold text-primary">
                {item.quantity}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-foreground">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  {formatFcfa(item.unitPrice)} / unité
                </div>
              </div>
              <div className="text-sm font-bold text-foreground">
                {formatFcfa(item.unitPrice * item.quantity)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-3.5 text-base font-bold text-foreground">
          <span>Total</span>
          <span>{formatFcfa(order.total)}</span>
        </div>
      </div>

      {order.note && (
        <div className="flex gap-2.5 rounded-2xl border border-dashed border-secondary bg-[#fff9e0] p-4">
          <div className="text-xs leading-relaxed">
            <b className="mb-0.5 block text-[11px] tracking-wide text-secondary uppercase">
              Note client
            </b>
            {order.note}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
        <span className="text-sm font-semibold text-foreground">
          Statut de paiement
        </span>
        <span className="rounded-full bg-[#1dc8e6]/15 px-2.5 py-1 text-[10px] font-bold text-[#0f8ea3]">
          {order.paymentStatus === "paid"
            ? `Payé · ${order.paymentMethod === "wave" ? "Wave" : "Comptoir"}`
            : "À encaisser"}
        </span>
      </div>

      <div className="mt-auto">
        <AdvanceStatusButton orderId={order._id} status={order.status} />
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-card p-3.5 shadow-sm">
      <span className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <span className={`text-base font-bold ${warn ? "text-[#e0762f]" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}
