"use client";

import { label, value, box } from "./entryStyles.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function EntryMeta({ contributor, place, ingredients }) {
  const { t } = useLanguage();

  return (
    <>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div>
          <p style={label}>{t.entryCard.sourceLabel}</p>
          <p style={value}>{contributor}</p>
        </div>
        <div>
          <p style={label}>{t.entryCard.placeLabel}</p>
          <p style={value}>{place}</p>
        </div>
      </div>

      {ingredients && (
        <div>
          <p style={label}>{t.entryCard.ingredientsLabel}</p>
          <p style={box}>{ingredients}</p>
        </div>
      )}
    </>
  );
}
