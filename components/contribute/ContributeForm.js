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
import useLanguage from "../../hooks/useLanguage.js";

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
  const { t } = useLanguage();
  const isEditing = Boolean(editingEntry);
  const [fields, setFields] = React.useState(() =>
    isEditing ? fieldsFromEntry(editingEntry) : EMPTY_FIELDS,
  );
  const [photoFile, setPhotoFile] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [isSaving, setIsSaving] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [savedEntry, setSavedEntry] = React.useState(null);
  const [baselineFields, setBaselineFields] = React.useState(() =>
    isEditing ? fieldsFromEntry(editingEntry) : EMPTY_FIELDS,
  );
  const [shakeKey, setShakeKey] = React.useState(0);

  const updateField = (name) => (e) =>
    setFields((prev) => ({ ...prev, [name]: e.target.value }));
  const existingPhotoUrl = isEditing ? editingEntry.imageLabel : null;

  const formRef = React.useRef(null);

  const hasChanges =
    !isEditing ||
    Boolean(photoFile) ||
    JSON.stringify(fields) !== JSON.stringify(baselineFields);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (isEditing && !hasChanges) {
      setFormError(t.contribute.noChangesToSave);
      return;
    }

    const nextErrors = validate(fields, photoFile, existingPhotoUrl, t.contribute);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setShakeKey((key) => key + 1);
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
      setBaselineFields(fields);
    } catch (err) {
      setFormError(
        err.message === "no-row"
          ? t.contribute.changeNotSaved
          : t.contribute.saveFailed(isEditing),
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditAgain = () => {
    setFields(
      fieldsFromEntry({
        title: savedEntry.title,
        khmerName: savedEntry.khmer_name,
        contributor: savedEntry.source,
        place: savedEntry.place,
        category: savedEntry.category,
        ingredients: savedEntry.ingredients,
        process: savedEntry.process,
        benefit: savedEntry.benefit,
        duration: savedEntry.duration,
      }),
    );
    setPhotoFile(null);
    setErrors({});
    setFormError("");
    setSavedEntry(null);
  };

  const handleCancel = () => {
    if (!hasChanges) {
      setFormError(t.contribute.noChangesToCancel);
      return;
    }
    setFields(baselineFields);
    setPhotoFile(null);
    setErrors({});
    setFormError("");
  };

  const resetForm = () => {
    setFields(EMPTY_FIELDS);
    setPhotoFile(null);
    setErrors({});
    setSavedEntry(null);
  };

  if (savedEntry) {
    return (
      <SavedEntryView
        entry={savedEntry}
        isEditing={isEditing}
        onEditAgain={handleEditAgain}
        onSubmitAnother={resetForm}
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
            ? t.contribute.fixOneField
            : t.contribute.fixManyFields(errorCount)}
        </p>
      )}

      <ContributeIdentityFields
        fields={fields}
        errors={errors}
        onFieldChange={updateField}
        shakeKey={shakeKey}
      />

      <ContributeCategoryField
        value={fields.category}
        error={errors.category}
        onChange={(category) => setFields((prev) => ({ ...prev, category }))}
        shakeKey={shakeKey}
      />

      <ContributeDetailFields
        fields={fields}
        errors={errors}
        onFieldChange={updateField}
        shakeKey={shakeKey}
      />

      <div
        key={errors.process ? `process-${shakeKey}` : "process-steady"}
        className={errors.process ? "contribute-field-error contribute-field-shake" : undefined}
      >
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

      <div
        key={errors.photo ? `photo-${shakeKey}` : "photo-steady"}
        className={errors.photo ? "contribute-field-error contribute-field-shake" : undefined}
      >
        <PhotoUploadField
          file={photoFile}
          onChange={setPhotoFile}
          error={errors.photo}
          existingPhotoUrl={existingPhotoUrl}
        />
      </div>

      {isSaving && (
        <UploadProgressBar
          label={photoFile ? t.contribute.uploadingAndSaving : t.contribute.saving}
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
            {t.contribute.cancel}
          </button>
        )}
        <button
          type="submit"
          className="auth-submit"
          disabled={isSaving}
          style={{ flex: 1 }}
        >
          {isSaving
            ? t.contribute.saving
            : isEditing
              ? t.contribute.saveChanges
              : t.contribute.submitEntry}
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
