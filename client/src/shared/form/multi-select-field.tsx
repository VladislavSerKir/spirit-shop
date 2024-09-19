import React, { FC } from "react";
import Select from "react-select";

interface IMultiSelectField {
  label: string;
  error: string[] | null;
  name: string;
  onChange: Function;
  defaultValue: string[];
  options: any;
}

const MultiSelectField: FC<IMultiSelectField> = ({
  label,
  error,
  options,
  onChange,
  name,
  defaultValue,
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
    return `basic-multi-select`;
  };

  return (
    <div>
      <label className="login__label-select">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className={getInputClasses()}
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        value={defaultValue}
        defaultValue={defaultValue}
      />

      {error && <div className="login__select-error">{error}</div>}
    </div>
  );
};

export default MultiSelectField;
