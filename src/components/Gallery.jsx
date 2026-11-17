import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { GALLERY, GALLERY_CATEGORIES } from '../data/gallery';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';
import { Expand } from './Icons';
import './Gallery.css';

const Lightbox = lazy(() => import('./Lightbox'));

export default function Gallery() {
  const [category, setCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const items = useMemo(
    () => (category === 'All' ? GALLERY : GALLERY.filter((g) => g.category === category)),
    [category],
  );

  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section id="gallery" className="section section--dark gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery__head">
          <SectionHeading
            id="gallery-title"
            eyebrow="Gallery"
            title={
              <>
                Moments of <em>calm &amp; radiance</em>
              </>
            }
            intro="A glimpse of the treatments, textures and atmosphere we love. Photography shown is illustrative and will be updated with images from our own studio."
          />
          <div className="filters gallery__filters" role="group" aria-label="Filter gallery">
            {GALLERY_CATEGORIES.map((c) => (
              <button key={c} type="button" className="pill" aria-pressed={category === c} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="gallery__grid" key={category}>
          {items.map((item, i) => (
            <li key={item.id} className="gallery__item" style={{ '--i': i }}>
              <button
                type="button"
                className="gallery__tile"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open image: ${item.alt}`}
              >
                <SmartImage
                  image={item.image}
                  alt=""
                  ratio={item.ratio}
                  widths={[360, 540, 720, 960]}
                  sizes="(max-width: 600px) 46vw, (max-width: 1080px) 31vw, 24vw"
                  className="gallery__img"
                  style={{ aspectRatio: `1 / ${item.ratio}` }}
                />
                <span className="gallery__overlay" aria-hidden="true">
                  <span className="gallery__cat">{item.category}</span>
                  <Expand />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {category === 'Transformations' && (
          <p className="gallery__disclaimer">
            Illustrative images only. Real client results will be shared here with our clients&rsquo; consent.
          </p>
        )}
      </div>

      {openIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox items={items} index={openIndex} onClose={close} onNavigate={setOpenIndex} />
        </Suspense>
      )}
    </section>
  );
}
