import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ErrorBoundary from './components/ErrorBoundary';

const SECTIONS = [Hero, About, Services, Products, Gallery, Testimonials, Contact];

export default function App() {
  return (
    <>
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
    </>
  );
}
