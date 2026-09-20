"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";
import { MailIcon } from "./authIcons.js";
import AuthField from "./AuthField.js";
import AuthPasswordField from "./AuthPasswordField.js";
import AuthHeader from "./AuthHeader.js";

export default function LoginForm() {
  const router = useRouter();
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
      setError("Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="auth-page">
      <div className="auth-modal">
        <AuthHeader mode="login" />

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && <p className="auth-form-error">{error}</p>}

          <AuthField id="auth-email" label="Email Address" icon={<MailIcon />}>
            <input
              id="auth-email"
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </AuthField>

          <AuthPasswordField
            id="auth-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            isVisible={showPassword}
            onToggleVisible={() => setShowPassword((v) => !v)}
          />

          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging In…" : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          Don&rsquo;t have an account yet?{" "}
          <Link href="/signup" className="auth-switch-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
