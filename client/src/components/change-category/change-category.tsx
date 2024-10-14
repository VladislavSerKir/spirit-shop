import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IUseParams, useTypedDispatch, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";
import { editCategory } from "../../store/actions/productAction";
import { ICategory } from "../../types/productType";

const ChangeCategory = () => {
  const history = useHistory();
  const { id } = useParams<IUseParams>();
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.products.categories);
  let category: undefined | ICategory | null = null;
  category = categories?.find((i) => String(i.id) === id);

  const initialState = {
    name: category?.name || "",
    id: Number(id),
  };

  const [data, setData] = useState(initialState);

  const handleChangeCategory = (target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleEdit = () => {
    console.log(data);
  };

  const handleSubmitCategory = (e: any) => {
    e.preventDefault();
    dispatch(editCategory(data));
    setData(initialState);
    history.goBack();
  };

  return (
    <>
      <div className="modal-content__container">
        <h2 className="section__title-center">Change category name</h2>
        <form className="modal-content__form" onSubmit={handleSubmitCategory}>
          <div>
            <TextField
              label="Name"
              name="name"
              value={data.name ? data.name : ""}
              onChange={handleChangeCategory}
            />
          </div>
          <button
            className="button button--gap modal-content__button"
            type="submit"
            onClick={handleEdit}
          >
            <i className="ri-pencil-line" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangeCategory;