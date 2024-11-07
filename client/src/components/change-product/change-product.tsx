import React, { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IUseParams, useTypedDispatch, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";
import { editProduct } from "../../store/actions/productAction";
import TextArea from "../../shared/form/text-area";
import MultiSelectField from "../../shared/form/multi-select-field";
import { useTranslation } from "react-i18next";

interface IChangeProductProps {
  onClose: () => void;
}

const ChangeProduct = ({ onClose }: IChangeProductProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<IUseParams>();
  const dispatch = useTypedDispatch();
  const products = useTypedSelector((state) => state.products.products);
  const categories = useTypedSelector((state) => state.category.categories);

  let product: undefined | any | null = null;
  product = products?.find((i) => String(i.id) === id);

  const categoriesList = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const initialState = {
    name: product?.name || "",
    description: product?.description,
    image: product?.image,
    categories: product?.categories?.map((i: any) => ({
      label: i.name,
      value: i.id,
    })),
    price: String(product?.price),
    id: product.id,
  };

  const [data, setData] = useState(initialState);

  const handleChangeProduct = useCallback((target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }, []);

  const handleSubmitProduct = (e: any) => {
    e.preventDefault();
    const formattedData = {
      ...data,
      categories: data.categories.map((i: any) => ({
        id: i.value,
        name: i.label,
      })),
    };
    dispatch(editProduct(formattedData));
    setData(initialState);
    history.goBack();
  };

  return (
    <>
      <div className="modal-content__container">
        <i className="ri-close-line modal-content__cross" onClick={onClose} />
        <h2 className="section__title-center">{t("Change product")}</h2>
        <form className="modal-content__form" onSubmit={handleSubmitProduct}>
          <div className="modal-content__form-product">
            <TextField
              label={t("Name")}
              name="name"
              value={data.name}
              onChange={handleChangeProduct}
            />
            <TextArea
              label={t("Description")}
              name="description"
              value={data.description ? data.description : ""}
              onChange={handleChangeProduct}
            />
            <TextField
              label={t("Price")}
              name="price"
              type="number"
              value={data.price ? data.price : ""}
              onChange={handleChangeProduct}
            />
            <TextField
              label={t("Image")}
              name="image"
              value={data.image ? data.image : ""}
              onChange={handleChangeProduct}
            />
            <MultiSelectField
              options={categoriesList}
              onChange={handleChangeProduct}
              defaultValue={data.categories}
              name="categories"
              label={t("Categories")}
              toTop
            />
          </div>
          <button
            className="button button--gap modal-content__button"
            type="submit"
          >
            <i className="ri-pencil-line" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangeProduct;
