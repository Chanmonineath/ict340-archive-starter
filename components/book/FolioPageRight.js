"use client";

import Logo from "../Logo.js";
import { ChevronRight, HeartIcon, RotateIcon, BotanicalPlate } from "./icons.js";
import { FolioNote, FolioSteps, FolioContentsRows, leafHeading } from "./FolioNoteAndSteps.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function FolioPageRight({
  spread,
  currentRemedy,
  rightPageNum,
  spreadIndexForEntry,
  leftPageOf,
  onJump,
  onNextPage,
}) {
  const { t } = useLanguage();

  return (
    <div className="folio-page folio-page-right">
      <div className="folio-page-head">
        <span>
          {spread.kind === "contents"
            ? t.book.botanicalPlate
            : spread.kind === "contentsOverflow"
              ? t.book.tableOfHomeRemedies
              : spread.kind === "remedy"
                ? leafHeading(spread.right, spread, t.book.fullPreparationProcess, t)
                : t.book.fullPreparationProcess}
        </span>
        <span>{t.book.pageWord(rightPageNum)}</span>
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
            <h3 className="folio-invite-title">{t.book.livingHomeKnowledge}</h3>
            <p className="folio-invite-text">{t.book.livingHomeKnowledgeText}</p>
            <button type="button" className="folio-invite-btn" onClick={onNextPage}>
              <span>{t.book.exploreHomeRemedies}</span>
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
                  <span className="folio-plate-caption-en">{t.book.plateCaption}</span>
                </div>
              </div>
            </div>

            <p className="folio-plate-inscription">{t.book.plateInscription}</p>
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
            <h3 className="folio-thanks-title">{t.book.honoringFamilyTradition}</h3>
            <p className="folio-thanks-text">{t.book.honoringFamilyTraditionText}</p>
            <button
              type="button"
              className="folio-invite-btn folio-invite-btn-sm"
              onClick={() => onJump(1)}
            >
              <RotateIcon size={14} color="#E6BC6B" />
              <span>{t.book.backToTableOfContents}</span>
            </button>
          </div>
        )}
      </div>

      <div className="folio-page-foot">
        <span>{t.book.khmerHomePractices}</span>
        <span>{t.book.pageWord(rightPageNum)}</span>
      </div>
    </div>
  );
}
