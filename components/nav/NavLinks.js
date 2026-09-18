import Link from "next/link";

const linkStyle = {
  fontFamily: "var(--font-body), sans-serif",
  fontSize: 14,
  fontWeight: 600,
  textDecoration: "none",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  paddingBottom: 6,
};

export default function NavLinks({ navLinks, pathname }) {
  return (
    <div className="nav-links">
      {navLinks.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            style={linkStyle}
            className={"nav-link" + (isActive ? " nav-link-active" : "")}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
