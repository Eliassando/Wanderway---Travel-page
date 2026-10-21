import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <p className="footer__brand"><span aria-hidden="true">✈</span> Wanderway</p>
          <p className="footer__tagline">Tailor-made travel, done properly.</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <a href="#destinations">Destinations</a>
          <a href="#offers">Offers</a>
          <a href="#reviews">Reviews</a>
          <a href="#inquiry">Plan my trip</a>
        </nav>
        <p className="footer__contact">
          hello@wanderway.example · +1 (555) 010-2030
        </p>
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} Wanderway Travel. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
