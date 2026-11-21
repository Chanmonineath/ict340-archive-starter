import PROVINCES from "./PROVINCES.js";

const ALLOWED_PHOTO_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

export function validatePhoto(file, t) {
  if (!file) {
    return null;
  }
  if (!ALLOWED_PHOTO_TYPES[file.type]) {
    return t.photoTypeError;
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return t.photoSizeError;
  }
  return null;
}

export function photoExtension(file) {
  return ALLOWED_PHOTO_TYPES[file.type] ?? null;
}

// Pads a missing hours segment to "00" so a duration typed with only
// minutes (e.g. "h 20mn") always reaches the database as "00h 20mn",
// matching the entries_duration_format check constraint.
export function normalizeDuration(duration) {
  const match = /^(\d{0,2})h (\d{1,2})mn$/.exec((duration || "").trim());
  if (!match) return (duration || "").trim();
  const hours = match[1] || "00";
  return `${hours}h ${match[2]}mn`;
}

function lengthError(value, min, max, requiredMsg, tooLongMsg) {
  const len = value.trim().length;
  if (len < min) return requiredMsg;
  if (len > max) return tooLongMsg(max);
  return null;
}

export function validate(fields, photoFile, existingPhotoUrl, t) {
  const errors = {};

  const titleError = lengthError(fields.title, 1, 100, t.titleRequired, t.titleTooLong);
  if (titleError) errors.title = titleError;

  const khmerNameError = lengthError(fields.khmerName, 1, 100, t.khmerNameRequired, t.khmerNameTooLong);
  if (khmerNameError) errors.khmerName = khmerNameError;

  const sourceError = lengthError(fields.source, 1, 50, t.sourceRequired, t.sourceTooLong);
  if (sourceError) errors.source = sourceError;

  if (!fields.place.trim() || !PROVINCES.includes(fields.place.trim())) {
    errors.place = t.provinceRequired;
  }

  const categoryTrimmed = fields.category.trim();
  if (!categoryTrimmed) {
    errors.category = t.categoryRequired;
  } else if (!/^[A-Za-zក-៿\s&]+$/.test(categoryTrimmed)) {
    errors.category = t.categoryInvalid;
  }

  const ingredientsError = lengthError(fields.ingredients, 1, 200, t.ingredientsRequired, t.ingredientsTooLong);
  if (ingredientsError) errors.ingredients = ingredientsError;

  const steps = fields.process.map((step) => step.trim()).filter(Boolean);
  if (steps.length === 0) {
    errors.process = t.stepsRequired;
  } else if (steps.join(" ").length > 2000) {
    errors.process = t.stepsTooLong;
  }

  const benefitError = lengthError(fields.benefit, 1, 500, t.benefitRequired, t.benefitTooLong);
  if (benefitError) errors.benefit = benefitError;

  const durationMatch = /^(\d{0,2})h (\d{1,2})mn$/.exec(fields.duration || "");
  if (!durationMatch || (Number(durationMatch[1] || 0) === 0 && Number(durationMatch[2]) === 0)) {
    errors.duration = t.durationRequired;
  }

  if (!photoFile && !existingPhotoUrl) {
    errors.photo = t.photoRequired;
  } else {
    const photoError = validatePhoto(photoFile, t);
    if (photoError) errors.photo = photoError;
  }

  return errors;
}
