import { LockIcon, EyeIcon } from "./authIcons.js";
import AuthField from "./AuthField.js";

export default function AuthPasswordField({
  id, label, value, onChange, onBlur, error, autoComplete, isVisible, onToggleVisible,
}) {
  return (
    <AuthField id={id} label={label} icon={<LockIcon />} error={error}>
      <input
        id={id}
        type={isVisible ? "text" : "password"}
        className="auth-input auth-input-password"
        placeholder="••••••••"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="auth-eye"
        onClick={onToggleVisible}
        aria-label={isVisible ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        <EyeIcon open={isVisible} />
      </button>
    </AuthField>
  );
}
