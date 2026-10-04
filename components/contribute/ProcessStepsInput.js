"use client";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0", button: "#2E5B3A" };

export default function ProcessStepsInput({ steps, onChange }) {
  const updateStep = (index, value) => {
    const next = [...steps];
    next[index] = value;
    onChange(next);
  };

  const addStep = () => onChange([...steps, ""]);
  const removeStep = (index) => onChange(steps.filter((_, i) => i !== index));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <label style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 600, color: colors.teak }}>
          Preparation Process Steps
        </label>
        <button
          type="button"
          onClick={addStep}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: colors.button, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 13,
          }}
        >
          + Add Step
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map((step, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                backgroundColor: colors.silk, color: colors.teak, fontSize: 12, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {index + 1}
            </span>
            <input
              type="text"
              className="auth-input"
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              style={{ flex: 1 }}
            />
            {steps.length > 1 && (
              <button
                type="button"
                onClick={() => removeStep(index)}
                aria-label={`Remove step ${index + 1}`}
                style={{
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "none", border: "none", cursor: "pointer", padding: 4,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.button}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ width: 22, height: 22 }}
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
