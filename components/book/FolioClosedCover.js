import Logo from "../Logo.js";
import { SparklesIcon } from "./icons.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function FolioClosedCover({ onOpen }) {
  const { t } = useLanguage();

  return (
    <div
      className="folio-closed"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={t.book.openBook}
    >
      <div className="folio-closed-inner">
        <div className="folio-closed-overlay">
          <div className="folio-closed-top">
            <span>ការអនុវត្តតាមផ្ទះ</span>
            <span>{t.book.coverLabel}</span>
          </div>

          <div className="folio-closed-mid">
            <div className="folio-closed-emblem">
              <Logo height={58} variant="light" emblemOnly />
            </div>
            <h1 className="folio-closed-title">{t.book.coverTitle}</h1>
            <div className="folio-closed-rule" />
            <p className="folio-closed-sub">{t.book.coverSubtitle}</p>
            <p className="folio-closed-note">{t.book.coverNote}</p>
          </div>

          <div className="folio-closed-cta">
            <SparklesIcon size={14} color="#F8CF75" />
            <span>{t.book.clickToOpen}</span>
          </div>
        </div>

        <div className="folio-closed-spine" aria-hidden="true" />
      </div>
    </div>
  );
}
