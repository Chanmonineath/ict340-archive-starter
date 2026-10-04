"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";
import AccountIcon from "./icons/AccountIcon.js";

export default function BottomNavAccountTab({ user }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsOpen(false);
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <Link href="/login" className="bottom-nav-item">
        <AccountIcon />
        <span>Login</span>
      </Link>
    );
  }

  const fullName = user.user_metadata?.name;
  const displayName = fullName ? fullName.trim().split(/\s+/)[0] : user.email;

  return (
    <div className="bottom-nav-item bottom-nav-account" ref={menuRef}>
      <button
        type="button"
        className="bottom-nav-item bottom-nav-account-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label="Account"
      >
        <AccountIcon />
        <span>{displayName}</span>
      </button>

      {isOpen && (
        <div className="bottom-nav-account-dropdown">
          {fullName && <span className="nav-user-fullname">{fullName}</span>}
          <span className="nav-user-email">{user.email}</span>
          <button type="button" className="nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
