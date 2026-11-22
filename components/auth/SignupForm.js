"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";
import { validate } from "./authValidation.js";
import { UserIcon, MailIcon } from "./authIcons.js";
import AuthField from "./AuthField.js";
import AuthPasswordField from "./AuthPasswordField.js";
import AuthHeader from "./AuthHeader.js";
import CornerOrnaments from "../CornerOrnaments.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function SignupForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [fields, setFields] = React.useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const updateField = (name) => (e) => setFields((prev) => ({ ...prev, [name]: e.target.value }));
  const markTouched = (name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate("signup", fields, t.auth));
  };
  const showError = (name) => touched[name] && errors[name];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const nextErrors = validate("signup", fields, t.auth);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const supabase = createClient();
    const name = fields.name.trim();

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .ilike("name", name)
      .maybeSingle();

    if (existing) {
      setIsSubmitting(false);
      setErrors((prev) => ({ ...prev, name: t.auth.nameTaken }));
      setTouched((prev) => ({ ...prev, name: true }));
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: fields.email,
      password: fields.password,
      options: { data: { name } },
    });
    setIsSubmitting(false);

    if (signUpError) {
      setFormError(signUpError.message);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="auth-page">
      <div className="auth-modal">
        <CornerOrnaments />
        <AuthHeader mode="signup" />

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {formError && <p className="auth-form-error">{formError}</p>}

          <AuthField id="auth-name" label={t.auth.yourName} icon={<UserIcon />} error={showError("name")}>
            <input
              id="auth-name"
              type="text"
              className="auth-input"
              placeholder={t.auth.namePlaceholder}
              value={fields.name}
              onChange={updateField("name")}
              onBlur={markTouched("name")}
              autoComplete="name"
            />
          </AuthField>

          <AuthField id="auth-email" label={t.auth.emailLabel} icon={<MailIcon />} error={showError("email")}>
            <input
              id="auth-email"
              type="email"
              className="auth-input"
              placeholder={t.auth.emailPlaceholder}
              value={fields.email}
              onChange={updateField("email")}
              onBlur={markTouched("email")}
              autoComplete="email"
            />
          </AuthField>

          <AuthPasswordField
            id="auth-password"
            label={t.auth.passwordLabel}
            value={fields.password}
            onChange={updateField("password")}
            onBlur={markTouched("password")}
            error={showError("password")}
            autoComplete="new-password"
            isVisible={showPassword}
            onToggleVisible={() => setShowPassword((v) => !v)}
          />

          <AuthPasswordField
            id="auth-confirm-password"
            label={t.auth.confirmPasswordLabel}
            value={fields.confirmPassword}
            onChange={updateField("confirmPassword")}
            onBlur={markTouched("confirmPassword")}
            error={showError("confirmPassword")}
            autoComplete="new-password"
            isVisible={showConfirm}
            onToggleVisible={() => setShowConfirm((v) => !v)}
          />

          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? t.auth.creatingAccount : t.auth.createAccountBtn}
          </button>
        </form>

        <p className="auth-switch">
          {t.auth.alreadyHaveAccount}
          <Link href="/login" className="auth-switch-link">
            {t.auth.logInLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
