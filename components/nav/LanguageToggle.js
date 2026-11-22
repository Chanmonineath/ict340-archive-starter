"use client";

import useLanguage from "../../hooks/useLanguage.js";

const colors = { teak: "#2E3B2A", gold: "#C49746", cream: "#FAF7F0" };

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const isKhmer = language === "km";

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: isKhmer ? colors.teak + "66" : colors.teak,
          transition: "color 0.2s ease",
        }}
      >
        EN
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isKhmer}
        aria-label="Language"
        onClick={() => setLanguage(isKhmer ? "en" : "km")}
        style={{
          position: "relative",
          width: 64,
          height: 34,
          border: "1px solid " + colors.gold,
          borderRadius: 9999,
          backgroundColor: colors.cream,
          boxShadow: "inset 0 2px 4px rgba(46, 59, 42, 0.18)",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 2,
            left: isKhmer ? "calc(100% - 30px)" : 2,
            width: 28,
            height: 28,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(29, 54, 39, 0.3)",
            transition: "left 0.2s ease",
          }}
        >
          <img
            src={isKhmer ? "/assets/flag-kh.webp" : "/assets/flag-uk.webp"}
            alt=""
            width={28}
            height={28}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </span>
      </button>

      <span
        style={{
          fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: isKhmer ? colors.teak : colors.teak + "66",
          transition: "color 0.2s ease",
        }}
      >
        KH
      </span>
    </div>
  );
}
