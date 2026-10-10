"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { browserClient } from "@/sanity/browserClient";
import { KITCHEN_ORDERS_QUERY, type KitchenOrder } from "@/lib/queries/kitchenOrders";

const COLUMNS: { status: KitchenOrder["status"]; label: string; barClass: string }[] = [
  { status: "received", label: "Reçue", barClass: "bg-[#d5484a]" },
  { status: "preparing", label: "En préparation", barClass: "bg-[#e0762f]" },
  { status: "ready", label: "Prête", barClass: "bg-[#3fb27f]" },
  { status: "served", label: "Servie", barClass: "bg-[#b9c0c1]" },
];

const NEXT_STATUS: Partial<Record<KitchenOrder["status"], KitchenOrder["status"]>> = {
  received: "preparing",
  preparing: "ready",
  ready: "served",
};

const ACTION_LABEL: Partial<Record<KitchenOrder["status"], string>> = {
  received: "Démarrer",
  preparing: "Marquer prête",
  ready: "Marquer servie",
};

export default function OrderQueueBoard({
  initialOrders,
  since,
}: {
  initialOrders: KitchenOrder[];
  since: string;
}) {
  const [orders, setOrders] = useState<KitchenOrder[]>(initialOrders);

  useEffect(() => {
    const subscription = browserClient
      .listen<KitchenOrder>(KITCHEN_ORDERS_QUERY, { since }, { includeResult: true })
      .subscribe((event) => {
        if (event.type !== "mutation") return;

        setOrders((current) => {
          if (event.transition === "disappear") {
            return current.filter((order) => order._id !== event.documentId);
          }
          if (!event.result) return current;
          const result = event.result;
          const next = current.filter((order) => order._id !== result._id);
          next.push(result);
          return next.sort((a, b) => a._createdAt.localeCompare(b._createdAt));
        });
      });

    return () => subscription.unsubscribe();
  }, [since]);

  const advanceStatus = async (order: KitchenOrder) => {
    const next = NEXT_STATUS[order.status];
    if (!next) return;
    await fetch(`/api/orders/${order._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
  };

  const columns = useMemo(
    () =>
      COLUMNS.map((column) => ({
        ...column,
        orders: orders.filter((order) => order.status === column.status),
      })),
    [orders],
  );

  return (
    <div className="grid flex-1 grid-cols-4 gap-4.5 overflow-hidden p-5.5">
      {columns.map((column) => (
        <div key={column.status} className="flex min-h-0 flex-col gap-3.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs tracking-wide uppercase">{column.label}</span>
            <span className="rounded-full bg-card px-2.5 py-0.5 text-xs font-bold text-muted-foreground">
              {column.orders.length}
            </span>
          </div>
          <div className={`mx-1 h-1 rounded-full ${column.barClass}`} />
          <div className="flex flex-col gap-3 overflow-y-auto pb-1.5">
            {column.orders.map((order) => (
              <OrderCard key={order._id} order={order} onAdvance={advanceStatus} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderCard({
  order,
  onAdvance,
}: {
  order: KitchenOrder;
  onAdvance: (order: KitchenOrder) => void;
}) {
  const isDone = order.status === "served";
  const actionLabel = ACTION_LABEL[order.status];

  return (
    <div
      className={`flex flex-col gap-2.5 rounded-2xl bg-card p-3.5 shadow-sm ${isDone ? "opacity-55" : ""}`}
    >
      <Link href={`/admin/kitchen/${order._id}`} className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-extrabold text-foreground">
            Table {order.table?.number ?? "?"}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(order._createdAt).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 text-xs text-foreground">
          {order.items.slice(0, 3).map((item, index) => (
            <div key={index}>
              <span className="text-muted-foreground">{item.quantity}x</span> {item.title}
            </div>
          ))}
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
            order.paymentStatus === "paid"
              ? "bg-[#1dc8e6]/15 text-[#0f8ea3]"
              : "bg-[#f4f2ea] text-muted-foreground"
          }`}
        >
          {order.paymentStatus === "paid"
            ? `Payé · ${order.paymentMethod === "wave" ? "Wave" : "Comptoir"}`
            : "À encaisser"}
        </span>
        {actionLabel && (
          <button
            type="button"
            onClick={() => onAdvance(order)}
            className="rounded-lg bg-dark px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-primary uppercase"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
