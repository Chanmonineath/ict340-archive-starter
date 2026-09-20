"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";

export default function UserMenu({ user }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const displayName = user.user_metadata?.name || user.email;

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
    router.push("/");
    router.refresh();
  };

  return (
    <div className="nav-user" ref={menuRef}>
      <button
        type="button"
        className="nav-user-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ width: 15, height: 15, flexShrink: 0 }}
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
        <span className="nav-user-name">{displayName}</span>
      </button>

      {isOpen && (
        <div className="nav-user-dropdown">
          <span className="nav-user-email">{user.email}</span>
          <button type="button" className="nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
