import SmartImage from './SmartImage';
import BookButton from './BookButton';
import Reveal from './Reveal';
import { useParallax } from '../hooks/useParallax';
import './ExperienceBand.css';

/** Full-bleed cinematic image band with parallax and an invitation to book. */
export default function ExperienceBand() {
  const mediaRef = useParallax(0.18);

  return (
    <section className="experience" aria-labelledby="experience-title">
      <div className="experience__media" ref={mediaRef}>
        <SmartImage
          image={{ id: '1560750588-73207b1ef5b8' }}
          alt=""
          widths={[640, 960, 1440, 2000]}
          sizes="100vw"
          className="experience__img"
        />
      </div>
      <div className="experience__veil" aria-hidden="true" />
      <span className="grain" aria-hidden="true" />

      <div className="container experience__inner">
        <Reveal>
          <p className="eyebrow eyebrow--light experience__eyebrow">The Eliana&rsquo;s Experience</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 id="experience-title" className="experience__title">
            An hour that belongs <em>only to you.</em>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="experience__text">
            Step away from the noise of the day. Unwind in a calm, private space while we take care of the rest.
          </p>
        </Reveal>
        <Reveal delay={3} className="experience__actions">
          <BookButton>Book Your Visit</BookButton>
          <a href="#services" className="btn btn--ghost-light">
            View Treatments
          </a>
        </Reveal>
      </div>
    </section>
  );
}
