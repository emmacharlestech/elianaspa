import { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../data/services';
import { canPrefill, copyText, whatsappHref } from '../lib/whatsapp';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { Check, Info, WhatsApp } from './Icons';
import './Booking.css';

const TREATMENTS = [...SERVICES.map((s) => s.title), 'Products', 'Not sure yet, please advise me'];
const TIMES = ['Morning', 'Afternoon', 'Evening'];
const STEPS = [
  { title: 'Choose your treatment', text: 'Select a treatment and, if you like, a preferred day and time.' },
  { title: 'Send on WhatsApp', text: 'Your appointment request opens in WhatsApp, ready to send to us.' },
  { title: 'We confirm with you', text: 'We reply personally to confirm availability. Your booking is set once we confirm.' },
];

const INITIAL = { treatment: '', date: '', time: '', name: '', notes: '' };

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const formatDate = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export function validate(v) {
  const errors = {};
  if (!v.treatment) errors.treatment = 'Please choose a treatment.';
  if (!v.name.trim()) errors.name = 'Please enter your name.';
  else if (v.name.trim().length < 2) errors.name = 'Your name looks too short.';
  if (v.date && v.date < todayISO()) errors.date = 'Please choose today or a future date.';
  if (v.notes.length > 600) errors.notes = 'Please keep notes under 600 characters.';
  return errors;
}

export function buildMessage(v) {
  return [
    `Hello Eliana's Cosmetics & Aesthetics,`,
    `I would like to book an appointment.`,
    '',
    `Treatment: ${v.treatment}`,
    v.date ? `Preferred date: ${formatDate(v.date)}` : null,
    v.time ? `Preferred time: ${v.time}` : null,
    `Name: ${v.name.trim()}`,
    v.notes.trim() ? `\nNotes: ${v.notes.trim()}` : null,
    '',
    'Please let me know if this is available. Thank you.',
  ]
    .filter((l) => l !== null)
    .join('\n');
}

export default function Booking() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  // Set after mount: the page is pre-rendered at build time, so "today"
  // must come from the visitor's browser, not the build server.
  const [minDate, setMinDate] = useState(undefined);
  useEffect(() => setMinDate(todayISO()), []);

  const set = (field, value) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    const text = buildMessage(values);
    if (canPrefill) {
      window.open(whatsappHref(text), '_blank', 'noopener,noreferrer');
      setResult({ prefilled: true, text });
      return;
    }
    // Start the copy while the page has focus, then open WhatsApp inside the click.
    const copying = copyText(text);
    window.open(whatsappHref(), '_blank', 'noopener,noreferrer');
    setResult({ prefilled: false, copied: await copying, text });
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    setResult(null);
  };

  const err = (name) =>
    errors[name] ? (
      <span id={`b-${name}-err`} className="field__error" role="alert">
        {errors[name]}
      </span>
    ) : null;

  const aria = (name) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `b-${name}-err` : undefined,
  });

  return (
    <section id="booking" className="section booking" aria-labelledby="booking-title">
      <span className="grain" aria-hidden="true" />
      <div className="container booking__grid">
        <div className="booking__intro">
          <SectionHeading
            id="booking-title"
            eyebrow="Book an Appointment"
            title={
              <>
                Reserve your <em>moment of glow</em>
              </>
            }
            intro="Choose your treatment and preferred time, and we’ll continue the conversation personally on WhatsApp."
          />
          <ol className="booking__steps">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i} className="booking__step">
                <span className="booking__step-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={1} className="booking__panel">
          {result ? (
            <div className="booking__done" role="status" aria-live="polite">
              <span className="booking__done-icon" aria-hidden="true">
                <Check />
              </span>
              <h3>Almost there, {values.name.trim().split(' ')[0]}.</h3>
              {result.prefilled ? (
                <p>
                  WhatsApp has opened with your request. Press <strong>send</strong> and we’ll reply to confirm your
                  appointment.
                </p>
              ) : result.copied ? (
                <p>
                  Your request has been <strong>copied</strong> and WhatsApp has opened. <strong>Paste</strong> it into
                  the chat and press send. We’ll reply to confirm your appointment.
                </p>
              ) : (
                <p>Copy the request below, then paste it into our WhatsApp chat and press send.</p>
              )}
              <label className="visually-hidden" htmlFor="booking-copy">
                Your appointment request
              </label>
              <textarea
                id="booking-copy"
                className="booking__copy"
                readOnly
                value={result.text}
                rows={8}
                onFocus={(e) => e.target.select()}
              />
              <div className="booking__done-actions">
                <a
                  className="btn btn--gold"
                  href={whatsappHref(result.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsApp />
                  <span>Open WhatsApp</span>
                </a>
                <button type="button" className="link-underline" onClick={reset}>
                  Start a new request
                </button>
              </div>
              <p className="booking__fine">Your appointment is confirmed only once we reply on WhatsApp.</p>
            </div>
          ) : (
            <form ref={formRef} className="booking__form" noValidate onSubmit={onSubmit} aria-labelledby="booking-form-title">
              <h3 id="booking-form-title" className="booking__form-title">
                Your appointment request
              </h3>

              <fieldset className="field field--full booking__fieldset" aria-describedby={errors.treatment ? 'b-treatment-err' : undefined}>
                <legend>Treatment *</legend>
                <div className="choice-grid">
                  {TREATMENTS.map((t, i) => (
                    <label key={t} className={`choice ${values.treatment === t ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="treatment"
                        value={t}
                        checked={values.treatment === t}
                        onChange={() => set('treatment', t)}
                        aria-invalid={errors.treatment && i === 0 ? true : undefined}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
                {err('treatment')}
              </fieldset>

              <div className="booking__row">
                <div className="field">
                  <label htmlFor="b-date">
                    Preferred date <span className="field__opt">(optional)</span>
                  </label>
                  <input
                    id="b-date"
                    name="date"
                    type="date"
                    min={minDate}
                    value={values.date}
                    onChange={(e) => set('date', e.target.value)}
                    {...aria('date')}
                  />
                  {err('date')}
                </div>

                <fieldset className="field booking__fieldset">
                  <legend>
                    Preferred time <span className="field__opt">(optional)</span>
                  </legend>
                  <div className="choice-row">
                    {TIMES.map((t) => (
                      <label key={t} className={`choice choice--compact ${values.time === t ? 'is-selected' : ''}`}>
                        <input
                          type="radio"
                          name="time"
                          value={t}
                          checked={values.time === t}
                          onChange={() => set('time', t)}
                        />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="field">
                <label htmlFor="b-name">Your name *</label>
                <input
                  id="b-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  value={values.name}
                  onChange={(e) => set('name', e.target.value)}
                  {...aria('name')}
                />
                {err('name')}
              </div>

              <div className="field">
                <label htmlFor="b-notes">
                  Notes <span className="field__opt">(optional)</span>
                </label>
                <textarea
                  id="b-notes"
                  name="notes"
                  rows={3}
                  maxLength={600}
                  placeholder="Anything we should know, e.g. skin concerns or a first visit"
                  value={values.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  {...aria('notes')}
                />
                {err('notes')}
              </div>

              <button type="submit" className="btn btn--gold btn--block booking__submit">
                <WhatsApp />
                <span>Book Now on WhatsApp</span>
              </button>

              <p className="booking__privacy">
                <Info />
                <span>
                  Nothing is stored on this website. Your request is sent through WhatsApp, and your appointment is
                  confirmed once we reply.
                </span>
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
