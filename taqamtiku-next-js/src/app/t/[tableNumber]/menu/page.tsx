import { sanityFetch } from "@/sanity/client";
import { RESTAURANT_MENU_QUERY } from "@/lib/queries/restaurantMenu";
import urlFor from "@/lib/urlFor";
import MenuBrowser from "@/components/ordering/MenuBrowser";
import type { SanityDocument } from "next-sanity";

export default async function TableMenuPage({
  params,
}: {
  params: Promise<{ tableNumber: string }>;
}) {
  const { tableNumber } = await params;
  const restaurantMenu = await sanityFetch<SanityDocument>({
    query: RESTAURANT_MENU_QUERY,
  });

  const categories = (restaurantMenu?.categories ?? []).map(
    (category: SanityDocument) => ({
      ...category,
      items: (category.items ?? []).map((item: SanityDocument) => ({
        ...item,
        imageUrl: item.image ? urlFor(item.image).width(128).height(128).url() : null,
      })),
    }),
  );

  return <MenuBrowser tableNumber={tableNumber} categories={categories} />;
}
