import React, { useState } from "react";
import Form from "../../shared/form/form";
import {} from "react-router-dom";
import ProductTable from "../../pages/admin/product-table";

const ManageProduct = () => {
  const [actionType, setActionType] = useState("edit");

  const toggleActionType = () => {
    setActionType((prevState) => (prevState === "add" ? "edit" : "add"));
  };

  return (
    <div>
      <h2 className="section__title-center">Manage products</h2>

      {actionType === "add" ? (
        <>
          <div className="container-center">
            <button
              className="button button--flex"
              type="button"
              onClick={toggleActionType}
            >
              Edit
              <i className="ri-arrow-left-right-line button__icon" />
            </button>
          </div>
          <Form type="add" />
        </>
      ) : (
        <>
          <div className="container-center">
            <button
              className="button button--flex"
              type="button"
              onClick={toggleActionType}
            >
              Add
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
