import { ChevronLeft, ChevronRight, BookOpenIcon } from "./icons.js";
import useLanguage from "../../hooks/useLanguage.js";

export function FolioFlipOverlay({ isFlipping, turningDirection }) {
  if (!isFlipping) return null;
  return (
    <div
      className={
        "folio-flip" + (turningDirection === "next" ? " folio-flip-next" : " folio-flip-prev")
      }
      aria-hidden="true"
    >
      <div className="folio-flip-face" />
      <div className="folio-flip-face folio-flip-face-back" />
      <div className="folio-flip-shade" />
    </div>
  );
}

export function FolioArrows({ onPrev, onNext, atFirstPage, atLastPage, isFlipping }) {
  const { t } = useLanguage();

  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        disabled={atFirstPage || isFlipping}
        className="folio-arrow folio-arrow-prev"
        title={t.book.prevPageTitle}
        aria-label={t.book.prevPageAria}
      >
        <ChevronLeft size={20} color="#F5CA75" />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={atLastPage || isFlipping}
        className="folio-arrow folio-arrow-next"
        title={t.book.nextPageTitle}
        aria-label={t.book.nextPageAria}
      >
        <ChevronRight size={20} color="#F5CA75" />
      </button>
    </>
  );
}

export function FolioFooter({
  totalSpreads,
  currentSpread,
  side,
  isPhone,
  onJump,
  onPrev,
  onNext,
  atFirstPage,
  atLastPage,
  onClose,
}) {
  const { t } = useLanguage();

  return (
    <div className="folio-footer">
      <div className="folio-dots">
        {Array.from({ length: totalSpreads }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onJump(idx)}
            className={"folio-dot" + (currentSpread === idx ? " folio-dot-active" : "")}
            title={t.book.jumpToSpread(idx + 1)}
            aria-label={t.book.jumpToSpread(idx + 1)}
          />
        ))}
      </div>

      <div className="folio-jumper">
        <button type="button" onClick={onPrev} disabled={atFirstPage} className="folio-jump-btn">
          <ChevronLeft size={14} /> {isPhone ? t.book.previous : t.book.previousSpread}
        </button>
        <span className="folio-jump-count">
          {isPhone
            ? t.book.leafCount(side === "left" ? "1" : "2", currentSpread + 1, totalSpreads)
            : t.book.spreadCount(currentSpread + 1, totalSpreads)}
        </span>
        <button type="button" onClick={onNext} disabled={atLastPage} className="folio-jump-btn">
          {isPhone ? t.book.next : t.book.nextSpread} <ChevronRight size={14} />
        </button>
      </div>

      <button type="button" className="folio-close-btn" onClick={onClose}>
        <BookOpenIcon size={14} color="#E6BC6B" />
        <span>{t.book.closeCover}</span>
      </button>
    </div>
  );
}
