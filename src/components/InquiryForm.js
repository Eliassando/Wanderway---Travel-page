import React, { useState } from 'react';
import { submitInquiry } from '../api/travelApi';

const initialForm = {
  name: '',
  email: '',
  destination: '',
  startDate: '',
  endDate: '',
  travelers: '2',
  message: '',
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.';
  if (!form.destination) errors.destination = 'Please choose a destination.';
  if (!form.startDate) errors.startDate = 'Please pick a start date.';
  if (!form.endDate) errors.endDate = 'Please pick an end date.';
  if (form.startDate && form.endDate && form.endDate < form.startDate) {
    errors.endDate = 'End date must be after the start date.';
  }
  const travelers = Number(form.travelers);
  if (!Number.isInteger(travelers) || travelers < 1 || travelers > 20) {
    errors.travelers = 'Travelers must be between 1 and 20.';
  }
  return errors;
}

function InquiryForm({ destinations }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const setField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      return;
    }

    setStatus('submitting');
    try {
      await submitInquiry({ ...form, travelers: Number(form.travelers) });
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      if (err.details) {
        setErrors(err.details);
      }
      setStatus('error');
    }
  };

  const fieldError = (field, id) =>
    errors[field] ? (
      <span className="form__error" id={id} role="alert">
        {errors[field]}
      </span>
    ) : null;

  return (
    <section id="inquiry" className="section section--dark">
      <div className="section__inner section__inner--narrow">
        <h2>Plan your trip</h2>
        <p className="section__subtitle">
          Tell us where you want to go and a travel specialist will reply within 24 hours.
        </p>

        {status === 'success' && (
          <p className="form__banner form__banner--success" role="status">
            Thanks! Your inquiry is in the queue — we’ll be in touch within 24 hours.
          </p>
        )}
        {status === 'error' && (
          <p className="form__banner form__banner--error" role="alert">
            We couldn’t send your inquiry right now. Please check the highlighted fields or try again shortly.
          </p>
        )}

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__row">
            <div className="form__field">
              <label htmlFor="inq-name">Full name *</label>
              <input
                id="inq-name"
                type="text"
                value={form.name}
                onChange={setField('name')}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'inq-name-error' : undefined}
                autoComplete="name"
              />
              {fieldError('name', 'inq-name-error')}
            </div>
            <div className="form__field">
              <label htmlFor="inq-email">Email *</label>
              <input
                id="inq-email"
                type="email"
                value={form.email}
                onChange={setField('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'inq-email-error' : undefined}
                autoComplete="email"
              />
              {fieldError('email', 'inq-email-error')}
            </div>
          </div>

          <div className="form__row">
            <div className="form__field">
              <label htmlFor="inq-destination">Destination *</label>
              <select
                id="inq-destination"
                value={form.destination}
                onChange={setField('destination')}
                aria-invalid={Boolean(errors.destination)}
                aria-describedby={errors.destination ? 'inq-destination-error' : undefined}
              >
                <option value="">Choose a destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
                <option value="other">Somewhere else…</option>
              </select>
              {fieldError('destination', 'inq-destination-error')}
            </div>
            <div className="form__field">
              <label htmlFor="inq-travelers">Travelers *</label>
              <input
                id="inq-travelers"
                type="number"
                min="1"
                max="20"
                value={form.travelers}
                onChange={setField('travelers')}
                aria-invalid={Boolean(errors.travelers)}
                aria-describedby={errors.travelers ? 'inq-travelers-error' : undefined}
              />
              {fieldError('travelers', 'inq-travelers-error')}
            </div>
          </div>

          <div className="form__row">
            <div className="form__field">
              <label htmlFor="inq-start">Start date *</label>
              <input
                id="inq-start"
                type="date"
                value={form.startDate}
                onChange={setField('startDate')}
                aria-invalid={Boolean(errors.startDate)}
                aria-describedby={errors.startDate ? 'inq-start-error' : undefined}
              />
              {fieldError('startDate', 'inq-start-error')}
            </div>
            <div className="form__field">
              <label htmlFor="inq-end">End date *</label>
              <input
                id="inq-end"
                type="date"
                value={form.endDate}
                onChange={setField('endDate')}
                aria-invalid={Boolean(errors.endDate)}
                aria-describedby={errors.endDate ? 'inq-end-error' : undefined}
              />
              {fieldError('endDate', 'inq-end-error')}
            </div>
          </div>

          <div className="form__field">
            <label htmlFor="inq-message">Anything else? (optional)</label>
            <textarea
              id="inq-message"
              rows="4"
              value={form.message}
              onChange={setField('message')}
              placeholder="Honeymoon, food tour, traveling with kids…"
            />
          </div>

          <button className="button button--primary" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default InquiryForm;
