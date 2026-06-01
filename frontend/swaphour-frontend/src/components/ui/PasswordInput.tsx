import React, { useState } from "react";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  showStrength?: boolean;
}

const getStrength = (password: string) => {
  let score = 0;
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    longEnough: password.length >= 12,
  };

  if (checks.minLength) score++;
  if (checks.hasUppercase) score++;
  if (checks.hasLowercase) score++;
  if (checks.hasNumber) score++;
  if (checks.hasSymbol) score++;
  if (checks.longEnough) score++;

  return { score, checks };
};

const PasswordInput = ({
  label = "Password",
  placeholder = "Masukkan password...",
  value,
  onChange,
  errorMessage,
  showStrength = false,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { score, checks } = getStrength(value);

  const getStrengthLabel = () => {
    if (!value) return null;
    if (score <= 2) return { label: "Lemah", color: "#ef4444" };
    if (score <= 4) return { label: "Sedang", color: "#F0A500" };
    return { label: "Kuat", color: "#2d8a61" };
  };

  const strength = getStrengthLabel();

  const requirements = [
    { key: "minLength", label: "Minimal 8 karakter", met: checks.minLength },
    {
      key: "hasUppercase",
      label: "Huruf kapital (A-Z)",
      met: checks.hasUppercase,
    },

    { key: "hasNumber", label: "Angka (0-9)", met: checks.hasNumber },
    { key: "hasSymbol", label: "Simbol (!@#$%^&*)", met: checks.hasSymbol },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column" as const,
        gap: "0.5rem",
      }}
    >
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {label}
          </label>
          {strength && value && (
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: strength.color,
              }}
            >
              {strength.label}
            </span>
          )}
        </div>
      )}

      {/* Input wrapper */}
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.09)",
            backdropFilter: "blur(20px)",
            border: errorMessage
              ? "1px solid rgba(239,68,68,0.6)"
              : "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "0.85rem 3rem 0.85rem 1.1rem",
            fontFamily: "Sora, sans-serif",
            fontSize: "0.9rem",
            color: "#fff",
            outline: "none",
            transition: "all 0.25s ease",
            boxSizing: "border-box" as const,
          }}
        />
        {/* Show/hide toggle */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.4)",
            fontSize: "1rem",
            padding: "4px",
            transition: "color 0.2s",
          }}
        >
          {showPassword ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {/* Error message */}
      {errorMessage && (
        <span
          style={{ fontSize: "0.78rem", color: "#f87171", fontWeight: 500 }}
        >
          {errorMessage}
        </span>
      )}

      {/* Strength bar */}
      {showStrength && value && (
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "0.75rem 1rem",
            display: "flex",
            flexDirection: "column" as const,
            gap: "6px",
          }}
        >
          {requirements.map((req) => (
            <div
              key={req.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Centang atau lingkaran */}
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: req.met
                    ? "rgba(45,138,97,0.3)"
                    : "rgba(255,255,255,0.05)",
                  border: req.met
                    ? "1.5px solid #2d8a61"
                    : "1.5px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                {req.met && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path
                      d="M1.5 4.5L3.5 6.5L7.5 2.5"
                      stroke="#6ee7b7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: req.met
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.35)",
                  fontWeight: req.met ? 500 : 400,
                  transition: "color 0.2s",
                }}
              >
                {req.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
