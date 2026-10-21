import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#top" className="navbar__brand" onClick={closeMenu}>
          <span aria-hidden="true">✈</span> Wanderway
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>

        <nav
          id="primary-navigation"
          className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}
          aria-label="Primary"
        >
          <a href="#destinations" onClick={closeMenu}>Destinations</a>
          <a href="#offers" onClick={closeMenu}>Offers</a>
          <a href="#reviews" onClick={closeMenu}>Reviews</a>
          <a href="#inquiry" className="navbar__cta" onClick={closeMenu}>
            Plan my trip
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
