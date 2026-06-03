class EpBookCard extends HTMLElement {
  static get observedAttributes() { return ['title', 'subtitle', 'url', 'status', 'publisher']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const url = this.getAttribute('url') || '#';
    const status = this.getAttribute('status') || '';
    const publisher = this.getAttribute('publisher') || '';

    this.innerHTML = `
      <style>
        ep-book-card {
          display: block;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          margin-bottom: var(--space-sm);
          transition: border-color 0.15s;
        }
        ep-book-card:hover {
          border-color: var(--mid);
        }
        .book-title {
          font-size: 1.125rem;
          font-weight: 500;
          margin-bottom: var(--space-xs);
        }
        .book-title a {
          color: var(--white);
          text-decoration: none;
        }
        .book-title a:hover {
          color: var(--accent);
        }
        .book-subtitle {
          font-size: 0.875rem;
          color: var(--mid);
          margin-bottom: var(--space-sm);
          line-height: 1.5;
        }
        .book-meta {
          display: flex;
          gap: var(--space-sm);
          align-items: center;
        }
        .book-status {
          font-family: var(--mono);
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          background: var(--border);
          color: var(--mid);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .book-status.published {
          color: var(--accent);
          border: 1px solid var(--accent);
          background: transparent;
        }
        .book-publisher {
          font-size: 0.75rem;
          color: var(--mid);
          font-family: var(--mono);
        }
      </style>
      <div class="book-title">
        <a href="${url}" target="_blank" rel="noopener">${title}</a>
      </div>
      ${subtitle ? `<div class="book-subtitle">${subtitle}</div>` : ''}
      <div class="book-meta">
        ${status ? `<span class="book-status ${status}">${status}</span>` : ''}
        ${publisher ? `<span class="book-publisher">${publisher}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('ep-book-card', EpBookCard);
