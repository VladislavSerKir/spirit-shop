import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../types";
import ProductCard from "../../shared/product-card/product-card";
import { IProduct } from "../../types/store/productStoreType";

export const MainProducts = () => {
  const { t } = useTranslation();
  const products = useTypedSelector((state) => state.products.products);
  const categories = useTypedSelector((state) => state.category.categories);

  return (
    <section className="product section container" id="products">
      <h2 className="section__title-center">{t("Check out our products")}</h2>

      <p className="product__description">
        {t(
          "Here are some selected plants from our showroom, all are in excellent shape and has a long life span. Buy and enjoy best quality"
        )}
      </p>

      {products.length ? (
        <>
          <div className="product__container grid">
            {products.map((product: IProduct, i) => {
              if (i <= 5) {
                return (
                  <ProductCard
                    categories={categories}
                    product={product}
                    key={product.id}
                  />
                );
              }
              return null;
            })}
          </div>
        </>
      ) : (
        <h3 className="container-center">{t("There are no products")}</h3>
      )}
    </section>
  );
};
