import Link from "next/link";

const colors = {
  gold: "#C49746",
};

export default function Hero({ eyebrow, statement, supportCopy }) {
  return (
    <section className="hero-wrap" role="region" aria-label="Introduction">
      <p className="hero-eyebrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.gold}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ width: 14, height: 14, flexShrink: 0 }}
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </svg>
        {eyebrow}
      </p>

      <h1 className="hero-title">{statement}</h1>

      <p className="hero-support">{supportCopy}</p>

      <div className="hero-actions">
        <Link href="/archive" className="hero-btn-primary" aria-label="Explore the archive">
          Explore the Archive
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ width: 16, height: 16 }}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>

        <Link href="/contribute" className="hero-btn-secondary" aria-label="Share a home recipe">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ width: 16, height: 16 }}
          >
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Share a Home Recipe
        </Link>
      </div>
    </section>
  );
}
