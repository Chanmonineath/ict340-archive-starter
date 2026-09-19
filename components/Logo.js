export default function Logo({ height = 52, variant = "dark", emblemOnly = false }) {
  const wordmarkColor = variant === "light" ? "#F5EFE2" : "#1A392A";
  const subtitleColor = variant === "light" ? "#C9BCA6" : "#685B49";
  const emblemRing = variant === "light" ? "#F5EFE2" : "#1A392A";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={emblemOnly ? "8 4 70 66" : "6 6 302 62"}
      height={height}
      fill="none"
      role="img"
      aria-label={emblemOnly ? "PTEAH emblem" : "PTEAH — Home Practice"}
      style={{ display: "block", width: "auto", maxWidth: "100%" }}
    >
      <g transform="translate(10, 5) scale(0.7)">
        <circle cx="50" cy="50" r="46" stroke="#C49746" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.85" />
        <circle cx="50" cy="50" r="42" stroke={emblemRing} strokeWidth="1.25" opacity="0.9" />
        <path d="M28 52 C28 72 38 80 50 80 C62 80 72 72 72 52 L28 52 Z" fill="#1A392A" />
        <path d="M40 80 L36 86 L64 86 L60 80 Z" fill="#C49746" />
        <ellipse cx="50" cy="52" rx="23" ry="6" fill="#C49746" />
        <ellipse cx="50" cy="52" rx="19" ry="4" fill="#1A392A" opacity="0.6" />
        <path d="M62 30 L67 33 L48 62 L43 59 Z" fill="#C49746" />
        <ellipse cx="64.5" cy="31.5" rx="3.5" ry="2" fill="#1A392A" />
        <path d="M50 48 C49 36 46 26 50 18 C54 26 51 36 50 48 Z" fill="#1A392A" />
        <path d="M49 38 C40 32 36 24 43 20 C46 27 47 33 49 38 Z" fill="#C49746" opacity="0.95" />
        <path d="M51 38 C60 32 64 24 57 20 C54 27 53 33 51 38 Z" fill="#C49746" opacity="0.95" />
        <circle cx="34" cy="40" r="2.2" fill="#C49746" />
        <circle cx="66" cy="40" r="2.2" fill="#C49746" />
      </g>
      {!emblemOnly && (
      <>
      <text
        x="95"
        y="45"
        style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
        fontSize="28"
        fontWeight="bold"
        fill={wordmarkColor}
        letterSpacing="5"
      >
        PTEAH
      </text>
      <text
        x="96"
        y="62"
        style={{ fontFamily: "var(--font-khmer), system-ui, sans-serif" }}
        fontSize="11"
        fontWeight="500"
        fill={subtitleColor}
        letterSpacing="3"
      >
        ផ្ទះ • HOME PRACTICE
      </text>
      </>
      )}
    </svg>
  );
}
