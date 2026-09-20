const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}][\p{L}\p{M}\s'-]*$/u;

export function validate(mode, fields) {
  const errors = {};

  if (mode === "signup") {
    const name = fields.name.trim();
    if (!name) {
      errors.name = "Please enter your name.";
    } else if (!NAME_RE.test(name)) {
      errors.name = "Name can only contain letters, spaces, apostrophes, and hyphens.";
    }
  }

  if (!fields.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.password) {
    errors.password = "Please enter a password.";
  } else if (fields.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (mode === "signup") {
    if (!fields.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (fields.confirmPassword !== fields.password) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  return errors;
}
