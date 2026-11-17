import { useRef, useState } from 'react';
import { SITE } from '../data/site';
import { SERVICES } from '../data/services';
import { Check, Info, WhatsApp } from './Icons';

const INITIAL = { name: '', phone: '', email: '', interest: '', message: '' };

const NG_PHONE = /^(?:\+?234|0)[789][01]\d{8}$/;
const INTL_PHONE = /^\+\d{10,15}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const phone = values.phone.replace(/[\s()-]/g, '');
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Your name looks too short.';

  if (!phone) errors.phone = 'Please enter a phone number so we can reach you.';
  else if (!NG_PHONE.test(phone) && !INTL_PHONE.test(phone))
    errors.phone = 'Enter a valid phone number, e.g. 0803 123 4567 or +234 803 123 4567.';

  if (email && !EMAIL.test(email)) errors.email = 'Please enter a valid email address, or leave it blank.';

  if (!values.interest) errors.interest = 'Please choose what you are enquiring about.';

  if (!message) errors.message = 'Please add a short message.';
  else if (message.length < 10) errors.message = 'Please add a little more detail (at least 10 characters).';
  else if (message.length > 1000) errors.message = 'Please keep your message under 1,000 characters.';

  return errors;
}

function buildMessage(v) {
  return [
    `Hello Eliana's Cosmetics & Aesthetics,`,
    '',
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    v.email.trim() ? `Email: ${v.email.trim()}` : null,
    `Enquiry: ${v.interest}`,
    '',
    v.message.trim(),
  ]
    .filter((line) => line !== null)
    .join('\n');
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy copy */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function EnquiryForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [result, setResult] = useState(null); // { copied, text }
  const formRef = useRef(null);

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, phone: true, email: true, interest: true, message: true });
    if (Object.keys(found).length) {
      const first = formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }
    const text = buildMessage(values);
    // Start the copy while this page still has focus, then open WhatsApp
    // synchronously inside the click so pop-up blockers allow it.
    const copying = copyText(text);
    window.open(SITE.whatsappUrl, '_blank', 'noopener,noreferrer');
    setResult({ copied: await copying, text });
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setTouched({});
    setResult(null);
  };

  if (result) {
    return (
      <div className="enquiry enquiry--done" role="status" aria-live="polite">
        <span className="enquiry__done-icon" aria-hidden="true">
          <Check />
        </span>
        <h3>Almost there, {values.name.trim().split(' ')[0]}.</h3>
        {result.copied ? (
          <p>
            Your message has been <strong>copied</strong>. WhatsApp should have opened in a new tab. Simply{' '}
            <strong>paste</strong> it into the chat and press send.
          </p>
        ) : (
          <p>Copy the message below, then paste it into our WhatsApp chat and press send.</p>
        )}
        <label className="visually-hidden" htmlFor="enquiry-copy">
          Your enquiry message
        </label>
        <textarea id="enquiry-copy" className="enquiry__copy" readOnly value={result.text} rows={7} onFocus={(e) => e.target.select()} />
        <div className="enquiry__done-actions">
          <a className="btn btn--gold" href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsApp />
            <span>Open WhatsApp</span>
          </a>
          <button type="button" className="link-underline" onClick={reset}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const field = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    onBlur: blur(name),
    'aria-invalid': touched[name] && errors[name] ? true : undefined,
    'aria-describedby': touched[name] && errors[name] ? `f-${name}-err` : undefined,
  });

  const err = (name) =>
    touched[name] && errors[name] ? (
      <span id={`f-${name}-err`} className="field__error" role="alert">
        {errors[name]}
      </span>
    ) : null;

  return (
    <form ref={formRef} className="enquiry" noValidate onSubmit={onSubmit} aria-labelledby="enquiry-title">
      <h3 id="enquiry-title" className="enquiry__title">
        Send an enquiry
      </h3>
      <p className="enquiry__intro">Tell us what you&rsquo;re looking for and we&rsquo;ll get back to you on WhatsApp.</p>

      <div className="enquiry__grid">
        <div className="field">
          <label htmlFor="f-name">Full name *</label>
          <input type="text" autoComplete="name" maxLength={80} {...field('name')} />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone / WhatsApp *</label>
          <input type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="0803 123 4567" {...field('phone')} />
          {err('phone')}
        </div>
        <div className="field">
          <label htmlFor="f-email">
            Email <span className="field__opt">(optional)</span>
          </label>
          <input type="email" autoComplete="email" maxLength={120} {...field('email')} />
          {err('email')}
        </div>
        <div className="field">
          <label htmlFor="f-interest">I&rsquo;m enquiring about *</label>
          <div className="field__select">
            <select {...field('interest')}>
              <option value="" disabled>
                Choose an option
              </option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Products">Products</option>
              <option value="General enquiry">General enquiry</option>
            </select>
          </div>
          {err('interest')}
        </div>
        <div className="field field--full">
          <label htmlFor="f-message">Message *</label>
          <textarea rows={5} maxLength={1000} placeholder="Preferred day or time, questions about a treatment…" {...field('message')} />
          {err('message')}
        </div>
      </div>

      <button type="submit" className="btn btn--dark btn--block enquiry__submit">
        <WhatsApp />
        <span>Continue on WhatsApp</span>
      </button>

      <p className="enquiry__privacy">
        <Info />
        <span>
          This form does not store or send your details online. When you continue, your message is prepared and
          handed to WhatsApp so you can send it to us directly.
        </span>
      </p>
    </form>
  );
}
