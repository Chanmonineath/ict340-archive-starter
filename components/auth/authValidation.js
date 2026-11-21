const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}][\p{L}\p{M}\s'-]*$/u;

export function validate(mode, fields, t) {
  const errors = {};

  if (mode === "signup") {
    const name = fields.name.trim();
    if (!name) {
      errors.name = t.nameRequired;
    } else if (!NAME_RE.test(name)) {
      errors.name = t.nameInvalid;
    }
  }

  if (!fields.email.trim()) {
    errors.email = t.emailRequired;
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = t.emailInvalid;
  }

  if (!fields.password) {
    errors.password = t.passwordRequired;
  } else if (fields.password.length < 8) {
    errors.password = t.passwordTooShort;
  }

  if (mode === "signup") {
    if (!fields.confirmPassword) {
      errors.confirmPassword = t.confirmPasswordRequired;
    } else if (fields.confirmPassword !== fields.password) {
      errors.confirmPassword = t.passwordsDontMatch;
    }
  }

  return errors;
}
