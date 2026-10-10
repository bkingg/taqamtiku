import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { groq } from "next-sanity";
import { writeClient } from "@/sanity/writeClient";
import { authConfig } from "./auth.config";
import type { StaffRole } from "@/types/next-auth";

interface StaffUserRecord {
  _id: string;
  name?: string;
  email: string;
  passwordHash: string;
  role: StaffRole;
}

// Looked up through the write client (not the public read client): the
// production dataset serves reads without a token, so staffUser documents
// (which hold bcrypt hashes) must never be resolved through that path.
const STAFF_USER_QUERY = groq`*[
  _type == "staffUser" && email == $email && isActive == true
][0]{_id, name, email, passwordHash, role}`;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const staffUser = await writeClient.fetch<StaffUserRecord | null>(
          STAFF_USER_QUERY,
          { email: email.toLowerCase().trim() },
        );
        if (!staffUser) return null;

        const isValid = await bcrypt.compare(password, staffUser.passwordHash);
        if (!isValid) return null;

        return {
          id: staffUser._id,
          name: staffUser.name ?? staffUser.email,
          email: staffUser.email,
          role: staffUser.role,
        };
      },
    }),
  ],
});
