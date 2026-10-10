import "server-only";

import { writeClient } from "@/sanity/writeClient";

const ORDER_COUNTER_ID = "orderCounter.singleton";

/**
 * Atomically increments the singleton order counter and returns the new
 * order number as a string (e.g. "482"). Uses createIfNotExists + patch in
 * one transaction so concurrent submissions can't land on the same number.
 */
export async function nextOrderNumber(): Promise<string> {
  const tx = writeClient.transaction();
  tx.createIfNotExists({
    _id: ORDER_COUNTER_ID,
    _type: "orderCounter",
    value: 0,
  });
  tx.patch(ORDER_COUNTER_ID, (p) => p.inc({ value: 1 }));

  const result = await tx.commit({ returnDocuments: true });
  const counterDoc = result.find((doc) => doc._id === ORDER_COUNTER_ID);
  const value = counterDoc?.value;

  if (typeof value !== "number") {
    throw new Error("Failed to generate order number.");
  }

  return String(value);
}
