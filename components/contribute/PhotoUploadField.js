"use client";

import React from "react";
import { validatePhoto } from "./contributeValidation.js";
import PhotoCropper from "./PhotoCropper.js";
import PhotoPicker from "./PhotoPicker.js";

const colors = { teak: "#2E3B2A" };

export default function PhotoUploadField({ file, onChange, error, existingPhotoUrl }) {
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [pendingFile, setPendingFile] = React.useState(null);
  const [pendingUrl, setPendingUrl] = React.useState(null);
  const inputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) {
      onChange(null);
      setPreviewUrl(null);
      return;
    }
    if (validatePhoto(selected)) {
      // Still accept it into state so the shared validate() surfaces the
      // same message; just skip opening the cropper for a file that will
      // be rejected anyway.
      onChange(selected);
      setPreviewUrl(null);
      return;
    }
    setPendingFile(selected);
    setPendingUrl(URL.createObjectURL(selected));
  };

  const handleCropConfirm = (croppedFile) => {
    onChange(croppedFile);
    setPreviewUrl(URL.createObjectURL(croppedFile));
    setPendingFile(null);
    setPendingUrl(null);
  };

  const handleCropCancel = () => {
    setPendingFile(null);
    setPendingUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (pendingFile) {
    return (
      <div>
        <label style={{ display: "block", marginBottom: 8, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, color: colors.teak }}>
          Crop Photo
        </label>
        <PhotoCropper
          imageUrl={pendingUrl}
          originalFile={pendingFile}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      </div>
    );
  }

  return (
    <PhotoPicker
      inputRef={inputRef}
      onFileChange={handleFileChange}
      file={file}
      existingPhotoUrl={existingPhotoUrl}
      displayedPreviewUrl={previewUrl || (!file ? existingPhotoUrl : null)}
      error={error}
    />
  );
}
