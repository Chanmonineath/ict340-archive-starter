import LoginLink from "./LoginLink.js";
import UserMenu from "./UserMenu.js";
import LanguageToggle from "./LanguageToggle.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function NavActions({ user, isMenuOpen, onToggleMenu }) {
  const { t } = useLanguage();

  return (
    <div className="nav-actions">
      <LanguageToggle />
      {user ? <UserMenu user={user} /> : <LoginLink />}

      <button
        type="button"
        className="nav-toggle"
        onClick={onToggleMenu}
        aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav-panel"
      >
        <span className={"nav-toggle-bar" + (isMenuOpen ? " nav-toggle-bar-1-open" : "")} />
        <span className={"nav-toggle-bar" + (isMenuOpen ? " nav-toggle-bar-2-open" : "")} />
        <span className={"nav-toggle-bar" + (isMenuOpen ? " nav-toggle-bar-3-open" : "")} />
      </button>
    </div>
  );
}
