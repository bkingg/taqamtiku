import { auth, signOut } from "@/lib/auth";

const ROLE_LABEL: Record<string, string> = {
  admin: "Administrateur",
  kitchen: "Cuisine",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  const initials = (user?.name ?? user?.email ?? "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f1ea]">
      <div className="flex items-center justify-between bg-dark px-8 py-4.5 text-bg">
        <div className="flex items-center gap-3.5">
          <span className="font-heading text-lg tracking-[0.1em] text-primary uppercase">
            Taqamtiku
          </span>
          <div className="h-5 w-px bg-white/15" />
          <span className="text-sm tracking-wide uppercase">
            Cuisine — Commandes
          </span>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="flex size-8.5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-dark">
            {initials}
          </div>
          <div className="text-sm">
            {user?.name ?? user?.email}
            <span className="block text-[10px] text-secondary">
              {ROLE_LABEL[user?.role ?? ""] ?? ""}
            </span>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="rounded-lg border border-white/20 px-3.5 py-2 text-[11px] tracking-wide uppercase"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
