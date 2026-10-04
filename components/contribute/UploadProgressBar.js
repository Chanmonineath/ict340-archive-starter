const colors = { teak: "#2E3B2A" };

export default function UploadProgressBar({ label }) {
  return (
    <div>
      <p style={{ margin: "0 0 6px", fontFamily: "var(--font-body), sans-serif", fontSize: 12, color: colors.teak + "99" }}>
        {label}
      </p>
      <div className="contribute-progress-track">
        <div className="contribute-progress-bar" />
      </div>
    </div>
  );
}
