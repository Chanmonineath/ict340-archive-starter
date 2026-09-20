"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo.js";
import collection from "../collection.config.js";
import useAutoHideHeader from "../hooks/useAutoHideHeader.js";
import useSupabaseUser from "../hooks/useSupabaseUser.js";
import NavLinks from "./nav/NavLinks.js";
import MobileNavPanel from "./nav/MobileNavPanel.js";
import NavActions from "./nav/NavActions.js";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0", paper: "#FAF6EC", active: "#24492E" };

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/archive", label: "Archive" },
  { href: "/contribute", label: "Contribute" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [navHeight, setNavHeight] = React.useState(0);
  const navRef = React.useRef(null);

  const isHidden = useAutoHideHeader({ pauseWhile: isMenuOpen });
  const { user } = useSupabaseUser();

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const wrap = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.paper,
    borderBottom: "1px solid " + colors.silk,
    transform: isHidden ? "translateY(-100%)" : "none",
    transition: "transform 0.25s ease",
  };
  const topRow = { display: "flex", alignItems: "center", justifyContent: "space-between" };

  return (
    <>
      <nav ref={navRef} style={wrap} className="nav-wrap" aria-label="Primary">
        <div style={topRow} className="nav-top-row">
          <Link href="/" className="nav-brand" aria-label={`${collection.name} home`}>
            <Logo height={34} />
          </Link>

          <NavLinks navLinks={navLinks} pathname={pathname} />

          <NavActions
            user={user}
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen((open) => !open)}
          />
        </div>

        <MobileNavPanel
          navLinks={navLinks}
          pathname={pathname}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </nav>
      <div style={{ height: navHeight }} aria-hidden="true" />
    </>
  );
}
