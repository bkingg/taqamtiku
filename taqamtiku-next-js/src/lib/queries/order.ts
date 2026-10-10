import { groq } from "next-sanity";

export const ORDER_QUERY = groq`*[_type == "order" && _id == $id][0]{
  _id,
  orderNumber,
  status,
  paymentMethod,
  paymentStatus,
  note,
  subtotal,
  total,
  _createdAt,
  "table": table->{number},
  items[]{title, unitPrice, quantity, lineNote}
}`;

export interface OrderQueryResult {
  _id: string;
  orderNumber: string;
  status: "received" | "preparing" | "ready" | "served";
  paymentMethod: "wave" | "counter";
  paymentStatus: "pending" | "paid" | "failed";
  note?: string;
  subtotal: number;
  total: number;
  _createdAt: string;
  table: { number: string } | null;
  items: {
    title: string;
    unitPrice: number;
    quantity: number;
    lineNote?: string;
  }[];
}
