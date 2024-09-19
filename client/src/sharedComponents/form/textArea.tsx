import React from "react";
import PropTypes from "prop-types";
import { TEventTarget } from "../../components/login/types";

interface ITextArea {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: Function;
  error?: string;
}

const TextArea = ({ label, name, value, onChange, error }: ITextArea) => {
  const handleChange = (target: TEventTarget) => {
    const { value, name } = target;
    onChange({ name, value });
  };

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
        // onChange={handleChange}
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

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

TextArea.defaultProps = {
  error: null,
};

export default TextArea;
