import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import Products from './components/Products';
import Gallery from './components/Gallery';
import ExperienceBand from './components/ExperienceBand';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ErrorBoundary from './components/ErrorBoundary';
import Preloader, { shouldPlayIntro, markIntroDone } from './components/Preloader';

const SECTIONS = [Hero, About, Manifesto, Services, Products, Gallery, ExperienceBand, Testimonials, Contact];

export default function App() {
  const [playIntro] = useState(shouldPlayIntro);

  useEffect(() => {
    if (!playIntro) markIntroDone();
  }, [playIntro]);

  return (
    <>
      {playIntro && (
        <ErrorBoundary silent>
          <Preloader />
        </ErrorBoundary>
      )}
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
