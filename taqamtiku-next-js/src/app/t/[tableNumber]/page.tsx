import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TableLandingPage({
  params,
}: {
  params: Promise<{ tableNumber: string }>;
}) {
  const { tableNumber } = await params;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#24393e] via-dark to-[#12201f] px-8 py-16 text-bg">
      <span className="rounded-full border border-primary/35 bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Table {tableNumber}
      </span>

      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-heading text-4xl tracking-[0.15em] text-primary uppercase">
          Taqamtiku
        </h1>
        <p className="text-xs tracking-[0.4em] text-secondary uppercase">
          Restaurant
        </p>
        <div className="mt-2 h-0.5 w-10 rounded-full bg-primary" />
      </div>

      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <Button
          size="lg"
          nativeButton={false}
          className="w-full py-6 text-sm tracking-[0.2em] uppercase"
          render={<Link href={`/t/${tableNumber}/menu`}>Voir le menu</Link>}
        />
        <p className="text-center text-xs leading-relaxed text-bg/60">
          Scannez, commandez, savourez —<br />
          votre commande part directement en cuisine
        </p>
      </div>
    </div>
  );
}
