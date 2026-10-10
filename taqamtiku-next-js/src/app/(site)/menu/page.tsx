import PageHeader from "@/components/PageHeader";
import Price from "@/components/Price";
import { sanityFetch } from "@/sanity/client";
import { RestaurantMenuCategory } from "@/types";
import { SanityDocument } from "next-sanity";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { RESTAURANT_MENU_QUERY } from "@/lib/queries/restaurantMenu";

export default async function Pages() {
  const restaurantMenu = await sanityFetch<SanityDocument>({
    query: RESTAURANT_MENU_QUERY,
  });

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
          {restaurantMenu.categories.map((category: RestaurantMenuCategory) => {
            return (
              category.items.length > 0 && (
                <div key={category._key} className="mb-8">
                  <h2 className="restaurant-menu__category">
                    {category.title}
                  </h2>
                  <ul className="row">
                    {category.items.map((item) => (
                      <li key={item._key} className="col-sm-6">
                        <div className="restaurant-menu__item">
                          <h3 className="item-title">{item.title}</h3>
                          <Price amount={item.price} />
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}
