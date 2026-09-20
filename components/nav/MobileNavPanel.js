import Link from "next/link";

const mobileLinkStyle = {
  fontFamily: "var(--font-body), sans-serif",
  fontWeight: 600,
  textDecoration: "none",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  borderRadius: 8,
};

export default function MobileNavPanel({ navLinks, pathname, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="nav-mobile-backdrop" onClick={onClose} aria-hidden="true" />
      )}

      <div
        id="mobile-nav-panel"
        className={"nav-mobile-panel" + (isOpen ? " nav-mobile-panel-open" : "")}
      >
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={mobileLinkStyle}
              className={"nav-mobile-link" + (isActive ? " nav-mobile-link-active" : "")}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
