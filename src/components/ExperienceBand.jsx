import SmartImage from './SmartImage';
import BookButton from './BookButton';
import Reveal from './Reveal';
import { useParallax } from '../hooks/useParallax';
import './ExperienceBand.css';

const EXPECT = [
  {
    title: 'A warm welcome',
    text: 'Arrive to a calm, private space and take a moment to settle in before your treatment.',
  },
  {
    title: 'Personal consultation',
    text: 'We talk through your skin, your goals and your preferences before anything begins.',
  },
  {
    title: 'Your treatment',
    text: 'Relax while your treatment is carried out with care, hygiene and attention to detail.',
  },
  {
    title: 'Aftercare & glow',
    text: 'Leave with simple advice to look after your results and keep your glow going at home.',
  },
];

/** The Beauty Experience: cinematic parallax band + what clients can expect. */
export default function ExperienceBand() {
  const mediaRef = useParallax(0.18);

  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className="experience">
        <div className="experience__media" ref={mediaRef}>
          <SmartImage
            image={{ id: '1560750588-73207b1ef5b8' }}
            alt="Calm spa lounge with plants, soft lighting and a plunge pool"
            widths={[640, 960, 1440, 2000]}
            sizes="100vw"
            className="experience__img"
          />
        </div>
        <div className="experience__veil" aria-hidden="true" />
        <span className="grain" aria-hidden="true" />

        <div className="container experience__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light experience__eyebrow">The Beauty Experience</p>
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
            <a href="#booking" className="btn btn--gold">
              Book Your Experience
            </a>
            <a href="#services" className="btn btn--ghost-light">
              View Treatments
            </a>
          </Reveal>
        </div>
      </div>

      <div className="expect">
        <div className="container">
          <Reveal className="expect__head">
            <p className="eyebrow eyebrow--light">What to expect</p>
            <p className="expect__lede">
              Every visit follows the same quiet rhythm, designed around your comfort.
            </p>
          </Reveal>
          <ol className="expect__list">
            {EXPECT.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i} className="expect__item">
                <span className="expect__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="expect__cta">
            <BookButton variant="ghost-light">Ask us anything on WhatsApp</BookButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
