const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { destinations, offers, reviews } = require('./data');
const { validateInquiry } = require('./validation');

/*
 * REST contract (consumed by src/api/travelApi.js in the React app):
 *   GET  /api/destinations -> 200 [{ id, name, region, style, budgetTier, pricePerPerson, rating, reviewsCount, days, summary, image }]
 *   GET  /api/offers       -> 200 [{ id, title, destinationId, discountPercent, description, expiresOn }]
 *   GET  /api/reviews      -> 200 [{ id, author, location, rating, trip, text }]
 *   POST /api/inquiries    -> 201 { id, status: "queued", receivedAt }
 *                          -> 400 { message, errors: { <field>: <msg> } }
 */
function createApp() {
  const app = express();
  app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
  app.use(express.json({ limit: '10kb' }));

  // In-memory store for MVP; swap for a database when inquiry volume justifies it.
  const inquiries = [];

  app.get('/api/destinations', (req, res) => res.json(destinations));
  app.get('/api/offers', (req, res) => res.json(offers));
  app.get('/api/reviews', (req, res) => res.json(reviews));

  app.post('/api/inquiries', (req, res) => {
    const { errors, value } = validateInquiry(req.body);
    if (errors) {
      return res.status(400).json({ message: 'Inquiry validation failed.', errors });
    }
    const record = {
      id: crypto.randomUUID(),
      ...value,
      status: 'queued',
      receivedAt: new Date().toISOString(),
    };
    inquiries.push(record);
    return res.status(201).json({ id: record.id, status: record.status, receivedAt: record.receivedAt });
  });

  app.use((req, res) => res.status(404).json({ message: 'Not found.' }));

  // Malformed JSON and unexpected failures return structured errors, not stack traces.
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed' || err.type === 'entity.too.large') {
      return res.status(400).json({ message: 'Invalid request body.' });
    }
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  });

  return app;
}

module.exports = { createApp };
