import ProvinceSelect from "./ProvinceSelect.js";

function Field({ id, label, error, shakeKey, children }) {
  return (
    <div style={{ flex: "1 1 240px" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: 8, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, color: "#2E3B2A" }}>
        {label}
      </label>
      <div
        key={error ? shakeKey : "steady"}
        className={error ? "contribute-field-error contribute-field-shake" : undefined}
      >
        {children}
      </div>
      {error && <p className="auth-error" style={{ marginTop: 6 }}>{error}</p>}
    </div>
  );
}

export default function ContributeIdentityFields({ fields, errors, onFieldChange, shakeKey }) {
  return (
    <>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Field id="title" label="English Name" error={errors.title} shakeKey={shakeKey}>
          <input id="title" type="text" className="auth-input" placeholder="e.g. Tamarind & Sea Salt Scrub" value={fields.title} onChange={onFieldChange("title")} />
        </Field>
        <Field id="khmerName" label="Khmer Name" error={errors.khmerName} shakeKey={shakeKey}>
          <input id="khmerName" type="text" className="auth-input" placeholder="e.g. អំពិលទុំ និងអំបិល" value={fields.khmerName} onChange={onFieldChange("khmerName")} />
        </Field>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Field id="source" label="Source" error={errors.source} shakeKey={shakeKey}>
          <input id="source" type="text" className="auth-input" placeholder="e.g. My Grandmother" value={fields.source} onChange={onFieldChange("source")} />
        </Field>
        <Field id="place" label="Province" error={errors.place} shakeKey={shakeKey}>
          <ProvinceSelect value={fields.place} onChange={(place) => onFieldChange("place")({ target: { value: place } })} />
        </Field>
      </div>
    </>
  );
}
