import { SITE, fullAddress } from '../data/site';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import BookButton from './BookButton';
import { Clock, Instagram, Mail, MapPin, Phone } from './Icons';
import './Contact.css';

const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;
const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=16&output=embed`;

function InfoRow({ icon, label, children }) {
  return (
    <li className="contact-info__row">
      <span className="contact-info__icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <span className="contact-info__label">{label}</span>
        <div className="contact-info__value">{children}</div>
      </div>
    </li>
  );
}

const Pending = ({ children = 'Coming soon' }) => <span className="contact-info__pending">{children}</span>;

export default function Contact() {
  const { phone, email, hours, instagram } = SITE.contact;

  return (
    <section id="contact" className="section section--cream contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow="Location & Contact"
          title={
            <>
              Visit us <em>in Asaba</em>
            </>
          }
          intro="Find us inside Annie Supermarket, by Marble Hill. For appointments and questions, WhatsApp is the quickest way to reach us."
        />

        <div className="contact__grid">
          <Reveal className="contact__aside">
            <address className="contact__address-card">
              <span className="eyebrow">Find us</span>
              <p className="contact__map-name">{SITE.name}</p>
              <p>
                {SITE.address.line1}, {SITE.address.line2}
                <br />
                {SITE.address.city}, {SITE.address.state}, {SITE.address.country}
              </p>
            </address>

            <ul className="contact-info">
              <InfoRow icon={<MapPin />} label="Directions">
                <a className="contact-info__link" href={mapsSearch} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </InfoRow>
              <InfoRow icon={<Phone />} label="Phone">
                {phone ? <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a> : <Pending>Number coming soon</Pending>}
              </InfoRow>
              <InfoRow icon={<Mail />} label="Email">
                {email ? <a href={`mailto:${email}`}>{email}</a> : <Pending>Email coming soon</Pending>}
              </InfoRow>
              <InfoRow icon={<Clock />} label="Opening hours">
                {hours || <Pending>Message us on WhatsApp for today&rsquo;s hours</Pending>}
              </InfoRow>
              <InfoRow icon={<Instagram />} label="Social">
                {instagram ? (
                  <a href={instagram} target="_blank" rel="noopener noreferrer">
                    Follow us on Instagram
                  </a>
                ) : (
                  <Pending>Social links coming soon</Pending>
                )}
              </InfoRow>
            </ul>

            <BookButton block variant="dark">
              Chat with us on WhatsApp
            </BookButton>
          </Reveal>

          <Reveal delay={1} className="contact__map">
            <iframe
              title={`Map showing ${fullAddress()}`}
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <p className="contact__map-note">Map pin is based on an address search and may be approximate.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
