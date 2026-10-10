import type { DefaultSession } from "next-auth";

export type StaffRole = "admin" | "kitchen";

declare module "next-auth" {
  interface Session {
    user: {
      role?: StaffRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: StaffRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: StaffRole;
  }
}
