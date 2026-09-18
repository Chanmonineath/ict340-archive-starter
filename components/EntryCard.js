"use client";

import React from "react";
import EntryModal from "./EntryModal.js";
import { colors, label } from "./entry/entryStyles.js";
import EntryMeta from "./entry/EntryMeta.js";
import EntryProcessPreview from "./entry/EntryProcessPreview.js";
import EntryCardFooter from "./entry/EntryCardFooter.js";
// Re-enable once real photos replace the placeholder text:
// import EntryPhoto from "./EntryPhoto.js";

export default function EntryCard({
  title, khmerName, contributor, place, ingredients, process, benefit, duration, imageLabel,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const steps = Array.isArray(process) ? process : [process];

  return (
    <article
      className="entry-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 24,
        backgroundColor: colors.cream,
        border: "1px solid " + colors.silk,
        borderRadius: 24,
      }}
    >
      {/* <EntryPhoto label={imageLabel} /> */}

      {khmerName && (
        <p style={{ fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold, margin: 0 }}>
          {khmerName}
        </p>
      )}
      <h3 style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 24, fontWeight: 700, color: colors.teak, margin: 0, lineHeight: 1.25 }}>
        {title}
      </h3>

      <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

      <EntryMeta contributor={contributor} place={place} ingredients={ingredients} />

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <p style={label}>Process ({steps.length} steps)</p>
          <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 12, color: "#7D6E5C" }}>
            Summary view
          </span>
        </div>
        <EntryProcessPreview steps={steps} />
      </div>

      <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

      <EntryCardFooter duration={duration} onReadMore={() => setIsOpen(true)} />

      {isOpen && (
        <EntryModal
          title={title}
          khmerName={khmerName}
          contributor={contributor}
          place={place}
          ingredients={ingredients}
          process={steps}
          benefit={benefit}
          imageLabel={imageLabel}
          onClose={() => setIsOpen(false)}
        />
      )}
    </article>
  );
}
