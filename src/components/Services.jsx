import { SERVICES } from '../data/services';
import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';
import Reveal from './Reveal';
import './Services.css';

export default function Services() {
  return (
    <section id="services" className="section section--cream services" aria-labelledby="services-title">
      <div className="container">
        <div className="services__head">
          <SectionHeading
            id="services-title"
            eyebrow="Signature Treatments"
            title={
              <>
                Treatments designed <em>around you</em>
              </>
            }
            intro="From restorative facials to lash artistry, every treatment is delivered with care, hygiene and attention to detail. Open a card for details, then book your treatment on WhatsApp."
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
  );
}
