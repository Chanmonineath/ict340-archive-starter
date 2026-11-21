"use client";

import useLanguage from "../../hooks/useLanguage.js";

// Small client-side text pieces for the server-rendered review pages, so
// the reviewer gate (is_reviewer(), fetched server-side) stays untouched.
export function ReviewHeading() {
  const { t } = useLanguage();
  return t.review.heading;
}

export function CantReviewMessage() {
  const { t } = useLanguage();
  return t.review.cantReview;
}

export function NotPendingMessage() {
  const { t } = useLanguage();
  return t.review.notPending;
}

export function BackToQueueLink() {
  const { t } = useLanguage();
  return t.review.backToQueue;
}

export function PreparationProcessLabel() {
  const { t } = useLanguage();
  return t.contribute.preparationProcess;
}

export function BenefitNotesLabel() {
  const { t } = useLanguage();
  return t.contribute.benefitNotesHeading;
}
