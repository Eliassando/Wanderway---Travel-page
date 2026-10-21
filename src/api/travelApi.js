const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

async function request(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const error = new Error(body && body.message ? body.message : `Request failed (${res.status})`);
    error.status = res.status;
    error.details = body && body.errors;
    throw error;
  }
  return body;
}

export const getDestinations = () => request('/destinations');
export const getOffers = () => request('/offers');
export const getReviews = () => request('/reviews');
export const submitInquiry = (inquiry) =>
  request('/inquiries', { method: 'POST', body: JSON.stringify(inquiry) });
