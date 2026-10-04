import DurationInput from "./DurationInput.js";

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} style={{ display: "block", marginBottom: 8, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, color: "#2E3B2A" }}>
        {label}
      </label>
      {children}
      {error && <p className="auth-error" style={{ marginTop: 6 }}>{error}</p>}
    </div>
  );
}

export default function ContributeDetailFields({ fields, errors, onFieldChange }) {
  return (
    <>
      <Field id="ingredients" label="Ingredients" error={errors.ingredients}>
        <textarea id="ingredients" className="auth-input" rows={3} placeholder="e.g. Ripe tamarind pulp, coarse sea salt, and a spoonful of honey" value={fields.ingredients} onChange={onFieldChange("ingredients")} />
      </Field>

      <Field id="duration" label="Estimated Preparation Time" error={errors.duration}>
        <DurationInput
          value={fields.duration}
          onChange={(duration) => onFieldChange("duration")({ target: { value: duration } })}
        />
      </Field>

      <Field id="benefit" label="Benefit & Wellness Notes" error={errors.benefit}>
        <textarea id="benefit" className="auth-input" rows={3} placeholder="Why is this practice helpful?" value={fields.benefit} onChange={onFieldChange("benefit")} />
      </Field>
    </>
  );
}
