import React from "react";

interface ITextFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: Function;
  error?: string;
}

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
}: ITextFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: event.target.name, value: event.target.value });
  };

  const getInputClasses = () => {
    return `login__content${error ? "-error" : ""}`;
  };

  return (
    <div className={getInputClasses()}>
      <input
        placeholder=" "
        className="login__input"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
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
