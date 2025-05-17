import PageHeader from "@/components/PageHeader";
import Price from "@/components/Price";
import { sanityFetch } from "@/sanity/client";
import { RestaurantMenuItem } from "@/types";
import { groq, SanityDocument } from "next-sanity";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";

const RESTAURANT_MENU_QUERY = groq`*[
  _type == "restaurantMenu"
][0]{_id,
  items[]{
    title,
    image,
    description,
    price,
    category
  }
}`;

export default async function Pages() {
  const restaurantMenu = await sanityFetch<SanityDocument>({
    query: RESTAURANT_MENU_QUERY,
  });
  const restaurantMenuItems: RestaurantMenuItem[] = restaurantMenu.items || [];
  const categories: string[] = Array.from(
    new Set(restaurantMenuItems.map((item) => item.category ?? "Autres"))
  );

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Menu</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem active>Notre Menu</BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="section section-light container">
        <div className="section-content restaurant-menu">
          {categories.map((category) => {
            const categoryItems = restaurantMenuItems
              .filter((item) => item.category === category)
              .sort((a, b) => a.price - b.price);
            return (
              <div key={category} className="mb-8">
                <h2>{category}</h2>
                <ul className="row">
                  {categoryItems.map((item) => (
                    <li key={item.title} className="col-sm-6">
                      <div className="restaurant-menu__item">
                        <span className="item-title">{item.title}</span>
                        <Price amount={item.price} />
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
