class EpBookCard extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'subtitle', 'url', 'status', 'publisher', 'description', 'companion-repo', 'companion-live'];
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const url = this.getAttribute('url') || '';
    const status = this.getAttribute('status') || '';
    const publisher = this.getAttribute('publisher') || '';
    const description = this.getAttribute('description') || '';
    const companionRepo = this.getAttribute('companion-repo') || '';
    const companionLive = this.getAttribute('companion-live') || '';

    this.innerHTML = `
      <style>
        ep-book-card {
          display: block;
          border-top: 1px solid var(--border);
          padding: var(--space-md) 0;
        }
        .book-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-md);
          margin-bottom: var(--space-xs);
        }
        .book-title {
          font-size: 1.25rem;
          font-weight: 500;
          line-height: 1.3;
        }
        .book-title a {
          color: var(--white);
          text-decoration: none;
        }
        .book-title a:hover { color: var(--accent); }
        .book-status {
          font-family: var(--mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
          color: var(--accent);
          border: 1px solid var(--accent);
        }
        .book-status.forthcoming {
          color: var(--mid);
          border-color: var(--border);
        }
        .book-subtitle {
          font-size: 0.9rem;
          color: var(--mid);
          margin-bottom: var(--space-sm);
          line-height: 1.5;
        }
        .book-description {
          font-size: 0.9375rem;
          color: var(--mid);
          line-height: 1.8;
          margin-bottom: var(--space-sm);
          max-width: 560px;
        }
        .book-links {
          display: flex;
          gap: var(--space-md);
          flex-wrap: wrap;
        }
        .book-links a {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          transition: color 0.15s, border-color 0.15s;
        }
        .book-links a:hover {
          color: var(--white);
          border-color: var(--mid);
        }
        .book-publisher {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
        }
      </style>
      <div class="book-header">
        <div class="book-title">
          ${url ? `<a href="${url}" target="_blank" rel="noopener">${title}</a>` : title}
        </div>
        ${status ? `<span class="book-status ${status}">${status}</span>` : ''}
      </div>
      ${subtitle ? `<div class="book-subtitle">${subtitle}</div>` : ''}
      ${description ? `<div class="book-description">${description}</div>` : ''}
      <div class="book-links">
        ${publisher && url ? `<a href="${url}" target="_blank" rel="noopener">${publisher} →</a>` : ''}
        ${companionRepo ? `<a href="${companionRepo}" target="_blank" rel="noopener">companion repo →</a>` : ''}
        ${companionLive ? `<a href="${companionLive}" target="_blank" rel="noopener">live reference →</a>` : ''}
      </div>
    `;
  }
}

customElements.define('ep-book-card', EpBookCard);
