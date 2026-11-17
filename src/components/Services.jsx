import { SERVICES } from '../data/services';
import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';
import Reveal from './Reveal';
import BookButton from './BookButton';
import './Services.css';

const STEPS = [
  { title: 'Message us', text: 'Reach us on WhatsApp to ask a question or request an appointment time.' },
  { title: 'Consultation', text: 'We discuss your skin, goals and preferences, and recommend the right treatment.' },
  { title: 'Treatment & aftercare', text: 'Relax while we care for you, then leave with simple advice for home.' },
];

export default function Services() {
  return (
    <>
      <section id="services" className="section section--cream services" aria-labelledby="services-title">
        <div className="container">
          <div className="services__head">
            <SectionHeading
              id="services-title"
              eyebrow="Our Services"
              title={
                <>
                  Treatments designed <em>around you</em>
                </>
              }
              intro="From restorative facials to lash artistry, every service is delivered with care, hygiene and attention to detail. Tap a card for details, then book your visit on WhatsApp."
            />
          </div>

          <div className="services__grid">
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} delay={i % 3}>
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal className="services__note">
            <p>
              Prices vary by treatment and are confirmed after consultation. Message us on WhatsApp for current pricing
              and availability.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark journey" aria-labelledby="journey-title">
        <div className="container journey__grid">
          <SectionHeading
            id="journey-title"
            eyebrow="Your Visit"
            title={
              <>
                Three simple steps <em>to your glow</em>
              </>
            }
          />
          <ol className="journey__steps">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i} className="journey__step">
                <span className="journey__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="journey__cta">
            <BookButton>Start on WhatsApp</BookButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
