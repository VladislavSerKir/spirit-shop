import React, { FC, useState } from "react";
import Select, { MenuPlacement } from "react-select";

interface IMultiSelectField {
  label: string;
  error?: string[] | null;
  name: string;
  onChange: Function;
  defaultValue: string[];
  options: any;
  isFixed?: boolean;
  toTop?: boolean;
}

const MultiSelectField: FC<IMultiSelectField> = ({
  label,
  error,
  options,
  onChange,
  name,
  defaultValue,
  isFixed,
  toTop,
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options;

  const handleChange = (value: any) => {
    onChange({ name, value });
  };

  const getInputClasses = () => {
    // return `basic-multi-select`;
    return `select`;
  };

  return (
    <div>
      <label className="login__label-select">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className={getInputClasses()}
        classNamePrefix="react-select"
        onChange={handleChange}
        name={name}
        value={defaultValue}
        defaultValue={defaultValue}
        menuPlacement={toTop ? "top" : "bottom"}
      />

      {error && <div className="login__select-error">{error}</div>}
    </div>
  );
};

export default MultiSelectField;
