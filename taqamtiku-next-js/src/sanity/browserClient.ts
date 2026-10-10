import { createClient } from "next-sanity";

/**
 * A browser-safe twin of `client.ts`, minus the `server-only` guard.
 * Needed because the kitchen dashboard subscribes to `listen()` directly
 * from a client component for live order updates. No token — same
 * read-only, public-dataset access the server client already uses.
 */
export const browserClient = createClient({
  projectId: "eakltsyb",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});
