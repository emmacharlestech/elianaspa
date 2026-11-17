import { useEffect, useRef } from 'react';
import SmartImage from './SmartImage';
import { unsplashUrl } from '../lib/images';
import { ChevronLeft, ChevronRight, Close } from './Icons';
import './Lightbox.css';

/** Accessible image lightbox with keyboard, button and swipe navigation. */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const item = items[index];
  const count = items.length;

  const prev = () => onNavigate((index - 1 + count) % count);
  const next = () => onNavigate((index + 1) % count);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    document.body.classList.add('is-locked');
    closeRef.current?.focus();
    return () => {
      document.body.classList.remove('is-locked');
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onNavigate((index - 1 + count) % count);
      else if (e.key === 'ArrowRight') onNavigate((index + 1) % count);
      else if (e.key === 'Tab' && dialogRef.current) {
        // Keep keyboard focus inside the dialog.
        const nodes = dialogRef.current.querySelectorAll('button');
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, count, onClose, onNavigate]);

  // Preload neighbours for instant navigation.
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      const n = items[(i + count) % count];
      if (n?.image?.id) {
        const img = new Image();
        img.src = unsplashUrl(n.image.id, { w: 1200 });
      }
    });
  }, [index, items, count]);

  if (!item) return null;

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${count}: ${item.alt}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        touchX.current = null;
      }}
    >
      <div className="lightbox__top">
        <span className="lightbox__count">
          {String(index + 1).padStart(2, '0')} <span>/ {String(count).padStart(2, '0')}</span>
        </span>
        <button ref={closeRef} type="button" className="lightbox__btn" onClick={onClose} aria-label="Close gallery">
          <Close />
        </button>
      </div>

      <figure className="lightbox__figure" key={item.id}>
        <SmartImage
          image={item.image}
          alt={item.alt}
          widths={[800, 1200, 1600, 2000]}
          sizes="90vw"
          priority
          className="lightbox__img"
        />
        <figcaption className="lightbox__caption">
          <span className="lightbox__cat">{item.category}</span>
          {item.alt}
        </figcaption>
      </figure>

      {count > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous image">
            <ChevronLeft />
          </button>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next image">
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
