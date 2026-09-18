import Logo from "../Logo.js";
import collection from "../../collection.config.js";
import { BookOpenIcon } from "./icons.js";
import { FolioNote, FolioSteps, FolioContentsRows, leafHeading } from "./FolioNoteAndSteps.js";

export default function FolioPageLeft({
  spread,
  currentRemedy,
  leftPageNum,
  spreadIndexForEntry,
  leftPageOf,
  onJump,
}) {
  return (
    <div className="folio-page folio-page-left">
      <div className="folio-page-head">
        <span>
          {spread.kind === "remedy"
            ? leafHeading(spread.left, spread, "Khmer Home Practices")
            : "Khmer Home Practices"}
        </span>
        <span>Page {leftPageNum}</span>
      </div>

      <div className={"folio-page-body" + (spread.kind === "remedy" ? "" : " folio-page-body-centred")}>
        {spread.kind === "dedication" && (
          <div className="folio-dedication">
            <div className="folio-emblem-ring">
              <Logo height={44} emblemOnly />
            </div>
            <span className="folio-kicker">Dedicated to Family Wisdom</span>
            <h2 className="folio-dedication-khmer">ការអនុវត្តតាមផ្ទះ</h2>
            <p className="folio-dedication-quote">
              &ldquo;Every remedy here carries the hands that made it.&rdquo;
            </p>
            <div className="folio-hairline" />
            <p className="folio-dedication-blurb">
              With gratitude to the family members, elders, and contributors who shared these
              remedies, so this knowledge can be kept and passed on.
            </p>
          </div>
        )}

        {spread.kind === "contents" && (
          <div className="folio-contents">
            <div className="folio-contents-kicker">
              <BookOpenIcon size={14} color="#1A392A" />
              <span>Table of Home Remedies</span>
            </div>
            <h2 className="folio-contents-khmer">មាតិកាឱសថ និងការថែទាំតាមផ្ទះ</h2>

            <FolioContentsRows
              rows={spread.rows}
              spreadIndexForEntry={spreadIndexForEntry}
              leftPageOf={leftPageOf}
              onJump={onJump}
            />
          </div>
        )}

        {spread.kind === "contentsOverflow" && (
          <div className="folio-contents">
            <FolioContentsRows
              rows={spread.leftRows}
              spreadIndexForEntry={spreadIndexForEntry}
              leftPageOf={leftPageOf}
              onJump={onJump}
            />
          </div>
        )}

        {currentRemedy && spread.left?.detail && (
          <div className="folio-remedy">
            <div>
              {currentRemedy.khmerName && (
                <span className="folio-remedy-kh">{currentRemedy.khmerName}</span>
              )}
              <h3 className="folio-remedy-title">{currentRemedy.title}</h3>
            </div>

            <div className="folio-remedy-meta">
              <div>
                <span className="folio-meta-label">Contributor</span>
                <span className="folio-meta-value">{currentRemedy.contributor}</span>
              </div>
              <div>
                <span className="folio-meta-label">Place</span>
                <span className="folio-meta-value">{currentRemedy.place}</span>
              </div>
              <div className="folio-meta-wide">
                <span className="folio-meta-label">Duration</span>
                <span className="folio-meta-value folio-meta-value-plain">
                  {currentRemedy.duration}
                </span>
              </div>
            </div>

            {currentRemedy.ingredients && (
              <div>
                <span className="folio-meta-label folio-meta-label-block">Ingredients</span>
                <div className="folio-box">{currentRemedy.ingredients}</div>
              </div>
            )}

            <div className="folio-box folio-box-tradition">
              <span className="folio-tradition-label">Benefit &amp; Wellness Note:</span>
              {spread.left.note}
              {spread.left.noteRunsOver && (
                <span className="folio-note-catchword">Continued overleaf →</span>
              )}
            </div>
          </div>
        )}

        {currentRemedy && spread.left?.steps && <FolioSteps side={spread.left} spread={spread} />}
        {currentRemedy && spread.left?.noteContinued && <FolioNote side={spread.left} />}

        {spread.kind === "colophon" && (
          <div className="folio-colophon">
            <span className="folio-kicker">Living Family Archive</span>
            <h2 className="folio-colophon-title">Preserving Home Heritage</h2>
            <p className="folio-colophon-text">
              These home practices demonstrate that natural health and self-care thrive right at
              home with simple, wholesome pantry ingredients.
            </p>
          </div>
        )}
      </div>

      <div className="folio-page-foot">
        <span>{collection.name} Archive</span>
        <span>Page {leftPageNum}</span>
      </div>
    </div>
  );
}
