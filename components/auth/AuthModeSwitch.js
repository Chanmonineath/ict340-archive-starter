export default function AuthModeSwitch({ mode, onSwitchMode }) {
  return (
    <p className="auth-switch">
      {mode === "login" ? (
        <>
          Don&rsquo;t have an account yet?{" "}
          <button type="button" className="auth-switch-link" onClick={() => onSwitchMode("signup")}>
            Create an account
          </button>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <button type="button" className="auth-switch-link" onClick={() => onSwitchMode("login")}>
            Log in
          </button>
        </>
      )}
    </p>
  );
}
