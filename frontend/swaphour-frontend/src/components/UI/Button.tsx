import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  isLoading = false,
  disabled = false,
  onClick,
  type = "button",
  fullWidth = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`ui-btn ui-btn--${variant} ${fullWidth ? "ui-btn--full" : ""}`}
    >
      {isLoading ? <span className="ui-btn__spinner" /> : children}
    </button>
  );
};

export default Button;
