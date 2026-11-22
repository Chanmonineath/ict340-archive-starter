import useLanguage from "../../hooks/useLanguage.js";

const colors = { teak: "#2E3B2A" };

export default function ContributeFormHeader({ isEditing }) {
  const { t } = useLanguage();

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: 0, fontFamily: "var(--font-heading), var(--font-khmer), serif", fontWeight: 700, color: colors.teak }}>
        {isEditing ? t.contribute.editHeading : t.contribute.newHeading}
      </h2>
    </div>
  );
}
