import DurationInput from "./DurationInput.js";
import useLanguage from "../../hooks/useLanguage.js";

function Field({ id, label, error, shakeKey, children }) {
  return (
    <div>
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

export default function ContributeDetailFields({ fields, errors, onFieldChange, shakeKey }) {
  const { t } = useLanguage();

  return (
    <>
      <Field id="ingredients" label={t.contribute.ingredients} error={errors.ingredients} shakeKey={shakeKey}>
        <textarea id="ingredients" className="auth-input" rows={3} placeholder={t.contribute.ingredientsPlaceholder} value={fields.ingredients} onChange={onFieldChange("ingredients")} />
      </Field>

      <Field id="duration" label={t.contribute.duration} error={errors.duration} shakeKey={shakeKey}>
        <DurationInput
          value={fields.duration}
          onChange={(duration) => onFieldChange("duration")({ target: { value: duration } })}
        />
      </Field>

      <Field id="benefit" label={t.contribute.benefit} error={errors.benefit} shakeKey={shakeKey}>
        <textarea id="benefit" className="auth-input" rows={3} placeholder={t.contribute.benefitPlaceholder} value={fields.benefit} onChange={onFieldChange("benefit")} />
      </Field>
    </>
  );
}
