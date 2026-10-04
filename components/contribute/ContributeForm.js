"use client";

import React from "react";
import { validate } from "./contributeValidation.js";
import { submitEntry } from "./submitEntry.js";
import { updateEntry } from "./updateEntry.js";
import ProcessStepsInput from "./ProcessStepsInput.js";
import PhotoUploadField from "./PhotoUploadField.js";
import SavedEntryView from "./SavedEntryView.js";
import ContributeIdentityFields from "./ContributeIdentityFields.js";
import ContributeDetailFields from "./ContributeDetailFields.js";
import ContributeCategoryField from "./ContributeCategoryField.js";
import ContributeFormHeader from "./ContributeFormHeader.js";
import UploadProgressBar from "./UploadProgressBar.js";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0", sand: "#F5EFE2" };

const EMPTY_FIELDS = {
  title: "",
  khmerName: "",
  source: "",
  place: "",
  category: "",
  ingredients: "",
  process: [""],
  benefit: "",
  duration: "",
};

function fieldsFromEntry(entry) {
  return {
    title: entry.title || "",
    khmerName: entry.khmerName || "",
    source: entry.contributor || "",
    place: entry.place || "",
    category: entry.category || "",
    ingredients: entry.ingredients || "",
    process:
      Array.isArray(entry.process) && entry.process.length > 0
        ? entry.process
        : [""],
    benefit: entry.benefit || "",
    duration: entry.duration || "",
  };
}

export default function ContributeForm({ user, editingEntry }) {
  const isEditing = Boolean(editingEntry);
  const [fields, setFields] = React.useState(() =>
    isEditing ? fieldsFromEntry(editingEntry) : EMPTY_FIELDS,
  );
  const [photoFile, setPhotoFile] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [isSaving, setIsSaving] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [savedEntry, setSavedEntry] = React.useState(null);

  const updateField = (name) => (e) =>
    setFields((prev) => ({ ...prev, [name]: e.target.value }));
  const existingPhotoUrl = isEditing ? editingEntry.imageLabel : null;

  const formRef = React.useRef(null);

  const hasChanges =
    !isEditing ||
    Boolean(photoFile) ||
    JSON.stringify(fields) !== JSON.stringify(fieldsFromEntry(editingEntry));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (isEditing && !hasChanges) {
      setFormError("No changes to save.");
      return;
    }

    const nextErrors = validate(fields, photoFile);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setIsSaving(true);
    try {
      const saved = isEditing
        ? await updateEntry({
            id: editingEntry.id,
            ownerId: editingEntry.owner,
            fields,
            photoFile,
            currentPhotoUrl: existingPhotoUrl,
          })
        : await submitEntry({ fields, photoFile, user });
      setSavedEntry(saved);
    } catch (err) {
      setFormError(
        err.message === "no-row"
          ? "That change wasn't saved"
          : `Couldn't ${isEditing ? "save your changes" : "save your entry"} right now. Please try again.`,
      );
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFields(EMPTY_FIELDS);
    setPhotoFile(null);
    setErrors({});
    setSavedEntry(null);
  };

  const handleCancel = () => {
    if (!hasChanges) {
      setFormError("No changes to cancel.");
      return;
    }
    setFields(fieldsFromEntry(editingEntry));
    setPhotoFile(null);
    setErrors({});
    setFormError("");
  };

  if (savedEntry) {
    return (
      <SavedEntryView
        entry={savedEntry}
        onReset={resetForm}
        isEditing={isEditing}
      />
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="contribute-form"
      style={{
        backgroundColor: colors.sand,
        border: "1px solid " + colors.silk,
        borderRadius: 15,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <ContributeFormHeader isEditing={isEditing} />

      {errorCount > 0 && (
        <p className="auth-form-error">
          {errorCount === 1
            ? "Please fix the highlighted field below."
            : `Please fix the ${errorCount} highlighted fields below.`}
        </p>
      )}

      <ContributeIdentityFields
        fields={fields}
        errors={errors}
        onFieldChange={updateField}
      />

      <ContributeCategoryField
        value={fields.category}
        error={errors.category}
        onChange={(category) => setFields((prev) => ({ ...prev, category }))}
      />

      <ContributeDetailFields
        fields={fields}
        errors={errors}
        onFieldChange={updateField}
      />

      <div>
        <ProcessStepsInput
          steps={fields.process}
          onChange={(process) => setFields((prev) => ({ ...prev, process }))}
        />
        {errors.process && (
          <p className="auth-error" style={{ marginTop: 6 }}>
            {errors.process}
          </p>
        )}
      </div>

      <PhotoUploadField
        file={photoFile}
        onChange={setPhotoFile}
        error={errors.photo}
        existingPhotoUrl={existingPhotoUrl}
      />

      {isSaving && (
        <UploadProgressBar
          label={photoFile ? "Uploading photo and saving…" : "Saving…"}
        />
      )}

      <div style={{ display: "flex", gap: 12 }}>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="contribute-cancel"
            style={{
              flex: 1,
              marginTop: 4,
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#FAF7F0",
              border: "none",
              borderRadius: 9999,
              padding: "13px 20px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="auth-submit"
          disabled={isSaving}
          style={{ flex: 1 }}
        >
          {isSaving
            ? "Saving…"
            : isEditing
              ? "Save Changes"
              : "Submit an Entry"}
        </button>
      </div>

      {formError && (
        <p className="auth-error" style={{ margin: 0, textAlign: "right" }}>
          {formError}
        </p>
      )}
    </form>
  );
}
