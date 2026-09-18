export default function AuthField({ id, label, icon, error, children }) {
  return (
    <div>
      <label className="auth-label" htmlFor={id}>
        {label}
      </label>
      <div className={"auth-input-wrap" + (error ? " auth-input-wrap-error" : "")}>
        <span className="auth-input-icon" aria-hidden="true">
          {icon}
        </span>
        {children}
      </div>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}
