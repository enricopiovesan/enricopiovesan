class EpPaperCard extends HTMLElement {
  static get observedAttributes() { return ['title', 'date', 'url', 'description']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const title = this.getAttribute('title') || '';
    const date = this.getAttribute('date') || '';
    const url = this.getAttribute('url') || '#';
    const description = this.getAttribute('description') || '';

    this.innerHTML = `
      <style>
        ep-paper-card {
          display: block;
          border-top: 1px solid var(--border);
          padding: var(--space-md) 0;
        }
        .paper-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-md);
          margin-bottom: var(--space-xs);
        }
        .paper-title {
          font-size: 1.125rem;
          font-weight: 500;
        }
        .paper-title a {
          color: var(--white);
          text-decoration: none;
        }
        .paper-title a:hover { color: var(--accent); }
        .paper-date {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
          flex-shrink: 0;
        }
        .paper-description {
          font-size: 0.9375rem;
          color: var(--mid);
          line-height: 1.8;
          max-width: 520px;
        }
      </style>
      <div class="paper-header">
        <div class="paper-title">
          <a href="${url}" target="_blank" rel="noopener">${title}</a>
        </div>
        ${date ? `<span class="paper-date">${date}</span>` : ''}
      </div>
      ${description ? `<div class="paper-description">${description}</div>` : ''}
    `;
  }
}

customElements.define('ep-paper-card', EpPaperCard);
