"use client";

import React from "react";
import { validate } from "./contributeValidation.js";
import { submitEntry } from "./submitEntry.js";
import ProcessStepsInput from "./ProcessStepsInput.js";
import PhotoUploadField from "./PhotoUploadField.js";
import SavedEntryView from "./SavedEntryView.js";
import ContributeIdentityFields from "./ContributeIdentityFields.js";
import ContributeDetailFields from "./ContributeDetailFields.js";
import ContributeCategoryField from "./ContributeCategoryField.js";
import ContributeFormHeader from "./ContributeFormHeader.js";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0", sand: "#F5EFE2" };

const EMPTY_FIELDS = {
  title: "", khmerName: "", source: "", place: "", category: "",
  ingredients: "", process: [""], benefit: "", duration: "",
};

export default function ContributeForm({ user }) {
  const [fields, setFields] = React.useState(EMPTY_FIELDS);
  const [photoFile, setPhotoFile] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [isSaving, setIsSaving] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [savedEntry, setSavedEntry] = React.useState(null);

  const updateField = (name) => (e) => setFields((prev) => ({ ...prev, [name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const nextErrors = validate(fields, photoFile);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSaving(true);
    try {
      const inserted = await submitEntry({ fields, photoFile, user });
      setSavedEntry(inserted);
    } catch {
      setFormError("Couldn't save your entry right now. Please try again.");
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

  if (savedEntry) {
    return <SavedEntryView entry={savedEntry} onReset={resetForm} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="contribute-form"
      style={{
        backgroundColor: colors.sand, border: "1px solid " + colors.silk, borderRadius: 15,
        padding: 32, display: "flex", flexDirection: "column", gap: 20,
      }}
    >
      <ContributeFormHeader />

      {formError && <p className="auth-form-error">{formError}</p>}

      <ContributeIdentityFields fields={fields} errors={errors} onFieldChange={updateField} />

      <ContributeCategoryField
        value={fields.category}
        error={errors.category}
        onChange={(category) => setFields((prev) => ({ ...prev, category }))}
      />

      <ContributeDetailFields fields={fields} errors={errors} onFieldChange={updateField} />

      <div>
        <ProcessStepsInput steps={fields.process} onChange={(process) => setFields((prev) => ({ ...prev, process }))} />
        {errors.process && <p className="auth-error" style={{ marginTop: 6 }}>{errors.process}</p>}
      </div>

      <PhotoUploadField file={photoFile} onChange={setPhotoFile} error={errors.photo} />

      <button type="submit" className="auth-submit" disabled={isSaving}>
        {isSaving ? "Saving…" : "Submit an Entry"}
      </button>
    </form>
  );
}
