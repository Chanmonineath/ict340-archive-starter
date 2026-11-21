import ProvinceSelect from "./ProvinceSelect.js";
import useLanguage from "../../hooks/useLanguage.js";

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
  const { t } = useLanguage();

  return (
    <>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Field id="title" label={t.contribute.englishName} error={errors.title} shakeKey={shakeKey}>
          <input id="title" type="text" className="auth-input" placeholder={t.contribute.englishNamePlaceholder} value={fields.title} onChange={onFieldChange("title")} />
        </Field>
        <Field id="khmerName" label={t.contribute.khmerName} error={errors.khmerName} shakeKey={shakeKey}>
          <input id="khmerName" type="text" className="auth-input" placeholder="e.g. អំពិលទុំ និងអំបិល" value={fields.khmerName} onChange={onFieldChange("khmerName")} />
        </Field>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Field id="source" label={t.contribute.source} error={errors.source} shakeKey={shakeKey}>
          <input id="source" type="text" className="auth-input" placeholder={t.contribute.sourcePlaceholder} value={fields.source} onChange={onFieldChange("source")} />
        </Field>
        <Field id="place" label={t.contribute.province} error={errors.place} shakeKey={shakeKey}>
          <ProvinceSelect value={fields.place} onChange={(place) => onFieldChange("place")({ target: { value: place } })} />
        </Field>
      </div>
    </>
  );
}
