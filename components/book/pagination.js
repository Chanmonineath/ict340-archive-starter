// --- Real pagination -------------------------------------------------------
// Character-count estimates kept guessing the wrong page break. Instead, an
// offscreen leaf — built from the exact same classes as a real page — is
// used to measure actual rendered height, and content is split at whatever
// point genuinely overflows it. No font-metric guessing involved.

export function splitIntoSentences(text) {
  return text ? text.split(/(?<=[.!?])\s+/) : [];
}

// Whether `boundsEl` (the fixed-height leaf body) has been pushed taller
// than its own box by whatever was just placed inside it. `boundsEl` must be
// a constrained ancestor — the item container itself just grows to fit its
// content, so checking the container against itself never overflows.
function overflows(boundsEl) {
  return boundsEl.scrollHeight > boundsEl.clientHeight;
}

// Add sentences to `container` one at a time until `boundsEl` would overflow,
// then return the text that fit and what's left over.
export function fillWithSentences(container, boundsEl, sentences) {
  let fitCount = 0;
  for (let i = 1; i <= sentences.length; i += 1) {
    container.textContent = sentences.slice(0, i).join(" ");
    if (overflows(boundsEl)) break;
    fitCount = i;
  }
  // Guarantee forward progress even if a single sentence can't fit alone.
  if (fitCount === 0 && sentences.length > 0) fitCount = 1;
  container.textContent = sentences.slice(0, fitCount).join(" ");
  return {
    fitted: sentences.slice(0, fitCount).join(" "),
    rest: sentences.slice(fitCount),
  };
}

// Add cards (step cards, contents rows, ...) to `listEl` one at a time until
// `boundsEl` would overflow, then return however many actually fit.
export function fillWithCards(listEl, boundsEl, makeCard, items) {
  let fitCount = 0;
  for (let i = 1; i <= items.length; i += 1) {
    listEl.innerHTML = "";
    items.slice(0, i).forEach((item, idx) => listEl.appendChild(makeCard(item, idx)));
    if (overflows(boundsEl)) break;
    fitCount = i;
  }
  if (fitCount === 0 && items.length > 0) fitCount = 1;
  listEl.innerHTML = "";
  items.slice(0, fitCount).forEach((item, idx) => listEl.appendChild(makeCard(item, idx)));
  return items.slice(0, fitCount);
}

// Lay out one remedy against a live measurement rig, in reading order: the
// detail leaf (title, meta, ingredients, Benefit & Wellness Note opening)
// first, then any note overflow, then the Preparation Steps — each section
// continuing onto further leaves if it overflows, the way a printed recipe
// runs over the page break rather than truncating.
export function layoutRemedy(entry, rig) {
  const steps = Array.isArray(entry.process) ? entry.process : [entry.process];
  const note =
    entry.benefit || "Natural Cambodian home remedy passed down through family kitchens.";

  rig.renderDetailShell(entry);
  const { fitted: firstChunk, rest: noteRestSentences } = fillWithSentences(
    rig.detailNoteBox,
    rig.body,
    splitIntoSentences(note)
  );

  const noteRest = [];
  let remaining = noteRestSentences;
  while (remaining.length) {
    rig.renderPlainShell();
    const { fitted, rest } = fillWithSentences(rig.plainNoteBox, rig.body, remaining);
    noteRest.push(fitted);
    remaining = rest;
  }

  const leaves = [
    { detail: true, note: firstChunk, noteRunsOver: noteRest.length > 0 },
    ...noteRest.map((text, i) => ({
      note: text,
      noteContinued: true,
      noteRunsOver: i < noteRest.length - 1,
    })),
  ];

  let stepOffset = 0;
  let remainingSteps = steps;
  while (remainingSteps.length) {
    rig.renderStepsShell();
    const fitted = fillWithCards(rig.stepsList, rig.body, rig.makeStepCard, remainingSteps);
    leaves.push({ steps: fitted, offset: stepOffset });
    stepOffset += fitted.length;
    remainingSteps = remainingSteps.slice(fitted.length);
  }

  return leaves;
}

// Split the full list of remedies across as many contents leaves as the
// titles and Khmer names actually need, the same way a printed index runs
// over the page break rather than shrinking to fit.
export function layoutContentsLeaves(entries, rig) {
  const leaves = [];
  let remaining = entries.map((entry, idx) => ({ entry, idx }));
  let isFirst = true;

  while (remaining.length) {
    rig.renderContentsShell(isFirst);
    const fitted = fillWithCards(
      rig.contentsList,
      rig.body,
      (item) => rig.makeContentsRow(item.entry, item.idx),
      remaining
    );
    leaves.push({ rows: fitted, isFirst });
    remaining = remaining.slice(fitted.length);
    isFirst = false;
  }

  return leaves;
}

// Each remedy is laid out as a run of leaves in reading order — details and
// Benefit & Wellness Note first, then preparation steps — which are then
// paired into two-page sheets. Content that overflows a fixed-size leaf
// continues on the very next page, the way a printed book runs over the break.
export function buildSpreads(entries, rig) {
  const spreads = [{ kind: "dedication" }];

  // Spread 1 pairs the first contents leaf with the botanical plate. Any
  // remaining entries get dedicated contents spreads (both pages of rows)
  // before the first remedy, so the index is never truncated.
  const contentsLeaves = layoutContentsLeaves(entries, rig);
  spreads.push({ kind: "contents", rows: contentsLeaves[0]?.rows || [], isFirst: true });

  for (let i = 1; i < contentsLeaves.length; i += 2) {
    spreads.push({
      kind: "contentsOverflow",
      leftRows: contentsLeaves[i].rows,
      rightRows: contentsLeaves[i + 1] ? contentsLeaves[i + 1].rows : null,
    });
  }

  entries.forEach((entry, entryIndex) => {
    const steps = Array.isArray(entry.process) ? entry.process : [entry.process];
    const leaves = layoutRemedy(entry, rig);

    const sheets = [];
    for (let i = 0; i < leaves.length; i += 2) {
      sheets.push({ left: leaves[i], right: leaves[i + 1] || null });
    }

    sheets.forEach((sheet, page) => {
      spreads.push({
        kind: "remedy",
        entry,
        entryIndex,
        left: sheet.left,
        right: sheet.right,
        totalSteps: steps.length,
        page,
        pageCount: sheets.length,
      });
    });
  });

  spreads.push({ kind: "colophon" });
  return spreads;
}
