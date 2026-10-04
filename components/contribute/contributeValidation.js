import PROVINCES from "./PROVINCES.js";

const ALLOWED_PHOTO_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

function lengthError(label, value, min, max) {
  const len = value.trim().length;
  if (len < min) return `Please enter ${label.toLowerCase()}.`;
  if (len > max) return `${label} must be ${max} characters or fewer.`;
  return null;
}

export function validatePhoto(file) {
  if (!file) return "Please add a photo.";
  if (!ALLOWED_PHOTO_TYPES[file.type]) {
    return "Photo must be a JPG, PNG, or WEBP image.";
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return "Photo must be 5MB or smaller.";
  }
  return null;
}

export function photoExtension(file) {
  return ALLOWED_PHOTO_TYPES[file.type] ?? null;
}

export function validate(fields, photoFile) {
  const errors = {};

  const titleError = lengthError("Title", fields.title, 1, 100);
  if (titleError) errors.title = titleError;

  const khmerNameError = lengthError("Khmer name", fields.khmerName, 1, 100);
  if (khmerNameError) errors.khmerName = khmerNameError;

  const sourceError = lengthError("Source", fields.source, 1, 50);
  if (sourceError) errors.source = sourceError;

  if (!fields.place.trim() || !PROVINCES.includes(fields.place.trim())) {
    errors.place = "Please select a province.";
  }

  if (!fields.category.trim()) {
    errors.category = "Please choose or add a category.";
  }

  const ingredientsError = lengthError("Ingredients", fields.ingredients, 1, 200);
  if (ingredientsError) errors.ingredients = ingredientsError;

  const steps = fields.process.map((step) => step.trim()).filter(Boolean);
  if (steps.length === 0) {
    errors.process = "Please add at least one step.";
  } else if (steps.join(" ").length > 2000) {
    errors.process = "Process steps must total 2000 characters or fewer.";
  }

  const benefitError = lengthError("Benefit", fields.benefit, 1, 500);
  if (benefitError) errors.benefit = benefitError;

  const durationMatch = /^(\d{1,2})h (\d{1,2})mn$/.exec(fields.duration || "");
  if (!durationMatch || (durationMatch[1] === "0" && durationMatch[2] === "0")) {
    errors.duration = "Please enter how long this practice takes.";
  }

  const photoError = validatePhoto(photoFile);
  if (photoError) errors.photo = photoError;

  return errors;
}
