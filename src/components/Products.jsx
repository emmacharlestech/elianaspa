import { useMemo, useState } from 'react';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';
import BookButton from './BookButton';
import Reveal from './Reveal';
import { Info } from './Icons';
import './Products.css';

export default function Products() {
  const [category, setCategory] = useState('All');
  const items = useMemo(
    () => (category === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category],
  );
  const hasSamples = PRODUCTS.some((p) => p.sample);

  return (
    <section id="products" className="section products" aria-labelledby="products-title">
      <div className="container">
        <div className="products__head">
          <SectionHeading
            id="products-title"
            eyebrow="The Boutique"
            title={
              <>
                Cosmetics &amp; skincare, <em>carefully chosen</em>
              </>
            }
            intro="Continue your glow at home with skincare, body care and beauty essentials. Ask us on WhatsApp about availability and which products suit your skin."
          />
        </div>

        {hasSamples && (
          <Reveal className="notice products__notice" role="note">
            <Info />
            <p>
              <strong>Sample catalogue.</strong> The items below are illustrative placeholders, not confirmed stock.
              Our full product range is coming soon. Message us to ask what is currently available.
            </p>
          </Reveal>
        )}

        <div className="filters products__filters" role="group" aria-label="Filter products by category">
          {PRODUCT_CATEGORIES.map((c) => (
            <button key={c} type="button" className="pill" aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite">
          Showing {items.length} {items.length === 1 ? 'product' : 'products'}
          {category !== 'All' ? ` in ${category}` : ''}.
        </p>

        <ul className="products__grid" key={category}>
          {items.map((p, i) => (
            <li key={p.id} className="product-card" style={{ '--i': i }}>
              <div className="product-card__media">
                <SmartImage
                  image={p.image}
                  alt={p.image.alt}
                  ratio={1.15}
                  widths={[320, 480, 640, 800]}
                  sizes="(max-width: 600px) 46vw, (max-width: 1080px) 31vw, 23vw"
                />
                {p.sample && <span className="badge product-card__badge">Sample</span>}
              </div>
              <div className="product-card__body">
                <p className="product-card__cat">{p.category}</p>
                <h3 className="product-card__name">{p.name}</h3>
                <p className="product-card__desc">{p.description}</p>
                <p className="product-card__price">{p.price ?? 'Price on request'}</p>
                <BookButton variant="outline" size="sm" block label={`about ${p.name}`}>
                  Enquire
                </BookButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
