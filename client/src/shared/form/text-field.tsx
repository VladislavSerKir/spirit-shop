import React from "react";
import InputMask from "react-input-mask";
import { GenericObject } from "../../types";

interface ITextFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: Function;
  error?: string;
  type_phone?: boolean;
}

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  type_phone,
}: ITextFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: event.target.name, value: event.target.value });
  };

  const getInputClasses = () => {
    return `login__content${error ? "-error" : ""}`;
  };

  return (
    <div className={getInputClasses()}>
      {type_phone ? (
        <InputMask
          mask="+7 (999) 999-99-99"
          value={value}
          onChange={handleChange}
        >
          {(inputProps: GenericObject) => (
            <input
              placeholder=" "
              className="login__input"
              type={type}
              id={name}
              name={name}
              {...inputProps}
            />
          )}
        </InputMask>
      ) : (
        <input
          placeholder=" "
          className="login__input"
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
      )}
      <label htmlFor={name} className="login__label">
        {label}
      </label>
      {error && (
        <div className="login__error">
          <span className="login__error-message">{error}</span>
        </div>
      )}
    </div>
  );
};

export default TextField;
