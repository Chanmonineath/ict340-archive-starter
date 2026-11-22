"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";
import { MailIcon } from "./authIcons.js";
import AuthField from "./AuthField.js";
import AuthPasswordField from "./AuthPasswordField.js";
import AuthHeader from "./AuthHeader.js";
import CornerOrnaments from "../CornerOrnaments.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function LoginForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(t.auth.invalidCredentials);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="auth-page">
      <div className="auth-modal">
        <CornerOrnaments />
        <AuthHeader mode="login" />

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && <p className="auth-form-error">{error}</p>}

          <AuthField id="auth-email" label={t.auth.emailLabel} icon={<MailIcon />}>
            <input
              id="auth-email"
              type="email"
              className="auth-input"
              placeholder={t.auth.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </AuthField>

          <AuthPasswordField
            id="auth-password"
            label={t.auth.passwordLabel}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            isVisible={showPassword}
            onToggleVisible={() => setShowPassword((v) => !v)}
          />

          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? t.auth.loggingIn : t.auth.logIn}
          </button>
        </form>

        <p className="auth-switch">
          {t.auth.noAccountYet}
          <Link href="/signup" className="auth-switch-link">
            {t.auth.createAnAccount}
          </Link>
        </p>
      </div>
    </div>
  );
}
