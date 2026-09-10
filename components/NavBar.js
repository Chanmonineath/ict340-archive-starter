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
  const [isHidden, setIsHidden] = React.useState(false);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (isMenuOpen) {
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 80) {
        setIsHidden(false);
      } else if (delta > 0) {
        setIsHidden(true);
      } else if (delta < 0) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const wrap = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: colors.paper,
    borderBottom: "1px solid " + colors.silk,
    transform: isHidden ? "translateY(-100%)" : "none",
    transition: "transform 0.25s ease",
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
    alignItems: "center",
  };
  const linkStyle = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 13,
    fontWeight: 500,
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    paddingBottom: 6,
  };
  const mobileLinkStyle = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "12px 16px",
    borderRadius: 8,
  };

  return (
    <nav style={wrap} className="nav-wrap" aria-label="Primary">
      <div style={topRow} className="nav-top-row">
        <Link href="/" style={{ ...brandStyle, textDecoration: "none" }}>
          {brand}
        </Link>

        <div style={nav} className="nav-links">
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

      {isMenuOpen && (
        <div
          className="nav-mobile-backdrop"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-nav-panel"
        className={"nav-mobile-panel" + (isMenuOpen ? " nav-mobile-panel-open" : "")}
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
    </nav>
  );
}
