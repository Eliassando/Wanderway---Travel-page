import React from 'react';

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <p className="hero__eyebrow">Tailor-made trips since 2012</p>
        <h1>Travel further. Stress less.</h1>
        <p className="hero__lead">
          Hand-crafted itineraries, local experts and 24/7 support — from weekend escapes to
          once-in-a-lifetime adventures.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#inquiry">Start planning</a>
          <a className="button button--ghost" href="#destinations">Browse destinations</a>
        </div>
        <ul className="hero__stats">
          <li><strong>1,200+</strong> trips delivered</li>
          <li><strong>4.8/5</strong> average rating</li>
          <li><strong>40+</strong> countries covered</li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;
