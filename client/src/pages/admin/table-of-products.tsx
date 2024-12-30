import { useTypedDispatch, useTypedSelector } from "../../types";
import { deleteProduct } from "../../store/actions/productAction";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { IProduct } from "../../types/store/productStoreType";
import { useTranslation } from "react-i18next";
import { ICategory } from "../../types/store/categoryStoreType";
import Button from "../../shared/button/button";

const TableOfProducts = () => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const dispatch = useTypedDispatch();
  const products = useTypedSelector((state) => state.products.products);
  const location = useLocation();

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(products, 4);

  const productsToShow = showCurrentEntity();

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  if (!products.length) {
    return (
      <h2 className="table__title">{t("There is no product to manage")}</h2>
    );
  }

  return (
    <>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>{t("Name")}</th>
            <th>{t("Price")}</th>
            <th>{t("Categories")}</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {productsToShow.map((product: IProduct) => (
            <tr key={product.id}>
              <td className="table__info table__info-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="table__image"
                />
                {product.name}
              </td>
              <td className="table__info">{product.price}</td>
              <td className="table__info table__info-category">
                {product?.categories.map((category: ICategory) => (
                  <span className="product__category" key={category.id}>
                    {category.name}
                  </span>
                ))}
              </td>
              <td>
                <Link
                  className={`text text_type_main-small orders-feed__link`}
                  key={product.id}
                  to={{
                    pathname: `${url}/${product.id}`,
                    state: { background: location },
                  }}
                >
                  <Button buttonStyle="edit" buttonType="button" />
                </Link>
              </td>
              <td>
                <Button
                  buttonStyle="close"
                  buttonType="button"
                  buttonHandler={() => handleDelete(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      {products?.length ? (
        <Pagination
          currentPage={currentPage}
          jump={jump}
          maxPage={maxPage}
          next={next}
          prev={prev}
        />
      ) : null}
    </>
  );
};

export default TableOfProducts;
