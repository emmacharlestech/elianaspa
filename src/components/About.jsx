import SmartImage from './SmartImage';
import Reveal from './Reveal';
import BookButton from './BookButton';
import { Monogram } from './Logo';
import './About.css';

const PILLARS = [
  {
    title: 'Personal Consultation',
    text: 'Every visit begins with listening to your skin, your goals and how you want to feel.',
  },
  {
    title: 'Thoughtful Treatments',
    text: 'Facials, body treatments and lash artistry, tailored to you and never one-size-fits-all.',
  },
  {
    title: 'Curated Cosmetics',
    text: 'Skincare and beauty products selected to continue your glow at home.',
  },
];

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__visual">
          <div className="about__frame" aria-hidden="true" />
          <SmartImage
            image={{ id: '1512290923902-8a9f81dc236c' }}
            alt="Therapist gently massaging a client's face during a facial treatment"
            ratio={1.28}
            widths={[480, 720, 960, 1280]}
            sizes="(max-width: 860px) 90vw, 42vw"
            className="about__img-main"
          />
          <SmartImage
            image={{ id: '1620733723572-11c53f73a416' }}
            alt="Candles, reed diffuser and soft towels in a calm treatment room"
            ratio={1.15}
            widths={[320, 480, 640]}
            sizes="(max-width: 860px) 45vw, 20vw"
            className="about__img-accent"
          />
          <div className="about__seal" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="about__seal-text">
              <defs>
                <path id="seal-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#seal-circle">Beauty · Skincare · Wellbeing · Asaba ·</textPath>
              </text>
            </svg>
            <Monogram className="about__seal-mono" />
          </div>
        </Reveal>

        <div className="about__content">
          <Reveal>
            <p className="eyebrow">About Eliana&rsquo;s</p>
            <h2 id="about-title" className="about__title">
              A sanctuary for skin, body <em>&amp; self.</em>
            </h2>
          </Reveal>

          <Reveal delay={1} className="about__copy">
            <p className="about__lead">
              Inside Annie Supermarket, by Marble Hill in Asaba, Eliana&rsquo;s Cosmetics &amp; Aesthetics brings
              skincare, body treatments and beauty services together under one elegant roof.
            </p>
            <p>
              We believe great results start with understanding. We take time to learn about your skin and what you
              hope to achieve, then recommend the treatments and products that suit you best.
            </p>
            <p>
              Whether you are coming in for a restorative facial, preparing for a special occasion with fresh lash
              extensions, or looking for the right products for your routine at home, our aim is simple: to help you
              look radiant and feel wonderfully cared for.
            </p>
          </Reveal>

          <ul className="about__pillars">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i + 1} className="about__pillar">
                <span className="about__pillar-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={2} className="about__actions">
            <BookButton variant="dark">Book a Consultation</BookButton>
            <a href="#services" className="link-underline">
              View services
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
