import LoginLink from "./LoginLink.js";
import UserMenu from "./UserMenu.js";

export default function NavActions({ user, isMenuOpen, onToggleMenu }) {
  return (
    <div className="nav-actions">
      {user ? <UserMenu user={user} /> : <LoginLink />}

      <button
        type="button"
        className="nav-toggle"
        onClick={onToggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
