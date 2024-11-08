import React, { useCallback } from "react";

interface ITextAreaProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: Function;
  error?: string;
}

const TextArea = ({ label, name, value, onChange, error }: ITextAreaProps) => {
  const handleChange = useCallback(({ target }: any) => {
    onChange({ name: target.name, value: target.value });
  }, []);

  const getInputClasses = () => {
    return `login__area login__content${error ? "-error" : ""}`;
  };

  return (
    <div className={getInputClasses()}>
      <input
        placeholder=" "
        className="login__input"
        typeof="text"
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

export default TextArea;
