import Link from "next/link";
import Logo from "./Logo.js";
import collection from "../collection.config.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <Logo height={56} variant="light" />
          </div>
          <p className="footer-blurb">
            A living archive dedicated to recording traditional Cambodian home remedies, fresh
            natural ingredients, and everyday family self-care passed down through generation.
          </p>
        </div>

        <div className="footer-links-col">
          <h2 className="footer-heading">The Archive</h2>
          <Link href="/#archive" className="footer-link">
            Book View
          </Link>
          <Link href="/#archive" className="footer-link">
            Recipe Cards
          </Link>
          <Link href="/contribute" className="footer-link">
            Join
          </Link>
        </div>

        <div className="footer-curated-col">
          <h2 className="footer-heading">Curated with Care</h2>
          <div className="footer-curated-item">
            <p className="footer-curated-label">Curated by</p>
            <p className="footer-curated-value">{collection.curator}</p>
            {collection.curatorKhmer && (
              <p className="footer-curated-khmer">{collection.curatorKhmer}</p>
            )}
          </div>
          <div className="footer-curated-item">
            <p className="footer-curated-label">Source &amp; Inspiration</p>
            <p className="footer-curated-value">{collection.source}</p>
            {collection.sourceKhmer && (
              <p className="footer-curated-khmer">{collection.sourceKhmer}</p>
            )}
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © 2026 {collection.name}. Preserving Cambodian Domestic Care &amp; Herbal Remedies.
        </p>
        <p className="footer-credit">
          Crafted with family respect &amp; care
          <svg viewBox="0 0 24 24" fill="#E5544B" aria-hidden="true" style={{ width: 14, height: 14 }}>
            <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
          </svg>
        </p>
      </div>
    </footer>
  );
}
