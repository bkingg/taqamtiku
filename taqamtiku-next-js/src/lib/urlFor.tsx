import { client } from "@/sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

export default function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
