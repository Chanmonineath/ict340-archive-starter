"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const colors = { gold: "#B8893A", teak: "#2E3B2A", silk: "#E8DCC0", paper: "#FAF6EC" };

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/archive", label: "Archive" },
  { href: "/contribute", label: "Contribute" },
];

export default function NavBar({ brand }) {
  const pathname = usePathname();

  const wrap = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: colors.paper,
    borderBottom: "1px solid " + colors.silk,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    gap: 24,
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
    gap: 28,
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
  return (
    <nav style={wrap} aria-label="Primary">
      <Link href="/" style={{ ...brandStyle, textDecoration: "none" }}>
        {brand}
      </Link>
      <div style={nav}>
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
    </nav>
  );
}