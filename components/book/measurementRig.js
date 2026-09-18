"use client";

import React from "react";
import { buildSpreads } from "./pagination.js";
import {
  makeStepCard,
  makeContentsRow,
  renderDetailShell,
  renderPlainShell,
  renderStepsShell,
  renderContentsShell,
} from "./rigShells.js";

// Builds one offscreen leaf, styled with the real page classes so its
// content area is pixel-identical to a leaf in the actual book, then exposes
// small helpers (from rigShells.js) to swap its content and read back what
// actually fit.
function createMeasurementRig() {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;top:0;left:-9999px;width:420px;visibility:hidden;pointer-events:none;";
  document.body.appendChild(host);

  const page = document.createElement("div");
  page.className = "folio-page";
  host.appendChild(page);

  const head = document.createElement("div");
  head.className = "folio-page-head";
  const body = document.createElement("div");
  body.className = "folio-page-body";
  const foot = document.createElement("div");
  foot.className = "folio-page-foot";
  page.append(head, body, foot);

  // The measurement box must have a real height to overflow against; the
  // page itself is sized purely by its "aspect-ratio: 3 / 4.2" CSS rule,
  // so forcing that same rule here keeps this rig in sync automatically.
  page.style.aspectRatio = "3 / 4.2";

  let detailNoteBox = null;
  let plainNoteBox = null;
  let stepsList = null;
  let contentsList = null;

  return {
    get body() {
      return body;
    },
    get detailNoteBox() {
      return detailNoteBox;
    },
    get plainNoteBox() {
      return plainNoteBox;
    },
    get stepsList() {
      return stepsList;
    },
    get contentsList() {
      return contentsList;
    },
    renderDetailShell: (entry) => {
      detailNoteBox = renderDetailShell(body, entry);
    },
    renderPlainShell: () => {
      plainNoteBox = renderPlainShell(body);
    },
    renderStepsShell: () => {
      stepsList = renderStepsShell(body);
    },
    renderContentsShell: (isFirst) => {
      contentsList = renderContentsShell(body, isFirst);
    },
    makeStepCard,
    makeContentsRow,
    destroy: () => host.remove(),
  };
}

// Runs the measurement pass once per `entries` array (or once the fonts and
// styles are ready), then holds the resulting spreads in state. Returns
// `null` while the very first measurement is in flight so nothing renders
// against a still-unmeasured layout.
export function useMeasuredSpreads(entries) {
  const [spreads, setSpreads] = React.useState(null);

  React.useLayoutEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const rig = createMeasurementRig();
      try {
        const result = buildSpreads(entries, rig);
        if (!cancelled) setSpreads(result);
      } finally {
        rig.destroy();
      }
    };

    if (document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(measure);
    } else {
      measure();
    }

    return () => {
      cancelled = true;
    };
  }, [entries]);

  return spreads;
}
