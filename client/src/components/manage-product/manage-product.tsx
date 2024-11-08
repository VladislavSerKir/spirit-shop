import React, { useCallback, useState } from "react";
import Form from "../../shared/form/form";
import {} from "react-router-dom";
import ProductTable from "../../pages/admin/product-table";
import { useTranslation } from "react-i18next";

const ManageProduct = () => {
  const { t } = useTranslation();
  const [actionType, setActionType] = useState("edit");

  const toggleActionType = useCallback(() => {
    setActionType((prevState) => (prevState === "add" ? "edit" : "add"));
  }, []);

  return (
    <div>
      <h2 className="section__title-center">{t("Manage products")}</h2>

      {actionType === "add" ? (
        <>
          <div className="container-center">
            <button
              className="button button--flex"
              type="button"
              onClick={toggleActionType}
            >
              {t("Edit")}
              <i className="ri-arrow-left-right-line button__icon" />
            </button>
          </div>
          <Form type="add" changeAction={toggleActionType} />
        </>
      ) : (
        <>
          <div className="container-center">
            <button
              className="button button--flex"
              type="button"
              onClick={toggleActionType}
            >
              {t("Add")}
              <i className="ri-arrow-left-right-line button__icon" />
            </button>
          </div>
          <ProductTable />
        </>
      )}
    </div>
  );
};

export default ManageProduct;
