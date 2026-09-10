"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0", paper: "#FAF6EC", active: "#2E5B3A" };

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/archive", label: "Archive" },
  { href: "/contribute", label: "Contribute" },
];

export default function NavBar({ brand }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const wrap = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: colors.paper,
    borderBottom: "1px solid " + colors.silk,
  };
  const topRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const brandStyle = {
    fontFamily: "var(--font-heading), serif",
    fontSize: 20,
    fontWeight: 700,
    color: colors.teak,
    margin: 0,
    letterSpacing: "-0.02em",
  };
  const nav = {
    display: "flex",
    alignItems: "center",
  };
  const linkStyle = (isActive) => ({
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 13,
    fontWeight: 500,
    color: isActive ? colors.teak : colors.teak + "CC",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    paddingBottom: 6,
    borderBottom: "2px solid " + (isActive ? colors.teak : "transparent"),
  });
  const mobileLinkStyle = (isActive) => ({
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: isActive ? "#ffffff" : colors.teak,
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "12px 16px",
    borderRadius: 8,
    backgroundColor: isActive ? colors.active : "transparent",
  });

  return (
    <nav style={wrap} className="nav-wrap" aria-label="Primary">
      <div style={topRow} className="nav-top-row">
        <Link href="/" style={{ ...brandStyle, textDecoration: "none" }}>
          {brand}
        </Link>

        <div style={nav} className="nav-links">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={linkStyle(pathname === href)}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          <span className={"nav-toggle-bar" + (isMenuOpen ? " nav-toggle-bar-1-open" : "")} />
          <span className={"nav-toggle-bar" + (isMenuOpen ? " nav-toggle-bar-2-open" : "")} />
          <span className={"nav-toggle-bar" + (isMenuOpen ? " nav-toggle-bar-3-open" : "")} />
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={"nav-mobile-panel" + (isMenuOpen ? " nav-mobile-panel-open" : "")}
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={mobileLinkStyle(pathname === href)}
            aria-current={pathname === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
