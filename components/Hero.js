"use client";

import Link from "next/link";

export default function Hero({ eyebrow, statement, khmerStatement, supportCopy }) {
  const handleExploreClick = (e) => {
    const target = document.getElementById("archive");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-wrap" role="region" aria-label="Introduction">
      <img src="/assets/background.jpg" alt="" aria-hidden="true" className="hero-bg-photo" />
      <div className="hero-bg-scrim" aria-hidden="true" />
      <div className="hero-bg-glow" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-eyebrow">{eyebrow}</p>

        <h1 className="hero-title">{statement}</h1>

        {khmerStatement && <p className="hero-title-khmer">{khmerStatement}</p>}

        <p className="hero-support">{supportCopy}</p>

        <div className="hero-actions">
          <Link href="#archive" onClick={handleExploreClick} className="hero-btn-primary" aria-label="Explore the archive">
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
      </div>
    </section>
  );
}
