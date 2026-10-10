"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/CartContext";
import { formatFcfa } from "@/lib/formatFcfa";
import type { RestaurantMenuCategory, RestaurantMenuItem } from "@/types";

type MenuItemWithImageUrl = RestaurantMenuItem & { imageUrl: string | null };
type MenuCategoryWithImageUrl = Omit<RestaurantMenuCategory, "items"> & {
  items: MenuItemWithImageUrl[];
};

export default function MenuBrowser({
  tableNumber,
  categories,
}: {
  tableNumber: string;
  categories: MenuCategoryWithImageUrl[];
}) {
  const nonEmptyCategories = useMemo(
    () => categories.filter((category) => category.items?.length > 0),
    [categories],
  );
  const [activeKey, setActiveKey] = useState(
    nonEmptyCategories[0]?._key ?? "",
  );
  const router = useRouter();
  const cart = useCart();

  const activeCategory =
    nonEmptyCategories.find((category) => category._key === activeKey) ??
    nonEmptyCategories[0];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center justify-between rounded-b-2xl bg-dark px-5 pt-5 pb-4 text-bg">
        <button
          type="button"
          onClick={() => router.push(`/t/${tableNumber}`)}
          className="flex size-9 items-center justify-center rounded-lg bg-white/10"
          aria-label="Retour"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] tracking-[0.2em] text-secondary uppercase">
            Table {tableNumber}
          </span>
          <span className="font-heading text-sm tracking-[0.15em] uppercase">
            Menu
          </span>
        </div>
        <Link
          href={`/t/${tableNumber}/cart`}
          className="relative flex size-9 items-center justify-center rounded-lg bg-white/10"
          aria-label="Voir le panier"
        >
          <ShoppingBag className="size-4" />
          {cart.count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {cart.count}
            </span>
          )}
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto px-5 pt-4 pb-3">
        {nonEmptyCategories.map((category) => (
          <button
            key={category._key}
            type="button"
            onClick={() => setActiveKey(category._key)}
            className={`flex-none rounded-full border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors ${
              category._key === activeCategory?._key
                ? "border-dark bg-dark text-primary"
                : "border-border bg-card text-foreground"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-5 pt-1 pb-28">
        {activeCategory?.items.map((item) => (
          <MenuItemCard
            key={item._key}
            item={item}
            categoryKey={activeCategory._key}
          />
        ))}
      </div>

      {cart.count > 0 && (
        <div className="fixed inset-x-4 bottom-5 flex items-center justify-between rounded-2xl bg-dark px-4.5 py-3.5 text-bg shadow-xl">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] tracking-wide text-secondary uppercase">
              {cart.count} article{cart.count > 1 ? "s" : ""}
            </span>
            <span className="text-sm font-bold">{formatFcfa(cart.total)}</span>
          </div>
          <Button
            nativeButton={false}
            className="text-xs tracking-wide uppercase"
            render={<Link href={`/t/${tableNumber}/cart`}>Voir le panier</Link>}
          />
        </div>
      )}
    </div>
  );
}

function MenuItemCard({
  item,
  categoryKey,
}: {
  item: MenuItemWithImageUrl;
  categoryKey: string;
}) {
  const cart = useCart();
  const quantity = cart.getQuantity(item._key);
  const { imageUrl } = item;

  const setQuantity = (next: number) =>
    cart.setQuantity(
      {
        itemKey: item._key,
        categoryKey,
        title: item.title,
        price: item.price,
      },
      next,
    );

  return (
    <div className="flex gap-3 rounded-2xl bg-card p-3 shadow-sm">
      <div className="relative flex size-16 flex-none items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#24393e] to-dark">
        {imageUrl ? (
          <Image src={imageUrl} alt={item.title} fill className="object-cover" />
        ) : (
          <PlaceholderIcon />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
        {item.description && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        )}
        <div className="mt-0.5 flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">
            {formatFcfa(item.price)}
          </span>
          {quantity > 0 ? (
            <div className="flex items-center gap-2.5 rounded-full bg-dark px-1 py-1">
              <button
                type="button"
                onClick={() => setQuantity(quantity - 1)}
                className="flex size-6 items-center justify-center rounded-full text-primary"
                aria-label="Retirer une unité"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="min-w-3 text-center text-xs font-bold text-bg">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="flex size-6 items-center justify-center rounded-full text-primary"
                aria-label="Ajouter une unité"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setQuantity(1)}
              className="rounded-full bg-primary px-3.5 py-1.5 text-[10px] font-bold tracking-wide text-primary-foreground uppercase"
            >
              Ajouter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PlaceholderIcon() {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-gold)"
      strokeWidth={1.6}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 8.5c0 2 1 3 2 3s2-1 2-3M8 8.5V6M12 11.5V6" />
      <path d="M16 6v6.5c0 1-.7 1.8-1.6 2" />
    </svg>
  );
}
