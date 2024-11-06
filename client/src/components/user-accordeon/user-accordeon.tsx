import React, { useEffect, useState, useRef, useCallback } from "react";
import Toggle from "react-toggle";
import { useTypedDispatch } from "../../types";
import { assignAdmin, manageAccount } from "../../store/actions/userAction";
import { IUserData } from "../../types/store/userStoreType";
import { useTranslation } from "react-i18next";

interface IUserAccordeonProps {
  user: IUserData | any;
}

const UserAccordeon = ({ user }: IUserAccordeonProps) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [active, setActive] = useState(false);
  const divRef = useRef<any>();

  const initialState = {
    role: user.role === "admin" ? true : false,
    active: user.active,
  };

  const [data, setData] = useState(initialState);

  const handleChangeToggle = useCallback((event: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));

    if (event.target.name === "admin") {
      dispatch(
        assignAdmin({
          id: user.id,
          role: event.target.checked ? "admin" : "user",
        })
      );
    }

    if (event.target.name === "active") {
      dispatch(manageAccount({ id: user.id, active: event.target.checked }));
    }
  }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = active
        ? `${divRef.current.scrollHeight + 20}px`
        : "0px";
    }
  }, [active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  const returnFormattedDate = useCallback(() => {
    if (!user.createdAt) return "";
    let formattedDate = user.createdAt.split("T");
    let time = formattedDate[1].split(".")[0].split(":");
    time.pop();
    return `${formattedDate[0]}, ${time[0]}:${time[1]}`;
  }, [user]);

  const formattedDate = returnFormattedDate();

  return (
    <div className={`user__item${active ? " accordion-open" : ""}`}>
      <header className="user__header" onClick={toggleAccordion}>
        <div className="user__header-container">
          <img src={user.avatar} alt="avatar" className="user__avatar-img" />
          <div className="user__main-column">
            <h3 className="user__item-title">
              {user.role === "user" ? t("User") : t("Admin")}
            </h3>
            <h3 className="user__date-text">
              {user.firstName}, {user.lastName}
            </h3>
          </div>
          <div className="user__info-column">
            <h2 className="user__item-text">
              {`${t("Created")}: `}
              <span className="user__item-text user__date-text">
                {formattedDate}
              </span>
            </h2>
            <h2 className="user__item-text">
              {t("User")}: {user.email}
            </h2>
            <h2 className="user__item-text">
              {t("Phone number")}: {user.mobileNumber}
            </h2>
          </div>
          <div>
            <div className="cart__toggle-container">
              <Toggle
                name="admin"
                defaultChecked={data.role}
                aria-labelledby="biscuit-label"
                onChange={handleChangeToggle}
              />
              <h3 id="is-need-delivery">{t("Admin")}</h3>
            </div>
            <div className="cart__toggle-container">
              <Toggle
                name="active"
                defaultChecked={data.active}
                aria-labelledby="biscuit-label"
                onChange={handleChangeToggle}
              />
              <h3 id="is-need-package">{t("Active")}</h3>
            </div>
          </div>
        </div>
      </header>

      {/* <div className="user__content" ref={divRef}>
        <hr />
      </div> */}
    </div>
  );
};

export default UserAccordeon;
