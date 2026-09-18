// DOM-builder functions used by the measurement rig (createMeasurementRig in
// measurementRig.js). Each `render*Shell` clears and rebuilds `body` with the
// real page markup for one kind of leaf, so its measured height matches what
// actually renders. Kept separate from the rig's own setup/teardown so each
// leaf type's markup can be read on its own.

export function makeStepCard(step, idx) {
  const card = document.createElement("div");
  card.className = "folio-step";
  const num = document.createElement("span");
  num.className = "folio-step-num";
  num.textContent = String(idx + 1);
  const text = document.createElement("div");
  text.className = "folio-step-text";
  text.textContent = step;
  card.append(num, text);
  return card;
}

export function makeContentsRow(remedy, idx) {
  const row = document.createElement("div");
  row.className = "folio-contents-row";
  const num = document.createElement("span");
  num.className = "folio-contents-num";
  num.textContent = `${idx + 1 < 10 ? "0" : ""}${idx + 1}.`;
  const names = document.createElement("span");
  names.className = "folio-contents-names";
  const en = document.createElement("span");
  en.className = "folio-contents-en";
  en.textContent = remedy.title;
  names.appendChild(en);
  if (remedy.khmerName) {
    const kh = document.createElement("span");
    kh.className = "folio-contents-kh";
    kh.textContent = `(${remedy.khmerName})`;
    names.appendChild(kh);
  }
  const page = document.createElement("span");
  page.className = "folio-contents-page";
  row.append(num, names, page);
  return row;
}

// Renders the detail leaf (title, meta, ingredients, Benefit & Wellness Note
// opening) into `body`, and returns the <span> that holds the note text so
// the caller can fill it sentence-by-sentence and measure overflow.
export function renderDetailShell(body, entry) {
  body.innerHTML = "";
  const remedy = document.createElement("div");
  remedy.className = "folio-remedy";

  const titleWrap = document.createElement("div");
  if (entry.khmerName) {
    const kh = document.createElement("span");
    kh.className = "folio-remedy-kh";
    kh.textContent = entry.khmerName;
    titleWrap.appendChild(kh);
  }
  const title = document.createElement("h3");
  title.className = "folio-remedy-title";
  title.textContent = entry.title;
  titleWrap.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "folio-remedy-meta";
  meta.innerHTML =
    '<div><span class="folio-meta-label">Contributor</span>' +
    '<span class="folio-meta-value"></span></div>' +
    '<div><span class="folio-meta-label">Place</span>' +
    '<span class="folio-meta-value"></span></div>' +
    '<div class="folio-meta-wide"><span class="folio-meta-label">Duration</span>' +
    '<span class="folio-meta-value folio-meta-value-plain"></span></div>';
  meta.querySelectorAll(".folio-meta-value")[0].textContent = entry.contributor || "";
  meta.querySelectorAll(".folio-meta-value")[1].textContent = entry.place || "";
  meta.querySelectorAll(".folio-meta-value")[2].textContent = entry.duration || "";

  remedy.append(titleWrap, meta);

  if (entry.ingredients) {
    const wrap = document.createElement("div");
    const label = document.createElement("span");
    label.className = "folio-meta-label folio-meta-label-block";
    label.textContent = "Ingredients";
    const box = document.createElement("div");
    box.className = "folio-box";
    box.textContent = entry.ingredients;
    wrap.append(label, box);
    remedy.appendChild(wrap);
  }

  const tradition = document.createElement("div");
  tradition.className = "folio-box folio-box-tradition";
  const label = document.createElement("span");
  label.className = "folio-tradition-label";
  label.textContent = "Benefit & Wellness Note:";
  const noteText = document.createElement("span");
  // The real render adds a "Continued overleaf" line whenever the note
  // doesn't fully fit. Its height must be reserved during measurement too
  // — otherwise text judged to "fit" can be pushed over by that line once
  // the real page adds it, which is exactly what clipped this box before.
  const catchword = document.createElement("span");
  catchword.className = "folio-note-catchword";
  catchword.textContent = "Continued overleaf →";
  tradition.append(label, noteText, catchword);
  remedy.appendChild(tradition);

  body.appendChild(remedy);
  return noteText;
}

// Renders a "Benefit & Wellness Note (continued)" leaf into `body` and
// returns the <span> that holds its text.
export function renderPlainShell(body) {
  body.innerHTML = "";
  const note = document.createElement("div");
  note.className = "folio-note";
  const head = document.createElement("div");
  head.className = "folio-steps-head";
  head.innerHTML = '<span class="folio-meta-label">Benefit & Wellness Note (continued)</span>';
  const box = document.createElement("div");
  box.className = "folio-box folio-box-tradition";
  const noteText = document.createElement("span");
  // Same reservation as the detail leaf: the real page may append a
  // "Continued overleaf" line, so its height must be budgeted for here too.
  const catchword = document.createElement("span");
  catchword.className = "folio-note-catchword";
  catchword.textContent = "Continued overleaf →";
  box.append(noteText, catchword);
  note.append(head, box);
  body.appendChild(note);
  return noteText;
}

// Renders a "Preparation Steps" leaf into `body` and returns the list
// element that step cards get appended to.
export function renderStepsShell(body) {
  body.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "folio-steps";
  const head = document.createElement("div");
  head.className = "folio-steps-head";
  head.innerHTML =
    '<span class="folio-meta-label">Preparation Steps</span><span class="folio-steps-time"></span>';
  const list = document.createElement("div");
  list.className = "folio-steps-list";
  // Reserve the "Continued overleaf" line's height up front, same as the
  // note shells — the real page appends it whenever steps run over, and it
  // must count against the available space during measurement too.
  const catchword = document.createElement("p");
  catchword.className = "folio-steps-catchword";
  catchword.textContent = "Continued overleaf →";
  wrap.append(head, list, catchword);
  body.appendChild(wrap);
  return list;
}

// Renders a contents-list leaf into `body` (with its heading only on the
// very first leaf) and returns the list element rows get appended to.
export function renderContentsShell(body, isFirst) {
  body.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "folio-contents";
  if (isFirst) {
    const kicker = document.createElement("div");
    kicker.className = "folio-contents-kicker";
    kicker.innerHTML =
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4h7a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2z"/><path d="M22 4h-7a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22z"/></svg><span>Table of Home Remedies</span>';
    const heading = document.createElement("h2");
    heading.className = "folio-contents-khmer";
    heading.textContent = "មាតិកាឱសថ និងការថែទាំតាមផ្ទះ";
    wrap.append(kicker, heading);
  }
  const list = document.createElement("div");
  list.className = "folio-contents-list";
  wrap.appendChild(list);
  body.appendChild(wrap);
  return list;
}
