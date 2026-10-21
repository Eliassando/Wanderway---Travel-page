import React from 'react';

function DestinationCard({ destination }) {
  const tierLabels = { budget: 'Budget', mid: 'Mid-range', luxury: 'Luxury' };

  return (
    <article className="destination-card">
      <div className="destination-card__media">
        <img src={destination.image} alt={destination.name} loading="lazy" />
        <span className="destination-card__badge">{tierLabels[destination.budgetTier]}</span>
      </div>
      <div className="destination-card__body">
        <div className="destination-card__header">
          <h3>{destination.name}</h3>
          <span className="destination-card__rating" aria-label={`Rated ${destination.rating} out of 5`}>
            ★ {destination.rating}
          </span>
        </div>
        <p className="destination-card__meta">
          {destination.region} · {destination.style} · {destination.days} days
        </p>
        <p className="destination-card__summary">{destination.summary}</p>
        <div className="destination-card__footer">
          <p className="destination-card__price">
            <strong>${destination.pricePerPerson.toLocaleString()}</strong> / person
          </p>
          <a className="destination-card__link" href="#inquiry">
            Plan this trip
          </a>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;
