import React from 'react';

function Reviews({ reviews }) {
  return (
    <section id="reviews" className="section">
      <div className="section__inner">
        <h2>Loved by travelers</h2>
        <p className="section__subtitle">
          Rated <strong>4.8/5</strong> from over 1,200 verified trips · 24/7 human support · Free cancellation up to 30 days
        </p>
        <div className="card-grid card-grid--reviews">
          {reviews.map((review) => (
            <figure key={review.id} className="review-card">
              <div className="review-card__stars" aria-label={`${review.rating} out of 5 stars`}>
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <blockquote>{review.text}</blockquote>
              <figcaption>
                <strong>{review.author}</strong> · {review.location}
                <span className="review-card__trip">{review.trip}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ul className="trust-bar">
          <li>✓ No hidden fees</li>
          <li>✓ ATOL-protected bookings</li>
          <li>✓ 24/7 in-trip support</li>
          <li>✓ Flexible payment plans</li>
        </ul>
      </div>
    </section>
  );
}

export default Reviews;
