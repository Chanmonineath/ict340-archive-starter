import Logo from "../Logo.js";
import { ChevronRight, HeartIcon, RotateIcon, BotanicalPlate } from "./icons.js";
import { FolioNote, FolioSteps, FolioContentsRows, leafHeading } from "./FolioNoteAndSteps.js";

export default function FolioPageRight({
  spread,
  currentRemedy,
  rightPageNum,
  spreadIndexForEntry,
  leftPageOf,
  onJump,
  onNextPage,
}) {
  return (
    <div className="folio-page folio-page-right">
      <div className="folio-page-head">
        <span>
          {spread.kind === "contents"
            ? "Botanical Plate"
            : spread.kind === "contentsOverflow"
              ? "Table of Home Remedies"
              : spread.kind === "remedy"
                ? leafHeading(spread.right, spread, "Full Preparation Process")
                : "Full Preparation Process"}
        </span>
        <span>Page {rightPageNum}</span>
      </div>

      <div
        className={
          "folio-page-body" +
          (spread.kind === "remedy" || spread.kind === "contentsOverflow"
            ? ""
            : " folio-page-body-centred")
        }
      >
        {spread.kind === "dedication" && (
          <div className="folio-invite">
            <div className="folio-emblem-ring folio-emblem-ring-dark">
              <Logo height={44} emblemOnly />
            </div>
            <h3 className="folio-invite-title">Living Home Knowledge</h3>
            <p className="folio-invite-text">
              Preserved directly from the hearths of Cambodian families.
            </p>
            <button type="button" className="folio-invite-btn" onClick={onNextPage}>
              <span>Explore Home Remedies</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {spread.kind === "contents" && (
          <div className="folio-plate">
            <div className="folio-plate-frame">
              <div className="folio-plate-inner">
                <BotanicalPlate />
                <div className="folio-plate-scrim" aria-hidden="true" />
                <div className="folio-plate-caption">
                  <span className="folio-plate-caption-kh">គ្រឿងផ្សំធម្មជាតិតាមផ្ទះ</span>
                  <span className="folio-plate-caption-en">
                    Pure Natural Ingredients &amp; Stone Pestles
                  </span>
                </div>
              </div>
            </div>

            <p className="folio-plate-inscription">
              &ldquo; Oral Tradition • Passed Down Through Generations.&rdquo;
            </p>
          </div>
        )}

        {spread.kind === "contentsOverflow" && spread.rightRows && (
          <div className="folio-contents">
            <FolioContentsRows
              rows={spread.rightRows}
              spreadIndexForEntry={spreadIndexForEntry}
              leftPageOf={leftPageOf}
              onJump={onJump}
            />
          </div>
        )}

        {currentRemedy && spread.right?.steps && <FolioSteps side={spread.right} spread={spread} />}
        {currentRemedy && spread.right?.noteContinued && <FolioNote side={spread.right} />}

        {spread.kind === "colophon" && (
          <div className="folio-thanks">
            <div className="folio-thanks-ring">
              <HeartIcon size={24} color="#1A392A" />
            </div>
            <h3 className="folio-thanks-title">Honoring Family Tradition</h3>
            <p className="folio-thanks-text">
              Thank you for reading and keeping traditional Cambodian home self-care alive.
            </p>
            <button
              type="button"
              className="folio-invite-btn folio-invite-btn-sm"
              onClick={() => onJump(1)}
            >
              <RotateIcon size={14} color="#E6BC6B" />
              <span>Back to Table of Contents</span>
            </button>
          </div>
        )}
      </div>

      <div className="folio-page-foot">
        <span>Khmer Home Practices</span>
        <span>Page {rightPageNum}</span>
      </div>
    </div>
  );
}
