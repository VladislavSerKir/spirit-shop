import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";
import { editAvatar } from "../../store/actions/userAction";

const ChangeAvatar = () => {
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.userData);
  let userAvatar = user.avatar;

  const initialState = {
    avatar: userAvatar || "",
  };

  const [data, setData] = useState(initialState);

  const handleChangeAvatar = useCallback((target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }, []);

  const handleSubmitAvatar = (e: any) => {
    e.preventDefault();
    dispatch(editAvatar(data));
    setData(initialState);
    history.goBack();
  };

  return (
    <>
      <div className="modal-content__container">
        <h2 className="section__title-center">Change avatar</h2>
        <form className="modal-content__form" onSubmit={handleSubmitAvatar}>
          <div>
            <TextField
              label="Avatar"
              name="avatar"
              value={data?.avatar ? data.avatar : ""}
              onChange={handleChangeAvatar}
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
