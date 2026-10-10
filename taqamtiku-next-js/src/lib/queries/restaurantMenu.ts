import { groq } from "next-sanity";

export const RESTAURANT_MENU_QUERY = groq`*[
  _type == "restaurantMenu"
][0]{_id,
  categories[]{
    _key,
    title,
    image,
    description,
    items[]{
      _key,
      title,
      image,
      description,
      price,
    }
  }
}`;
