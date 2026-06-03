class EpPaperCard extends HTMLElement {
  static get observedAttributes() { return ['title', 'date', 'url']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const title = this.getAttribute('title') || '';
    const date = this.getAttribute('date') || '';
    const url = this.getAttribute('url') || '#';

    this.innerHTML = `
      <style>
        ep-paper-card {
          display: block;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          margin-bottom: var(--space-sm);
          transition: border-color 0.15s;
        }
        ep-paper-card:hover {
          border-color: var(--mid);
        }
        .paper-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-md);
        }
        .paper-title {
          font-size: 1rem;
          font-weight: 500;
        }
        .paper-title a {
          color: var(--white);
          text-decoration: none;
        }
        .paper-title a:hover {
          color: var(--accent);
        }
        .paper-date {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
          flex-shrink: 0;
        }
      </style>
      <div class="paper-inner">
        <div class="paper-title">
          <a href="${url}" target="_blank" rel="noopener">${title}</a>
        </div>
        ${date ? `<span class="paper-date">${date}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('ep-paper-card', EpPaperCard);
