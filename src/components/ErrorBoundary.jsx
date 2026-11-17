import { Component } from 'react';
import { SITE } from '../data/site';

/** Keeps a rendering error in one section from blanking the whole site. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Section failed to render:', error, info?.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.silent) return null;
    return (
      <div className="container" role="alert" style={{ padding: '4rem var(--gutter)', textAlign: 'center' }}>
        <p className="serif-italic" style={{ fontSize: '1.5rem', color: 'var(--charcoal)' }}>
          Something didn&rsquo;t load as expected.
        </p>
        <p className="lede" style={{ margin: '0.75rem auto 1.5rem' }}>
          Please refresh the page, or reach us directly on WhatsApp.
        </p>
        <a className="btn btn--dark" href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">
          Chat on WhatsApp
        </a>
      </div>
    );
  }
}
