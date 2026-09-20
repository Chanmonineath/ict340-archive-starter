import Link from "next/link";

export default function LoginLink() {
  return (
    <Link href="/login" className="nav-join" aria-label="Login">
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
        <g className="nav-join-person">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </g>
        <line className="nav-join-plus" x1="19" y1="8" x2="19" y2="14" />
        <line className="nav-join-plus" x1="22" y1="11" x2="16" y2="11" />
      </svg>
      <span className="nav-join-label">Login</span>
    </Link>
  );
}
