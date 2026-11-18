import { useId, useState } from 'react';
import SmartImage from './SmartImage';
import BookButton from './BookButton';
import { Check, Plus } from './Icons';

export default function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  // Only show a price once it has been confirmed in src/data/services.js
  const priceLabel = service.price ?? 'Price on request';

  return (
    <article className={`service-card ${open ? 'is-open' : ''}`} aria-labelledby={`${detailsId}-title`}>
      <div className="service-card__media">
        <SmartImage
          image={service.image}
          alt={service.image.alt}
          ratio={1.2}
          widths={[400, 600, 800, 1000]}
          sizes="(max-width: 640px) 92vw, (max-width: 1080px) 46vw, 30vw"
        />
        <span className="service-card__num" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="service-card__body">
        <p className="service-card__tagline">{service.tagline}</p>
        <h3 id={`${detailsId}-title`} className="service-card__title">
          {service.title}
        </h3>
        <p className="service-card__desc">{service.description}</p>

        <div id={detailsId} className="service-card__details" hidden={!open}>
          <ul>
            {service.highlights.map((h) => (
              <li key={h}>
                <Check />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card__footer">
          <span className="service-card__price">{priceLabel}</span>
          <button
            type="button"
            className="service-card__toggle"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Less' : 'Details'}
            <Plus />
          </button>
        </div>

        <BookButton variant="outline" block label={`for ${service.title}`} service={service.title}>
          Book this treatment
        </BookButton>
      </div>
    </article>
  );
}
