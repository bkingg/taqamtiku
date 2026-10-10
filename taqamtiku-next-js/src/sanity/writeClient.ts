import "server-only";

import { createClient } from "next-sanity";

if (!process.env.SANITY_API_WRITE_TOKEN) {
  throw new Error(
    "SANITY_API_WRITE_TOKEN is not set. Add it to .env.local (a token with Editor/Write access, generated at manage.sanity.io) before using writeClient.",
  );
}

export const writeClient = createClient({
  projectId: "eakltsyb",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
