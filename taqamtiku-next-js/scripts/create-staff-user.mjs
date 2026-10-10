#!/usr/bin/env node
// Creates or updates a staffUser document with a bcrypt-hashed password.
// Never enter a plaintext password directly in Sanity Studio.
//
// Usage:
//   npm run create-staff-user -- <email> <password> [name] [role=admin|kitchen]
//
// Requires SANITY_API_WRITE_TOKEN in the environment, e.g.:
//   node --env-file=.env.local scripts/create-staff-user.mjs you@taqamtiku.com "secret" "Votre Nom" admin

import { createClient } from "@sanity/client";
import bcrypt from "bcryptjs";

const [, , email, password, name, role = "kitchen"] = process.argv;

if (!email || !password) {
  console.error(
    "Usage: node --env-file=.env.local scripts/create-staff-user.mjs <email> <password> [name] [role=admin|kitchen]",
  );
  process.exit(1);
}

if (role !== "admin" && role !== "kitchen") {
  console.error('Role must be "admin" or "kitchen".');
  process.exit(1);
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error(
    "SANITY_API_WRITE_TOKEN is not set. Run with --env-file=.env.local (Node 20.6+) or export it first.",
  );
  process.exit(1);
}

const client = createClient({
  projectId: "eakltsyb",
  dataset: "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const normalizedEmail = email.toLowerCase().trim();
const passwordHash = await bcrypt.hash(password, 10);

const existingId = await client.fetch(
  `*[_type == "staffUser" && email == $email][0]._id`,
  { email: normalizedEmail },
);

if (existingId) {
  await client
    .patch(existingId)
    .set({ passwordHash, role, ...(name ? { name } : {}) })
    .commit();
  console.log(`Updated staff user ${normalizedEmail} (${existingId}).`);
} else {
  const created = await client.create({
    _type: "staffUser",
    email: normalizedEmail,
    name: name || normalizedEmail,
    passwordHash,
    role,
    isActive: true,
  });
  console.log(`Created staff user ${normalizedEmail} (${created._id}).`);
}
