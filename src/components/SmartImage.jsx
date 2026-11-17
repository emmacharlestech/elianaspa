import { useEffect, useRef, useState } from 'react';
import { buildSources } from '../lib/images';
import { Monogram } from './Logo';
import './SmartImage.css';

/**
 * Responsive, lazy-loaded image with a soft fade-in and a graceful
 * branded fallback if the image fails to load.
 */
export default function SmartImage({
  image,
  alt = '',
  ratio,
  widths,
  sizes = '100vw',
  priority = false,
  className = '',
  imgClassName = '',
  style,
}) {
  const [status, setStatus] = useState('loading');
  const imgRef = useRef(null);
  const { src, srcSet } = buildSources(image, { widths, ratio });

  // Images served from cache can finish before React attaches onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setStatus('loaded');
  }, [src]);

  if (!src || status === 'error') {
    return (
      <div
        className={`smart-img smart-img--fallback ${className}`}
        style={style}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        <Monogram className="smart-img__mono" />
      </div>
    );
  }

  return (
    <div className={`smart-img ${status === 'loaded' ? 'is-loaded' : ''} ${className}`} style={style}>
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : undefined}
        className={imgClassName}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}
