import { TESTIMONIALS } from '../data/testimonials';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import BookButton from './BookButton';
import './Testimonials.css';

export default function Testimonials() {
  const allPlaceholders = TESTIMONIALS.every((t) => t.placeholder);

  return (
    <section id="testimonials" className="section section--nude testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          id="testimonials-title"
          align="center"
          eyebrow="Client Love"
          title={
            <>
              Kind words <em>from our clients</em>
            </>
          }
          intro={
            allPlaceholders
              ? 'Client reviews are coming soon. The cards below are placeholders and will be replaced with genuine feedback, shared with permission.'
              : 'What our clients say about their experience at Eliana’s.'
          }
        />

        <ul className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              as="li"
              key={t.id}
              delay={i}
              className={`testimonial ${t.placeholder ? 'testimonial--placeholder' : ''}`}
            >
              {t.placeholder && <span className="badge testimonial__badge">Placeholder</span>}
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

        <Reveal className="testimonials__cta">
          <p className="serif-italic">Visited us recently? We&rsquo;d love to hear about your experience.</p>
          <BookButton variant="dark" size="sm">
            Share your feedback
          </BookButton>
        </Reveal>
      </div>
    </section>
  );
}
