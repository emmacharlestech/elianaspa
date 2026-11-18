import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import ExperienceBand from './components/ExperienceBand';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import BookingNotice from './components/BookingNotice';
import ErrorBoundary from './components/ErrorBoundary';
import Preloader from './components/Preloader';

const SECTIONS = [Hero, About, Manifesto, Services, ExperienceBand, Products, Gallery, Testimonials, Booking, Contact];

export default function App() {
  return (
    <>
      <ErrorBoundary silent>
        <Preloader />
      </ErrorBoundary>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ErrorBoundary silent>
        <Navbar />
      </ErrorBoundary>
      <main id="main" tabIndex={-1}>
        {SECTIONS.map((Section, i) => (
          <ErrorBoundary key={i}>
            <Section />
          </ErrorBoundary>
        ))}
      </main>
      <Footer />
      <WhatsAppFloat />
      <BookingNotice />
    </>
  );
}
