"use client";

import { useMeasuredSpreads } from "./book/measurementRig.js";
import useBookNavigation from "./book/useBookNavigation.js";
import FolioClosedCover from "./book/FolioClosedCover.js";
import FolioPageLeft from "./book/FolioPageLeft.js";
import FolioPageRight from "./book/FolioPageRight.js";
import { FolioFlipOverlay, FolioArrows, FolioFooter } from "./book/FolioControls.js";

export default function BookView({ entries, initialRemedyId }) {
  const measuredSpreads = useMeasuredSpreads(entries);
  const spreads = measuredSpreads || [{ kind: "dedication" }];

  const nav = useBookNavigation(spreads, initialRemedyId);

  const spread = spreads[nav.currentSpread];
  const currentRemedy = spread.kind === "remedy" ? spread.entry : undefined;
  // Single source of truth for spread index -> printed page number, so every
  // page number shown anywhere in the book — including the contents page's
  // "jump to page" links — is strictly sequential from page 1 with no gaps
  // or repeats: spread 0 = pages 1-2, spread 1 = pages 3-4, and so on.
  const leftPageOf = (spreadIndex) => spreadIndex * 2 + 1;
  const rightPageOf = (spreadIndex) => spreadIndex * 2 + 2;

  const spreadIndexForEntry = (entryIndex) =>
    spreads.findIndex((s) => s.kind === "remedy" && s.entryIndex === entryIndex && s.page === 0);

  return (
    <div className="folio">
      <div className="folio-stage">
        {!nav.isOpen ? (
          <FolioClosedCover onOpen={() => nav.setIsOpen(true)} />
        ) : (
          <div className="folio-book">
            <div className={`folio-spread folio-spread-${nav.side}`}>
              <div className="folio-gutter" aria-hidden="true">
                <div className="folio-gutter-halves">
                  <div className="folio-gutter-left" />
                  <div className="folio-gutter-right" />
                </div>
                <div className="folio-stitches">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="folio-stitch" />
                  ))}
                </div>
              </div>

              <FolioPageLeft
                spread={spread}
                currentRemedy={currentRemedy}
                leftPageNum={leftPageOf(nav.currentSpread)}
                spreadIndexForEntry={spreadIndexForEntry}
                leftPageOf={leftPageOf}
                onJump={nav.jumpToSpread}
              />

              <FolioPageRight
                spread={spread}
                currentRemedy={currentRemedy}
                rightPageNum={rightPageOf(nav.currentSpread)}
                spreadIndexForEntry={spreadIndexForEntry}
                leftPageOf={leftPageOf}
                onJump={nav.jumpToSpread}
                onNextPage={nav.handleNextPage}
              />
            </div>

            <FolioFlipOverlay isFlipping={nav.isFlipping} turningDirection={nav.turningDirection} />

            <FolioArrows
              onPrev={nav.handlePrevPage}
              onNext={nav.handleNextPage}
              atFirstPage={nav.atFirstPage}
              atLastPage={nav.atLastPage}
              isFlipping={nav.isFlipping}
            />
          </div>
        )}
      </div>

      {nav.isOpen && (
        <FolioFooter
          totalSpreads={nav.totalSpreads}
          currentSpread={nav.currentSpread}
          side={nav.side}
          isPhone={nav.isPhone}
          onJump={nav.jumpToSpread}
          onPrev={nav.handlePrevPage}
          onNext={nav.handleNextPage}
          atFirstPage={nav.atFirstPage}
          atLastPage={nav.atLastPage}
          onClose={() => nav.setIsOpen(false)}
        />
      )}
    </div>
  );
}
