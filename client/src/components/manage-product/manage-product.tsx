import React, { useCallback, useState } from "react";
import Form from "../../shared/form/form";
import {} from "react-router-dom";
import ProductTable from "../../pages/admin/product-table";
import { useTranslation } from "react-i18next";
import Button from "../../shared/button/button";

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
            <Button
              buttonStyle="toggle"
              textContent={t("Edit")}
              buttonHandler={() => toggleActionType()}
            />
          </div>
          <Form type="add" changeAction={toggleActionType} />
        </>
      ) : (
        <>
          <div className="container-center">
            <Button
              buttonStyle="toggle"
              textContent={t("Add")}
              buttonHandler={() => toggleActionType()}
            />
          </div>
          <ProductTable />
        </>
      )}
    </div>
  );
};

export default ManageProduct;
