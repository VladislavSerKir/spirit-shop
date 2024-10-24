import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";

const ChangeAvatar = () => {
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.userData);

  const initialState = {
    avatar: user?.avatar || "",
  };

  const [data, setData] = useState(initialState);

  const handleChangeCategory = (target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmitCategory = (e: any) => {
    e.preventDefault();
    console.log(data);
    // dispatch(editCategory(data));
    setData(initialState);
    history.goBack();
  };

  return (
    <>
      <div className="modal-content__container">
        <h2 className="section__title-center">Change avatar</h2>
        <form className="modal-content__form" onSubmit={handleSubmitCategory}>
          <div>
            <TextField
              label="Avatar"
              name="name"
              value={data.avatar ? data.avatar : ""}
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

export default ChangeAvatar;
