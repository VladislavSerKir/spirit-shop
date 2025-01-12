import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";
import { editAvatar } from "../../store/actions/userAction";
import { useTranslation } from "react-i18next";
import { setIsFadingOut } from "../../store/reducers/userReducer";
import Button from "../../shared/button/button";

interface IChangeAvatarProps {
  onClose: () => void;
}

interface IChangeAvatarFormData {
  name: string;
  value: number;
}

const ChangeAvatar = ({ onClose }: IChangeAvatarProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.userData);
  let userAvatar = user.avatar;

  const initialState = {
    avatar: userAvatar || "",
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [data, setData] = useState(initialState);

  const handleChangeAvatar = useCallback((target: IChangeAvatarFormData) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }, []);

  const handleSubmitAvatar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editAvatar(data));
    setData(initialState);
    history.goBack();
  };

  const handleClose = () => {
    dispatch(setIsFadingOut(true));
    setTimeout(() => {
      onClose();
      dispatch(setIsFadingOut(false));
    }, 300);
  };

  return (
    <>
      <div className="modal-content__container">
        <i
          className="ri-close-line modal-content__cross"
          onClick={handleClose}
        />
        <h2 className="section__title-center">{t("Change avatar")}</h2>
        <form className="modal-content__form" onSubmit={handleSubmitAvatar}>
          <div>
            <TextField
              label={t("Avatar")}
              name="avatar"
              value={data?.avatar ? data.avatar : ""}
              onChange={handleChangeAvatar}
            />
          </div>
          <Button buttonStyle="edit" textContent={t("Edit")} fixed />
        </form>
      </div>
    </>
  );
};

export default ChangeAvatar;
