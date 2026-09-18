import Logo from "../Logo.js";
import { SparklesIcon } from "./icons.js";

export default function FolioClosedCover({ onOpen }) {
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
      aria-label="Open book"
    >
      <div className="folio-closed-inner">
        <div className="folio-closed-overlay">
          <div className="folio-closed-top">
            <span>ការអនុវត្តតាមផ្ទះ</span>
            <span>Family Archive</span>
          </div>

          <div className="folio-closed-mid">
            <div className="folio-closed-emblem">
              <Logo height={58} variant="light" emblemOnly />
            </div>
            <h1 className="folio-closed-title">Home Practices</h1>
            <div className="folio-closed-rule" />
            <p className="folio-closed-sub">Natural Remedies &amp; Family Care</p>
            <p className="folio-closed-note">Passed Down Through Generation</p>
          </div>

          <div className="folio-closed-cta">
            <SparklesIcon size={14} color="#F8CF75" />
            <span>Click to Open Book</span>
          </div>
        </div>

        <div className="folio-closed-spine" aria-hidden="true" />
      </div>
    </div>
  );
}
