class EpHero extends HTMLElement {
  static get observedAttributes() { return ['headline', 'subline', 'cta-label', 'cta-href']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const headline = this.getAttribute('headline') || '';
    const subline = this.getAttribute('subline') || '';
    const ctaLabel = this.getAttribute('cta-label') || '';
    const ctaHref = this.getAttribute('cta-href') || '#';

    this.innerHTML = `
      <style>
        ep-hero {
          display: block;
          padding: var(--space-xl) 0 var(--space-lg);
        }
        .hero-headline {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-md);
          max-width: 600px;
        }
        .hero-subline {
          font-size: 1.125rem;
          color: var(--mid);
          max-width: 560px;
          margin-bottom: var(--space-lg);
          line-height: 1.6;
        }
        .hero-cta {
          display: inline-block;
          font-family: var(--mono);
          font-size: 0.875rem;
          color: var(--accent);
          text-decoration: none;
          border: 1px solid var(--accent);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
          transition: background 0.15s, color 0.15s;
        }
        .hero-cta:hover {
          background: var(--accent);
          color: var(--white);
        }
      </style>
      ${headline ? `<h1 class="hero-headline">${headline}</h1>` : ''}
      ${subline ? `<p class="hero-subline">${subline}</p>` : ''}
      ${ctaLabel ? `<a class="hero-cta" href="${ctaHref}">${ctaLabel}</a>` : ''}
    `;
  }
}

customElements.define('ep-hero', EpHero);
