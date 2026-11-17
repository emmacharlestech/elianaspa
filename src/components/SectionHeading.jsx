import Reveal from './Reveal';
import './SectionHeading.css';

export default function SectionHeading({ eyebrow, title, intro, align = 'left', id, className = '' }) {
  return (
    <Reveal className={`section-heading section-heading--${align} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {intro && <p className="lede section-heading__intro">{intro}</p>}
    </Reveal>
  );
}
