import { CartProvider } from "@/lib/cart/CartContext";

export default async function TableLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tableNumber: string }>;
}) {
  const { tableNumber } = await params;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CartProvider tableNumber={tableNumber}>{children}</CartProvider>
    </div>
  );
}
