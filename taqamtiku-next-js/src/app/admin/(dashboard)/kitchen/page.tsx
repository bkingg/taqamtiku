import { client } from "@/sanity/client";
import { KITCHEN_ORDERS_QUERY, type KitchenOrder } from "@/lib/queries/kitchenOrders";
import OrderQueueBoard from "@/components/kitchen/OrderQueueBoard";

export default async function KitchenPage() {
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const sinceIso = since.toISOString();

  const orders = await client.fetch<KitchenOrder[]>(KITCHEN_ORDERS_QUERY, {
    since: sinceIso,
  });

  return <OrderQueueBoard initialOrders={orders} since={sinceIso} />;
}
