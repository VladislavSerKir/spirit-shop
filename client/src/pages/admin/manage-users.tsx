import React, { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { TPurchase } from "../../types/orderType";
import { getAllUsers } from "../../store/actions/userAction";
import UserAccordeon from "../../components/user-accordeon/user-accordeon";

export const ManageUsers = () => {
  const dispatch = useTypedDispatch();
  const users = useTypedSelector((store) => store.user.allUsersData);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = ({ target }: any) => {
    setSearchValue(target.value);
  };

  function searchUsers(users: any) {
    if (users) {
      return users.filter((user: any) =>
        user.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return [];
  }

  const userList = searchUsers(users);

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(userList, 4);

  const usersToShow = showCurrentEntity();

  return (
    <>
      <div className="order__page">
        <h2 className="section__title-center">All users</h2>
        <div className="footer__subscribe search__input">
          <input
            type="text"
            placeholder="Enter email..."
            className="footer__input"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        {usersToShow?.length ? (
          <>
            {usersToShow?.map((user: TPurchase) => {
              return (
                <div key={user.id} className="accordeon__container">
                  <UserAccordeon user={user} />
                </div>
              );
            })}
          </>
        ) : (
          <h3 className="container-center">There are no users</h3>
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
  );
};
