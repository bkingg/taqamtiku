import type { NextAuthConfig } from "next-auth";
import type { StaffRole } from "@/types/next-auth";

// Edge-safe half of the NextAuth config: no providers, no Sanity write
// client, no bcrypt. Used directly by middleware (which runs on the Edge
// runtime and must never import writeClient.ts). The full config in
// auth.ts spreads this and adds the Credentials provider, which only ever
// runs in the Node.js runtime (the /api/auth route handler).
export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as StaffRole | undefined;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
