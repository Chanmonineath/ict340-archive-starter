import Logo from "../Logo.js";
import collection from "../../collection.config.js";

export default function AuthHeader({ mode }) {
  return (
    <>
      <div className="auth-header">
        <Logo height={44} emblemOnly />
        <span className="auth-header-name">{collection.name}</span>
      </div>

      <h2 className="auth-title auth-title-center">
        {mode === "login" ? "Welcome Back" : "Create Your Account"}
      </h2>
      <p className="auth-subtitle auth-subtitle-center">
        {mode === "login"
          ? "Log in to save and share your family recipes."
          : `Join ${collection.name} to contribute and save your family recipes.`}
      </p>
    </>
  );
}
