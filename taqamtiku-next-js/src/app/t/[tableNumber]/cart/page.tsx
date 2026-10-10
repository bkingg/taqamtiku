"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/CartContext";
import { formatFcfa } from "@/lib/formatFcfa";

export default function CartPage({
  params,
}: {
  params: Promise<{ tableNumber: string }>;
}) {
  const { tableNumber } = use(params);
  const cart = useCart();
  const router = useRouter();
  const [note, setNote] = useState(cart.note);

  const handleContinue = () => {
    cart.setNote(note);
    router.push(`/t/${tableNumber}/payment`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center justify-between rounded-b-2xl bg-dark px-5 pt-5 pb-4 text-bg">
        <Link
          href={`/t/${tableNumber}/menu`}
          className="flex size-9 items-center justify-center rounded-lg bg-white/10"
          aria-label="Retour au menu"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] tracking-[0.2em] text-secondary uppercase">
            Table {tableNumber}
          </span>
          <span className="font-heading text-sm tracking-[0.15em] uppercase">
            Votre commande
          </span>
        </div>
        <div className="size-9" />
      </div>

      {cart.lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Votre panier est vide pour le moment.
          </p>
          <Button
            nativeButton={false}
            render={<Link href={`/t/${tableNumber}/menu`}>Voir le menu</Link>}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-1 flex-col gap-3.5 px-5 pt-4 pb-4">
            {cart.lines.map((line) => (
              <div
                key={line.itemKey}
                className="flex flex-col gap-2 rounded-2xl bg-card p-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">
                    {line.title}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      cart.setQuantity(
                        {
                          itemKey: line.itemKey,
                          categoryKey: line.categoryKey,
                          title: line.title,
                          price: line.price,
                        },
                        0,
                      )
                    }
                    className="text-muted-foreground"
                    aria-label="Retirer l'article"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatFcfa(line.price)} / unité
                  </span>
                  <div className="flex items-center gap-2.5 rounded-full bg-dark px-1 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        cart.setQuantity(
                          {
                            itemKey: line.itemKey,
                            categoryKey: line.categoryKey,
                            title: line.title,
                            price: line.price,
                          },
                          line.quantity - 1,
                        )
                      }
                      className="flex size-6 items-center justify-center rounded-full text-primary"
                      aria-label="Retirer une unité"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="min-w-3 text-center text-xs font-bold text-bg">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        cart.setQuantity(
                          {
                            itemKey: line.itemKey,
                            categoryKey: line.categoryKey,
                            title: line.title,
                            price: line.price,
                          },
                          line.quantity + 1,
                        )
                      }
                      className="flex size-6 items-center justify-center rounded-full text-primary"
                      aria-label="Ajouter une unité"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-1 flex flex-col gap-2">
              <label
                htmlFor="order-note"
                className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
              >
                Une note pour la cuisine ?
              </label>
              <textarea
                id="order-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Ex. sans piment, allergie arachide…"
                className="h-16 resize-none rounded-2xl border border-border bg-card px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60"
              />
            </div>

            <div className="mt-2 flex flex-col gap-2 border-t border-dashed border-border pt-3.5">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Sous-total</span>
                <span>{formatFcfa(cart.total)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground">
                <span>Total</span>
                <span>{formatFcfa(cart.total)}</span>
              </div>
            </div>
          </div>

          <div className="px-5 pb-6">
            <Button
              size="lg"
              className="w-full py-6 text-sm tracking-[0.15em] uppercase"
              onClick={handleContinue}
            >
              Commander — {formatFcfa(cart.total)}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
