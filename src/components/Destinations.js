import React, { useMemo, useState } from 'react';
import DestinationCard from './DestinationCard';
import { regions, styles, budgetTiers } from '../data/travelData';

const sorters = {
  recommended: (a, b) => b.rating - a.rating,
  'price-asc': (a, b) => a.pricePerPerson - b.pricePerPerson,
  'price-desc': (a, b) => b.pricePerPerson - a.pricePerPerson,
  rating: (a, b) => b.rating - a.rating,
};

function Destinations({ destinations }) {
  const [region, setRegion] = useState('all');
  const [style, setStyle] = useState('all');
  const [budget, setBudget] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const visible = useMemo(() => {
    return destinations
      .filter((d) => region === 'all' || d.region === region)
      .filter((d) => style === 'all' || d.style === style)
      .filter((d) => budget === 'all' || d.budgetTier === budget)
      .slice()
      .sort(sorters[sortBy]);
  }, [destinations, region, style, budget, sortBy]);

  return (
    <section id="destinations" className="section">
      <div className="section__inner">
        <h2>Trending destinations</h2>
        <p className="section__subtitle">
          Hand-picked trips, updated weekly. Filter by region, style or budget.
        </p>

        <form className="filters" aria-label="Filter destinations" onSubmit={(e) => e.preventDefault()}>
          <label className="filters__field">
            <span>Region</span>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="all">All regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>

          <label className="filters__field">
            <span>Travel style</span>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="all">All styles</option>
              {styles.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="filters__field">
            <span>Budget</span>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="all">Any budget</option>
              {budgetTiers.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>

          <label className="filters__field">
            <span>Sort by</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </form>

        <p className="filters__count" role="status">
          {visible.length} {visible.length === 1 ? 'trip' : 'trips'} found
        </p>

        {visible.length > 0 ? (
          <div className="card-grid">
            {visible.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        ) : (
          <p className="filters__empty">
            No trips match those filters yet. Try a different combination or{' '}
            <a href="#inquiry">tell us what you’re looking for</a>.
          </p>
        )}
      </div>
    </section>
  );
}

export default Destinations;
