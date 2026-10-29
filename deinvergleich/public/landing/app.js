/* Landing-page lead form and reference band. */
(() => {
  'use strict';

  const form = document.getElementById('lead-form');
  if (!form) return;

  const STEPS = [
    { label: 'Unternehmen', fields: ['unternehmen', 'plz'] },
    { label: 'Kontakt', fields: ['name', 'telefonnummer', 'emailadresse'] },
    { label: 'Projekt', fields: ['dsbVorhanden', 'start', 'unternehmensgroesse'] },
    { label: 'Prüfen', fields: ['gdprConsent'] },
  ];
  const LAST = STEPS.length - 1;
  const LABELS = {
    land: { DE: 'Deutschland' },
    dsbVorhanden: {
      ja: 'Ja, wir haben bereits einen externen DSB',
      nein: 'Nein, wir benötigen einen externen DSB',
      unsicher: 'Ich bin mir nicht sicher',
    },
    unternehmensgroesse: {
      '1-10': '1–10 Mitarbeiter',
      '11-50': '11–50 Mitarbeiter',
      '51-250': '51–250 Mitarbeiter',
      '251-500': '251–500 Mitarbeiter',
      '500+': 'Über 500 Mitarbeiter',
    },
  };
  const CHECK = '<svg class="icon" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.4 3.2 3.2L15 6.8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const todayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const value = (name) => {
    const el = form.elements[name];
    if (!el) return '';
    if (el.type === 'checkbox') return el.checked;
    return String(el.value ?? '').trim();
  };

  // Messages are phrased as instructions; the production Zod messages are the source.
  const VALIDATE = {
    unternehmen: (v) => (!v ? 'Bitte geben Sie Ihren Firmennamen ein'
      : v.length < 2 ? 'Firmenname muss mindestens 2 Zeichen haben'
      : v.length > 100 ? 'Firmenname darf maximal 100 Zeichen haben' : ''),
    plz: (v) => (!v ? 'Bitte geben Sie die PLZ ein'
      : /^\d{5}$/.test(v) ? '' : 'PLZ muss aus 5 Ziffern bestehen'),
    name: (v) => (!v ? 'Bitte geben Sie Ihren Namen ein'
      : v.length < 2 ? 'Name muss mindestens 2 Zeichen haben'
      : v.length > 50 ? 'Name darf maximal 50 Zeichen haben' : ''),
    // Separators are ignored, so the hinted format "+49 123 456789" is accepted.
    telefonnummer: (v) => (!v ? 'Bitte geben Sie Ihre Telefonnummer ein'
      : /^(\+49|0)[1-9]\d{1,14}$/.test(v.replace(/[\s()/.-]/g, '')) ? ''
      : 'Bitte geben Sie eine gültige Telefonnummer ein, z. B. +49 123 456789'),
    emailadresse: (v) => (!v ? 'Bitte geben Sie Ihre E-Mail-Adresse ein'
      : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? ''
      : 'Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@firma.de'),
    dsbVorhanden: (v) => (v in LABELS.dsbVorhanden ? '' : 'Bitte wählen Sie eine Option aus'),
    start: (v) => (!v ? 'Bitte wählen Sie einen Starttermin'
      : v < todayISO() ? 'Der Starttermin darf nicht in der Vergangenheit liegen' : ''),
    unternehmensgroesse: (v) => (v in LABELS.unternehmensgroesse ? '' : 'Bitte wählen Sie eine Unternehmensgröße aus'),
    gdprConsent: (v) => (v ? '' : 'Bitte stimmen Sie der Datenschutzerklärung zu, damit wir Ihre Anfrage senden können'),
  };

  const panels = [...form.querySelectorAll('.step')];
  const rail = form.querySelector('.rail');
  const stepNum = form.querySelector('[data-step-num]');
  const status = form.querySelector('[data-status]');
  const backBtn = form.querySelector('[data-back]');
  const nextBtn = form.querySelector('[data-next]');
  const nextLabel = form.querySelector('[data-next-label]');
  const nextIcon = form.querySelector('[data-next-icon]');
  const privacy = form.querySelector('[data-privacy]');
  const submitError = form.querySelector('[data-submit-error]');
  const success = document.querySelector('[data-success]');

  let current = 0;
  let editing = false; // true when a step was opened from the summary ("Ändern")
  let sending = false;

  const box = (name) => form.querySelector(`[data-field="${name}"]`);
  // The element that carries aria-describedby: the fieldset for radio groups, otherwise the control.
  const describedEl = (b) => (b.matches('fieldset') ? b : b.querySelector('input, select'));
  form.querySelectorAll('[data-field]').forEach((b) => {
    const el = describedEl(b);
    el.dataset.hints = el.getAttribute('aria-describedby') || '';
  });

  function setError(name, message) {
    const b = box(name);
    const err = b.querySelector('.field-error');
    const el = describedEl(b);
    err.textContent = message;
    err.hidden = !message;
    b.classList.toggle('has-error', Boolean(message));
    b.querySelectorAll('input, select').forEach((c) => {
      if (message) c.setAttribute('aria-invalid', 'true');
      else c.removeAttribute('aria-invalid');
    });
    const ids = [message ? err.id : '', el.dataset.hints].filter(Boolean).join(' ');
    if (ids) el.setAttribute('aria-describedby', ids);
    else el.removeAttribute('aria-describedby');
  }

  function validateStep(i) {
    const failed = [];
    STEPS[i].fields.forEach((name) => {
      const message = VALIDATE[name](value(name));
      setError(name, message);
      if (message) failed.push(name);
    });
    return failed;
  }

  function announce(text) {
    status.textContent = '';
    setTimeout(() => { status.textContent = text; }, 50);
  }

  function focusField(name) {
    const b = box(name);
    const el = b.querySelector('input:checked') || b.querySelector('input, select');
    el?.focus();
  }

  function renderRail() {
    rail.replaceChildren(...STEPS.map((s, k) => {
      const state = k < current ? 'done' : k === current ? 'current' : 'todo';
      const li = document.createElement('li');
      li.className = `rail-stop is-${state}`;
      if (state === 'current') li.setAttribute('aria-current', 'step');
      const hit = document.createElement(state === 'done' ? 'button' : 'span');
      hit.className = 'rail-hit';
      const sr = state === 'done' ? ' – erledigt, bearbeiten' : state === 'current' ? ' – aktueller Schritt' : ' – offen';
      hit.innerHTML = `<span class="rail-dot" aria-hidden="true">${state === 'done' ? CHECK : ''}</span><span class="rail-label">${s.label}<span class="sr-only">${sr}</span></span>`;
      if (state === 'done') {
        hit.type = 'button';
        hit.addEventListener('click', () => { editing = false; show(k); });
      }
      li.append(hit);
      return li;
    }));
  }

  function fillSummary() {
    form.querySelectorAll('[data-summary]').forEach((el) => {
      const name = el.dataset.summary;
      const v = value(name);
      let text = LABELS[name] ? LABELS[name][v] || v : v;
      if (name === 'start' && v) {
        text = new Date(`${v}T00:00:00`).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      el.textContent = text || '—';
    });
  }

  function show(i, { focus = true } = {}) {
    current = i;
    panels.forEach((p, k) => { p.hidden = k !== i; });
    const panel = panels[i];
    panel.classList.remove('is-entering');
    void panel.offsetWidth; // restart the entry animation
    panel.classList.add('is-entering');
    renderRail();
    stepNum.textContent = String(i + 1);
    backBtn.hidden = i === 0;
    nextLabel.textContent = i === LAST ? 'Jetzt Angebote erhalten' : editing ? 'Zur Zusammenfassung' : 'Weiter';
    nextIcon.toggleAttribute('hidden', i === LAST); // SVG has no .hidden property
    privacy.hidden = i === 1; // step 2 carries the full privacy statement
    submitError.hidden = true;
    if (i === LAST) fillSummary();
    if (focus) panel.querySelector('.step-title').focus();
  }

  async function send() {
    sending = true;
    nextBtn.setAttribute('aria-busy', 'true');
    nextLabel.textContent = 'Wird gesendet …';
    backBtn.disabled = true;
    submitError.hidden = true;
    const fields = ['unternehmen', 'plz', 'land', 'name', 'telefonnummer', 'emailadresse', 'dsbVorhanden', 'start', 'unternehmensgroesse', 'gdprConsent'];
    const payload = Object.fromEntries(fields.map((name) => [name, value(name)]));
    payload.telefonnummer = payload.telefonnummer.replace(/[\s()/.-]/g, '');
    try {
      const response = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const body = await response.json();
      if (!response.ok || body.success !== true) throw new Error('submission failed');
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch {
      submitError.hidden = false;
    } finally {
      sending = false;
      nextBtn.removeAttribute('aria-busy');
      backBtn.disabled = false;
      nextLabel.textContent = 'Jetzt Angebote erhalten';
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (sending) return;
    const failed = validateStep(current);
    if (failed.length) {
      announce(failed.length === 1 ? 'Bitte prüfen Sie 1 Angabe.' : `Bitte prüfen Sie ${failed.length} Angaben.`);
      focusField(failed[0]);
      return;
    }
    status.textContent = '';
    if (current === LAST) { send(); return; }
    if (editing) { editing = false; show(LAST); return; }
    show(current + 1);
  });

  backBtn.addEventListener('click', () => { editing = false; show(current - 1); });

  form.querySelectorAll('[data-edit]').forEach((btn) => btn.addEventListener('click', () => {
    editing = true;
    show(Number(btn.dataset.edit));
  }));

  // Re-check a field once it shows an error, so the message disappears as soon as it is fixed.
  const recheck = (event) => {
    const b = event.target.closest('[data-field]');
    if (b && b.classList.contains('has-error')) setError(b.dataset.field, VALIDATE[b.dataset.field](value(b.dataset.field)));
  };
  form.addEventListener('input', recheck);
  form.addEventListener('change', recheck);

  form.elements.start.min = todayISO();

  // "Angebote erhalten" links: scroll to the form and put the cursor into the current step.
  document.querySelectorAll('[data-start-form]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('anfrage').scrollIntoView?.({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    const target = success.hidden ? panels[current].querySelector('input, select') : success;
    target?.focus({ preventScroll: true });
  }));

  show(0, { focus: false });
})();

/* Reference band: a second copy of the logo list, hidden from assistive technology, makes the scroll seamless.
   CSS animates the band only when motion is allowed and pauses it on hover. */
(() => {
  'use strict';

  const refs = document.querySelector('[data-refs]');
  if (!refs) return;
  const list = refs.querySelector('.refs-list');

  const copy = list.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  list.after(copy);
  refs.dataset.ready = '';
})();

