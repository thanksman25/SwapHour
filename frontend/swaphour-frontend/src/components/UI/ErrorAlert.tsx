import React from "react";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  if (!message) return null;

  return (
    <div className="ui-error-alert">
      <span className="ui-error-alert__icon">⚠️</span>
      <span className="ui-error-alert__message">{message}</span>
    </div>
  );
};

export default ErrorAlert;
