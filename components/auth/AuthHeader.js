import Logo from "../Logo.js";
import collection from "../../collection.config.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function AuthHeader({ mode }) {
  const { t } = useLanguage();

  return (
    <>
      <div className="auth-header">
        <Logo height={44} emblemOnly />
        <span className="auth-header-name">{collection.name}</span>
      </div>

      <h2 className="auth-title auth-title-center">
        {mode === "login" ? t.auth.welcomeBack : t.auth.createAccount}
      </h2>
      <p className="auth-subtitle auth-subtitle-center">
        {mode === "login"
          ? t.auth.loginSubtitle
          : t.auth.signupSubtitle(collection.name)}
      </p>
    </>
  );
}
