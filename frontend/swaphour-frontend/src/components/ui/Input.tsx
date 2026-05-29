import React from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number";
  disabled?: boolean;
  fullWidth?: boolean;
}

const Input = ({
  label,
  placeholder,
  errorMessage,
  value,
  onChange,
  type = "text",
  disabled = false,
  fullWidth = false,
}: InputProps) => {
  return (
    <div className={`ui-input-wrapper ${fullWidth ? "ui-input--full" : ""}`}>
      {label && <label className="ui-input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`ui-input ${errorMessage ? "ui-input--error" : ""}`}
      />
      {errorMessage && <span className="ui-input-error">{errorMessage}</span>}
    </div>
  );
};

export default Input;
