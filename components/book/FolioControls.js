import { ChevronLeft, ChevronRight, BookOpenIcon } from "./icons.js";

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
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        disabled={atFirstPage || isFlipping}
        className="folio-arrow folio-arrow-prev"
        title="Previous Page (Left Arrow)"
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} color="#F5CA75" />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={atLastPage || isFlipping}
        className="folio-arrow folio-arrow-next"
        title="Next Page (Right Arrow)"
        aria-label="Next Page"
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
  return (
    <div className="folio-footer">
      <div className="folio-dots">
        {Array.from({ length: totalSpreads }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onJump(idx)}
            className={"folio-dot" + (currentSpread === idx ? " folio-dot-active" : "")}
            title={`Jump to spread ${idx + 1}`}
            aria-label={`Jump to spread ${idx + 1}`}
          />
        ))}
      </div>

      <div className="folio-jumper">
        <button type="button" onClick={onPrev} disabled={atFirstPage} className="folio-jump-btn">
          <ChevronLeft size={14} /> {isPhone ? "Previous" : "Previous Spread"}
        </button>
        <span className="folio-jump-count">
          {isPhone
            ? `Leaf ${side === "left" ? "1" : "2"} · Sheet ${currentSpread + 1} of ${totalSpreads}`
            : `Spread ${currentSpread + 1} of ${totalSpreads}`}
        </span>
        <button type="button" onClick={onNext} disabled={atLastPage} className="folio-jump-btn">
          {isPhone ? "Next" : "Next Spread"} <ChevronRight size={14} />
        </button>
      </div>

      <button type="button" className="folio-close-btn" onClick={onClose}>
        <BookOpenIcon size={14} color="#E6BC6B" />
        <span>Close Cover</span>
      </button>
    </div>
  );
}
