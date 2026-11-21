"use client";

import useLanguage from "../../hooks/useLanguage.js";

export function leafHeading(leaf, spread, fallback, t) {
  if (!leaf) return fallback;
  if (leaf.detail) return t.book.khmerHomePractices;
  if (leaf.noteContinued) return t.book.benefitWellnessNoteHeading(spread.entry.title);
  if (leaf.steps) return t.book.fullPreparationProcess;
  return fallback;
}

export function FolioNote({ side }) {
  const { t } = useLanguage();
  return (
    <div className="folio-note">
      <div className="folio-steps-head">
        <span className="folio-meta-label">{t.book.benefitWellnessNoteContinued}</span>
      </div>
      <div className="folio-box folio-box-tradition">
        {side.note}
        {side.noteRunsOver && (
          <span className="folio-note-catchword">{t.book.continuedOverleaf}</span>
        )}
      </div>
    </div>
  );
}

export function FolioSteps({ side, spread }) {
  const { t } = useLanguage();
  const last = side.offset + side.steps.length;
  return (
    <div className="folio-steps">
      <div className="folio-steps-head">
        <span className="folio-meta-label">
          {side.steps.length < spread.totalSteps
            ? t.book.stepsRange(side.offset + 1, last, spread.totalSteps)
            : t.book.preparationSteps(spread.totalSteps)}
        </span>
        <span className="folio-steps-time">{spread.entry.duration}</span>
      </div>

      <div className="folio-steps-list">
        {side.steps.map((step, idx) => (
          <div key={idx} className="folio-step">
            <span className="folio-step-num">{side.offset + idx + 1}</span>
            <div className="folio-step-text">{step}</div>
          </div>
        ))}
      </div>

      {last < spread.totalSteps && (
        <p className="folio-steps-catchword">{t.book.continuedOverleaf}</p>
      )}
    </div>
  );
}

export function FolioContentsRow({ row, targetSpreadIndex, pageNumber, onJump, t }) {
  const { entry, idx } = row;
  return (
    <button
      key={entry.id}
      type="button"
      className="folio-contents-row"
      onClick={() => onJump(targetSpreadIndex)}
    >
      <span className="folio-contents-num">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.</span>
      <span className="folio-contents-names">
        <span className="folio-contents-en">{entry.title}</span>
        {entry.khmerName && <span className="folio-contents-kh">({entry.khmerName})</span>}
      </span>
      <span className="folio-contents-page">{t.book.pageWord(pageNumber)}</span>
    </button>
  );
}

export function FolioContentsRows({ rows, spreadIndexForEntry, leftPageOf, onJump }) {
  const { t } = useLanguage();
  return (
    <div className="folio-contents-list">
      {rows.map((row) => {
        const targetSpreadIndex = spreadIndexForEntry(row.idx);
        return (
          <FolioContentsRow
            key={row.entry.id}
            row={row}
            targetSpreadIndex={targetSpreadIndex}
            pageNumber={leftPageOf(targetSpreadIndex)}
            onJump={onJump}
            t={t}
          />
        );
      })}
    </div>
  );
}
