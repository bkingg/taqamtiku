import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;

  async function authenticate(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: callbackUrl || "/admin/kitchen",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(
          `/admin/login?error=1${callbackUrl ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`,
        );
      }
      throw err;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f1ea] p-6">
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl shadow-2xl md:flex-row">
        <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-gradient-to-br from-[#24393e] to-dark p-10 text-bg md:w-1/2">
          <div>
            <div className="font-heading text-2xl tracking-[0.15em] text-primary uppercase">
              Taqamtiku
            </div>
            <div className="mt-1.5 text-[11px] tracking-[0.4em] text-secondary uppercase">
              Restaurant
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] tracking-[0.2em] text-secondary uppercase">
              Espace cuisine
            </span>
            <p className="max-w-70 text-lg leading-relaxed">
              Suivez et gérez les commandes en temps réel, table par table.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 bg-card p-10 md:w-1/2">
          <div>
            <h1 className="font-heading text-2xl text-foreground">Connexion</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Réservé au personnel de Taqamtiku.
            </p>
          </div>

          <form action={authenticate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
              >
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="prenom@taqamtiku.com"
                className="rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground"
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-destructive">
                E-mail ou mot de passe incorrect.
              </p>
            )}

            <button
              type="submit"
              className="mt-1.5 rounded-xl bg-primary py-3.5 text-xs font-extrabold tracking-[0.2em] text-primary-foreground uppercase"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
