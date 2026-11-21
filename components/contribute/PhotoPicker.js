import useLanguage from "../../hooks/useLanguage.js";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0" };

export default function PhotoPicker({ inputRef, onFileChange, file, existingPhotoUrl, displayedPreviewUrl, error }) {
  const { t } = useLanguage();

  return (
    <div>
      <label
        htmlFor="contribute-photo"
        style={{ display: "block", marginBottom: 8, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, color: colors.teak }}
      >
        {t.contribute.photoLabel}
      </label>
      <input
        id="contribute-photo"
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onFileChange}
        className="auth-input"
      />
      <p style={{ margin: "6px 0 0", fontSize: 12, color: colors.teak + "99", fontFamily: "var(--font-body), sans-serif" }}>
        {t.contribute.photoHelp}
      </p>
      {existingPhotoUrl && !file && (
        <p style={{ margin: "6px 0 0", fontSize: 12, color: colors.teak + "99", fontFamily: "var(--font-body), sans-serif" }}>
          {t.contribute.keepingCurrentPhoto}
        </p>
      )}
      {file && (
        <p style={{ margin: "6px 0 0", fontSize: 12, color: colors.teak + "99", fontFamily: "var(--font-body), sans-serif" }}>
          {file.name}
        </p>
      )}
      {displayedPreviewUrl && (
        <img
          src={displayedPreviewUrl}
          alt={t.contribute.photoPreviewAlt}
          style={{ marginTop: 10, maxWidth: 160, borderRadius: 15, border: "1px solid " + colors.silk }}
        />
      )}
      {error && (
        <p className="auth-error" style={{ marginTop: 6 }}>
          {error}
        </p>
      )}
    </div>
  );
}
