"use client";

import React from "react";
import { validatePhoto } from "./contributeValidation.js";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0" };

export default function PhotoUploadField({ file, onChange, error }) {
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) {
      onChange(null);
      setPreviewUrl(null);
      return;
    }
    if (validatePhoto(selected)) {
      // Still accept it into state so the shared validate() surfaces the
      // same message; just skip generating a preview for a bad file.
      onChange(selected);
      setPreviewUrl(null);
      return;
    }
    onChange(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  return (
    <div>
      <label
        htmlFor="contribute-photo"
        style={{ display: "block", marginBottom: 8, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, color: colors.teak }}
      >
        Photo
      </label>
      <input
        id="contribute-photo"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="auth-input"
      />
      {file && (
        <p style={{ margin: "6px 0 0", fontSize: 12, color: colors.teak + "99", fontFamily: "var(--font-body), sans-serif" }}>
          {file.name}
        </p>
      )}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview of the uploaded photo"
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
