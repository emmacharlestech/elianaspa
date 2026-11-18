import { TESTIMONIALS } from '../data/testimonials';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import BookButton from './BookButton';
import { Monogram } from './Logo';
import './Testimonials.css';

/**
 * Shows genuine client reviews from src/data/testimonials.js.
 * Entries marked `placeholder: true` are never shown publicly; until a
 * real review is added, an elegant "coming soon" panel appears instead.
 */
export default function Testimonials() {
  const reviews = TESTIMONIALS.filter((t) => !t.placeholder);

  return (
    <section id="testimonials" className="section section--nude testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          id="testimonials-title"
          align="center"
          eyebrow="Client Stories"
          title={
            <>
              Kind words <em>from our clients</em>
            </>
          }
          intro={reviews.length ? 'What our clients say about their experience at Eliana’s.' : undefined}
        />

        {reviews.length > 0 ? (
          <ul className="testimonials__grid">
            {reviews.map((t, i) => (
              <Reveal as="li" key={t.id} delay={i} className="testimonial">
                <span className="testimonial__mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="testimonial__quote">
                  <p>{t.quote}</p>
                </blockquote>
                <div className="testimonial__meta">
                  <span className="testimonial__avatar" aria-hidden="true">
                    {t.author.charAt(0)}
                  </span>
                  <span>
                    <span className="testimonial__author">{t.author}</span>
                    <span className="testimonial__detail">{t.detail}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="stories-soon">
            <Monogram className="stories-soon__mono" />
            <p className="stories-soon__quote">
              &ldquo;Client stories are on their way.&rdquo;
            </p>
            <p className="stories-soon__text">
              We&rsquo;re gathering words from our clients, shared with their permission, to feature here. Until then,
              the best review is the one you write after your own visit.
            </p>
          </Reveal>
        )}

        <Reveal className="testimonials__cta">
          <p className="serif-italic">Visited us recently? We&rsquo;d love to hear about your experience.</p>
          <BookButton
            variant="dark"
            size="sm"
            message="Hello Eliana's Cosmetics & Aesthetics, I'd like to share feedback about my recent visit:"
          >
            Share your feedback
          </BookButton>
        </Reveal>
      </div>
    </section>
  );
}
