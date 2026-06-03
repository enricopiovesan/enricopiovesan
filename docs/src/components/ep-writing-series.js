class EpWritingSeries extends HTMLElement {
  static get observedAttributes() { return ['name', 'cadence', 'topics', 'url', 'followers']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const name = this.getAttribute('name') || '';
    const cadence = this.getAttribute('cadence') || '';
    const topics = this.getAttribute('topics') || '';
    const url = this.getAttribute('url') || '#';
    const followers = this.getAttribute('followers') || '';

    this.innerHTML = `
      <style>
        ep-writing-series {
          display: block;
          border-top: 1px solid var(--border);
          padding: var(--space-md) 0;
        }
        .series-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-md);
          margin-bottom: var(--space-xs);
        }
        .series-name {
          font-size: 1.125rem;
          font-weight: 500;
        }
        .series-name a {
          color: var(--white);
          text-decoration: none;
        }
        .series-name a:hover {
          color: var(--accent);
        }
        .series-followers {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
          flex-shrink: 0;
        }
        .series-meta {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: var(--space-xs);
        }
        .series-topics {
          font-size: 0.9rem;
          color: var(--mid);
          line-height: 1.5;
        }
      </style>
      <div class="series-header">
        <div class="series-name">
          <a href="${url}" target="_blank" rel="noopener">${name}</a>
        </div>
        ${followers ? `<span class="series-followers">${followers} followers</span>` : ''}
      </div>
      ${cadence ? `<div class="series-meta">${cadence}</div>` : ''}
      ${topics ? `<div class="series-topics">${topics}</div>` : ''}
    `;
  }
}

customElements.define('ep-writing-series', EpWritingSeries);
