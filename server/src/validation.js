const { destinations } = require('./data');

const MAX_LENGTHS = { name: 120, email: 254, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Strip control chars and angle brackets to neutralize markup injection in stored leads.
function sanitizeText(value) {
  return String(value)
    .replace(/[<>]/g, '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim();
}

function validateInquiry(body) {
  const errors = {};

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { errors: { _global: 'Request body must be a JSON object.' }, value: null };
  }

  const name = typeof body.name === 'string' ? sanitizeText(body.name) : '';
  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > MAX_LENGTHS.name) errors.name = `Name must be under ${MAX_LENGTHS.name} characters.`;

  const email = typeof body.email === 'string' ? sanitizeText(body.email) : '';
  if (!EMAIL_RE.test(email) || email.length > MAX_LENGTHS.email) {
    errors.email = 'Please enter a valid email address.';
  }

  const destination = typeof body.destination === 'string' ? sanitizeText(body.destination) : '';
  const validDestination = destination === 'other' || destinations.some((d) => d.id === destination);
  if (!validDestination) errors.destination = 'Please choose a destination.';

  const startDate = typeof body.startDate === 'string' ? body.startDate : '';
  if (!DATE_RE.test(startDate) || Number.isNaN(Date.parse(startDate))) {
    errors.startDate = 'Please pick a valid start date (YYYY-MM-DD).';
  }

  const endDate = typeof body.endDate === 'string' ? body.endDate : '';
  if (!DATE_RE.test(endDate) || Number.isNaN(Date.parse(endDate))) {
    errors.endDate = 'Please pick a valid end date (YYYY-MM-DD).';
  } else if (!errors.startDate && endDate < startDate) {
    errors.endDate = 'End date must be after the start date.';
  }

  const travelers = Number(body.travelers);
  if (!Number.isInteger(travelers) || travelers < 1 || travelers > 20) {
    errors.travelers = 'Travelers must be between 1 and 20.';
  }

  const message = typeof body.message === 'string' ? sanitizeText(body.message).slice(0, MAX_LENGTHS.message) : '';

  if (Object.keys(errors).length > 0) {
    return { errors, value: null };
  }

  return {
    errors: null,
    value: { name, email, destination, startDate, endDate, travelers, message },
  };
}

module.exports = { validateInquiry, sanitizeText };
