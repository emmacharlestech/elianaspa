import { useReveal } from '../hooks/useReveal';

/** Wrapper that fades/slides its children in when scrolled into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': delay, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
