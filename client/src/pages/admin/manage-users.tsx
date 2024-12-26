import React, { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { getAllUsers } from "../../store/actions/userAction";
import UserAccordeon from "../../components/user-accordeon/user-accordeon";
import { useTranslation } from "react-i18next";
import Spinner from "../spinner/spinner";
import { IUserData } from "../../types/store/userStoreType";

export const ManageUsers = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const users = useTypedSelector((store) => store.user.allUsersData) || [];
  const isLoading = useTypedSelector((store) => store.user.allUsersRequest);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  function searchUsers(users: IUserData[]) {
    if (users) {
      return users.filter((user: IUserData) =>
        user.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return [];
  }

  const userList = searchUsers(users);

  React.useEffect(() => {
    if (!users?.length) {
      dispatch(getAllUsers());
    }
  }, []);

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(userList, 4);

  const usersToShow = showCurrentEntity();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="order__page">
            <h2 className="section__title-center">{t("All users")}</h2>
            <div className="footer__subscribe search__input">
              <input
                type="text"
                placeholder={t("Enter email")}
                className="footer__input"
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
            {usersToShow?.length ? (
              <>
                {usersToShow?.map((user: IUserData) => {
                  return (
                    <div key={user.id} className="accordeon__container">
                      <UserAccordeon user={user} />
                    </div>
                  );
                })}
              </>
            ) : (
              <h3 className="container-center">{t("There are no users")}</h3>
            )}
          </div>
          {usersToShow?.length ? (
            <Pagination
              currentPage={currentPage}
              jump={jump}
              maxPage={maxPage}
              next={next}
              prev={prev}
            />
          ) : null}
        </>
      )}
    </>
  );
};
