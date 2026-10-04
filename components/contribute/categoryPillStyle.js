const colors = { active: "#2E5B3A", textInactive: "#615443" };

export const KNOWN_CATEGORIES = ["Hair & Skin", "Cough & Cold", "Heart & Circulation"];

export function pillStyle(isActive) {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    fontSize: 13,
    fontFamily: "var(--font-body), sans-serif",
    fontWeight: isActive ? 600 : 500,
    color: isActive ? "#FAF7F0" : colors.textInactive,
    backgroundColor: isActive ? colors.active : "#EBE3D3",
    border: `1px solid ${isActive ? colors.active : "#D8CBBA"}`,
    borderRadius: "9999px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    userSelect: "none",
  };
}
