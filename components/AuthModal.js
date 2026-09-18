"use client";

import React from "react";
import { validate } from "./auth/authValidation.js";
import { UserIcon, MailIcon } from "./auth/authIcons.js";
import AuthField from "./auth/AuthField.js";
import AuthPasswordField from "./auth/AuthPasswordField.js";
import AuthHeader from "./auth/AuthHeader.js";
import AuthModeSwitch from "./auth/AuthModeSwitch.js";
import AuthSuccess from "./auth/AuthSuccess.js";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = React.useState("login");
  const [fields, setFields] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const updateField = (name) => (e) => {
    setFields((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const markTouched = (name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(mode, fields));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(mode, fields);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const showError = (name) => touched[name] && errors[name];

  if (submitted) {
    return <AuthSuccess mode={mode} onClose={onClose} />;
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-label={mode === "login" ? "Log in" : "Create an account"}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="auth-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <AuthHeader mode={mode} />

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === "signup" && (
            <AuthField id="auth-name" label="Your Name" icon={<UserIcon />} error={showError("name")}>
              <input
                id="auth-name"
                type="text"
                className="auth-input"
                placeholder="e.g. Sreysros Chan"
                value={fields.name}
                onChange={updateField("name")}
                onBlur={markTouched("name")}
                autoComplete="name"
              />
            </AuthField>
          )}

          <AuthField id="auth-email" label="Email Address" icon={<MailIcon />} error={showError("email")}>
            <input
              id="auth-email"
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={fields.email}
              onChange={updateField("email")}
              onBlur={markTouched("email")}
              autoComplete="email"
            />
          </AuthField>

          <AuthPasswordField
            id="auth-password"
            label="Password"
            value={fields.password}
            onChange={updateField("password")}
            onBlur={markTouched("password")}
            error={showError("password")}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            isVisible={showPassword}
            onToggleVisible={() => setShowPassword((v) => !v)}
          />

          {mode === "signup" && (
            <AuthPasswordField
              id="auth-confirm-password"
              label="Confirm Password"
              value={fields.confirmPassword}
              onChange={updateField("confirmPassword")}
              onBlur={markTouched("confirmPassword")}
              error={showError("confirmPassword")}
              autoComplete="new-password"
              isVisible={showConfirm}
              onToggleVisible={() => setShowConfirm((v) => !v)}
            />
          )}

          <button type="submit" className="auth-submit">
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <AuthModeSwitch mode={mode} onSwitchMode={switchMode} />
      </div>
    </div>
  );
}
