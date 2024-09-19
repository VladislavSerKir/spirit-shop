import React, { useState } from "react";
import Form from "../../shared/form/form";
import ProductTable from "./product-table";

const Admin = () => {
  const [actionType, setActionType] = useState("edit");

  const toggleActionType = () => {
    setActionType((prevState) => (prevState === "add" ? "edit" : "add"));
  };

  return (
    <section className="section container">
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
    </section>
  );
};

export default Admin;
