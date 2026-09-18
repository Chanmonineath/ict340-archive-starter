import Logo from "../Logo.js";
import collection from "../../collection.config.js";

export default function AuthSuccess({ mode, onClose }) {
  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-label={mode === "login" ? "Signed in" : "Account created"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="auth-header">
          <Logo height={44} emblemOnly />
          <span className="auth-header-name">{collection.name}</span>
        </div>
        <div className="auth-success">
          <div className="auth-success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2E5B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="auth-title">{mode === "login" ? "Welcome back" : "Account created"}</h2>
          <p className="auth-subtitle">
            {mode === "login"
              ? `You're signed in to ${collection.name}.`
              : "Your account is ready. You're now signed in."}
          </p>
          <button type="button" className="auth-submit" onClick={onClose}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
