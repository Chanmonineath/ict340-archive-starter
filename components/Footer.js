"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo.js";
import collection from "../collection.config.js";
import scrollToArchive from "./scrollToArchive.js";
import useLanguage from "../hooks/useLanguage.js";

export default function Footer() {
  const pathname = usePathname();
  const onHomePage = pathname === "/";
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <Logo height={56} variant="light" />
          </div>
          <p className="footer-blurb">
            {t.footer.blurb}
          </p>
        </div>

        <div className="footer-links-col">
          <h2 className="footer-heading">{t.footer.archiveHeading}</h2>
          {onHomePage ? (
            <>
              <button type="button" onClick={scrollToArchive} className="footer-link footer-link-button">
                {t.footer.bookView}
              </button>
              <button type="button" onClick={scrollToArchive} className="footer-link footer-link-button">
                {t.footer.recipeCards}
              </button>
            </>
          ) : (
            <>
              <Link href="/#archive" className="footer-link">
                {t.footer.bookView}
              </Link>
              <Link href="/#archive" className="footer-link">
                {t.footer.recipeCards}
              </Link>
            </>
          )}
          <Link href="/contribute" className="footer-link">
            {t.footer.join}
          </Link>
        </div>

        <div className="footer-curated-col">
          <h2 className="footer-heading">{t.footer.curatedHeading}</h2>
          <div className="footer-curated-item">
            <p className="footer-curated-label">{t.footer.curatedBy}</p>
            <p className="footer-curated-value">{collection.curator}</p>
            {collection.curatorKhmer && (
              <p className="footer-curated-khmer">{collection.curatorKhmer}</p>
            )}
          </div>
          <div className="footer-curated-item">
            <p className="footer-curated-label">{t.footer.sourceInspiration}</p>
            <p className="footer-curated-value">{collection.source}</p>
            {collection.sourceKhmer && (
              <p className="footer-curated-khmer">{collection.sourceKhmer}</p>
            )}
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          {t.footer.copyright(collection.name)}
        </p>
        <p className="footer-credit">
          {t.footer.credit}
          <svg viewBox="0 0 24 24" fill="#E5544B" aria-hidden="true" style={{ width: 14, height: 14 }}>
            <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
          </svg>
        </p>
      </div>
    </footer>
  );
}
