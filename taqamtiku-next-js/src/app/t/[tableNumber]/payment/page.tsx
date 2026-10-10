"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Landmark, ShieldCheck, Waves } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { formatFcfa } from "@/lib/formatFcfa";

export default function PaymentPage({
  params,
}: {
  params: Promise<{ tableNumber: string }>;
}) {
  const { tableNumber } = use(params);
  const cart = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const payAtCounter = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber,
          note: cart.note,
          paymentMethod: "counter",
          items: cart.lines.map((line) => ({
            itemKey: line.itemKey,
            categoryKey: line.categoryKey,
            quantity: line.quantity,
          })),
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Une erreur est survenue. Veuillez réessayer.");
      }
      if (!data?.orderId) {
        throw new Error("Réponse invalide du serveur.");
      }

      cart.clear();
      router.push(`/t/${tableNumber}/confirmation/${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center justify-between rounded-b-2xl bg-dark px-5 pt-5 pb-4 text-bg">
        <Link
          href={`/t/${tableNumber}/cart`}
          className="flex size-9 items-center justify-center rounded-lg bg-white/10"
          aria-label="Retour au panier"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] tracking-[0.2em] text-secondary uppercase">
            Table {tableNumber}
          </span>
          <span className="font-heading text-sm tracking-[0.15em] uppercase">
            Paiement
          </span>
        </div>
        <div className="size-9" />
      </div>

      <div className="flex flex-1 flex-col gap-5.5 px-5 py-6">
        <div className="flex flex-col gap-2 rounded-2xl bg-card p-5 shadow-sm">
          <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            Total à payer
          </span>
          <span className="font-heading text-3xl text-foreground">
            {formatFcfa(cart.total)}
          </span>
          <div className="flex justify-between border-t border-dashed border-border pt-2.5 text-xs text-muted-foreground">
            <span>{cart.count} articles</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            Choisissez un mode de paiement
          </span>

          <button
            type="button"
            disabled
            title="Bientôt disponible"
            className="flex cursor-not-allowed items-center gap-3.5 rounded-2xl bg-[#1dc8e6]/40 p-4 text-left text-white opacity-70"
          >
            <span className="flex size-10.5 flex-none items-center justify-center rounded-xl bg-white/20">
              <Waves className="size-5.5" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-extrabold tracking-wide uppercase">
                Payer avec Wave
              </span>
              <span className="text-xs">Bientôt disponible</span>
            </span>
          </button>

          <div className="flex items-center gap-2.5 text-[11px] tracking-wide text-muted-foreground uppercase">
            <span className="h-px flex-1 bg-border" />
            ou
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={payAtCounter}
            disabled={isSubmitting || cart.lines.length === 0}
            className="flex items-center gap-3.5 rounded-2xl border border-border bg-card p-4 text-left disabled:opacity-60"
          >
            <span className="flex size-10.5 flex-none items-center justify-center rounded-xl bg-[#f4f2ea] text-foreground">
              <Landmark className="size-5.5" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-extrabold tracking-wide text-foreground uppercase">
                {isSubmitting ? "Envoi en cours…" : "Payer au comptoir"}
              </span>
              <span className="text-xs text-muted-foreground">
                Réglez en espèces ou par carte auprès du serveur
              </span>
            </span>
          </button>
        </div>

        {error && (
          <p className="text-center text-xs font-medium text-destructive">
            {error}
          </p>
        )}

        <div className="mt-auto flex items-center justify-center gap-2 px-2 text-center text-[11px] text-muted-foreground">
          <ShieldCheck className="size-3.5 flex-none" />
          Vos informations de paiement restent entre vous et Wave.
        </div>
      </div>
    </div>
  );
}
