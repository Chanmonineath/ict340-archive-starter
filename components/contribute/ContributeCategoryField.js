import CategoryPicker from "./CategoryPicker.js";

const colors = { teak: "#2E3B2A" };

export default function ContributeCategoryField({ value, error, onChange }) {
  return (
    <div>
      <label style={{ display: "block", marginBottom: 8, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, color: colors.teak }}>
        Category
      </label>
      <CategoryPicker value={value} onChange={onChange} />
      {error && <p className="auth-error" style={{ marginTop: 6 }}>{error}</p>}
    </div>
  );
}
