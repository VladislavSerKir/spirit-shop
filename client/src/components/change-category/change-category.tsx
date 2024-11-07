import React, { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IUseParams, useTypedDispatch, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";
import { editCategory } from "../../store/actions/categoryAction";
import { ICategory } from "../../types/store/categoryStoreType";
import { useTranslation } from "react-i18next";

interface IChangeCategoryProps {
  onClose: () => void;
}

const ChangeCategory = ({ onClose }: IChangeCategoryProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<IUseParams>();
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.category.categories);

  let category: undefined | ICategory | null = null;
  category = categories?.find((i) => String(i.id) === id);

  const initialState = {
    name: category?.name || "",
    id: Number(id),
  };

  const [data, setData] = useState(initialState);

  const handleChangeCategory = useCallback((target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }, []);

  const handleSubmitCategory = (e: any) => {
    e.preventDefault();
    dispatch(editCategory(data));
    setData(initialState);
    history.goBack();
  };

  return (
    <>
      <div className="modal-content__container">
        <i className="ri-close-line modal-content__cross" onClick={onClose} />
        <h2 className="section__title-center">{t("Change category name")}</h2>
        <form className="modal-content__form" onSubmit={handleSubmitCategory}>
          <div>
            <TextField
              label={t("Name")}
              name="name"
              value={data.name ? data.name : ""}
              onChange={handleChangeCategory}
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

export default ChangeCategory;
