import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Offers from './components/Offers';
import Reviews from './components/Reviews';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import {
  destinations as localDestinations,
  offers as localOffers,
  reviews as localReviews,
} from './data/travelData';
import { getDestinations, getOffers, getReviews } from './api/travelApi';

function App() {
  // Local seed data keeps the page usable if the API is unreachable.
  const [destinations, setDestinations] = useState(localDestinations);
  const [offers, setOffers] = useState(localOffers);
  const [reviews, setReviews] = useState(localReviews);

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([getDestinations(), getOffers(), getReviews()]).then(
      ([dest, off, rev]) => {
        if (cancelled) return;
        if (dest.status === 'fulfilled') setDestinations(dest.value);
        if (off.status === 'fulfilled') setOffers(off.value);
        if (rev.status === 'fulfilled') setReviews(rev.value);
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Destinations destinations={destinations} />
        <Offers offers={offers} destinations={destinations} />
        <Reviews reviews={reviews} />
        <InquiryForm destinations={destinations} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
