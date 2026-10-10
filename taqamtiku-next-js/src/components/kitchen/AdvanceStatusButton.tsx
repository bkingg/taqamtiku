"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const NEXT_STATUS: Record<string, { next: string; label: string } | undefined> = {
  received: { next: "preparing", label: "Marquer en préparation" },
  preparing: { next: "ready", label: "Marquer prête" },
  ready: { next: "served", label: "Marquer servie" },
};

export default function AdvanceStatusButton({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const action = NEXT_STATUS[status];

  if (!action) return null;

  const handleClick = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action.next }),
      });
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isSubmitting}
      className="flex-1 rounded-xl bg-[#e0762f] py-4 text-xs font-extrabold tracking-[0.15em] text-white uppercase disabled:opacity-60"
    >
      {isSubmitting ? "Mise à jour…" : action.label}
    </button>
  );
}
