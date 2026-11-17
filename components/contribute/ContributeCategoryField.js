import CategoryPicker from "./CategoryPicker.js";

const colors = { teak: "#2E3B2A" };

export default function ContributeCategoryField({ value, error, onChange, shakeKey }) {
  return (
    <div>
      <label style={{ display: "block", marginBottom: 8, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, color: colors.teak }}>
        Category
      </label>
      <div
        key={error ? shakeKey : "steady"}
        className={error ? "contribute-field-shake" : undefined}
        style={error ? { outline: "1px solid #8B261E", outlineOffset: 4, borderRadius: 9999 } : undefined}
      >
        <CategoryPicker value={value} onChange={onChange} />
      </div>
      {error && <p className="auth-error" style={{ marginTop: 6 }}>{error}</p>}
    </div>
  );
}
