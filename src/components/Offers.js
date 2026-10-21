import React from 'react';

function Offers({ offers, destinations }) {
  const destinationName = (id) => {
    const match = destinations.find((d) => d.id === id);
    return match ? match.name : '';
  };

  return (
    <section id="offers" className="section section--tinted">
      <div className="section__inner">
        <h2>Limited-time offers</h2>
        <p className="section__subtitle">Seasonal deals with real savings — no hidden fees, ever.</p>
        <div className="card-grid card-grid--offers">
          {offers.map((offer) => (
            <article key={offer.id} className="offer-card">
              <span className="offer-card__discount">-{offer.discountPercent}%</span>
              <h3>{offer.title}</h3>
              <p className="offer-card__destination">{destinationName(offer.destinationId)}</p>
              <p>{offer.description}</p>
              <p className="offer-card__expiry">
                Book by {new Date(offer.expiresOn).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <a className="button button--secondary" href="#inquiry">Claim this offer</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Offers;
