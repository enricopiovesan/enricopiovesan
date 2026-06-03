class EpTalkCard extends HTMLElement {
  static get observedAttributes() { return ['title', 'track', 'description', 'based-on']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const title = this.getAttribute('title') || '';
    const track = this.getAttribute('track') || '';
    const description = this.getAttribute('description') || '';
    const basedOn = this.getAttribute('based-on') || '';

    this.innerHTML = `
      <style>
        ep-talk-card {
          display: block;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          margin-bottom: var(--space-sm);
          transition: border-color 0.15s;
        }
        ep-talk-card:hover {
          border-color: var(--mid);
        }
        .talk-track {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--space-xs);
        }
        .talk-title {
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--white);
          margin-bottom: var(--space-xs);
        }
        .talk-description {
          font-size: 0.9375rem;
          color: var(--mid);
          line-height: 1.5;
          margin-bottom: var(--space-sm);
        }
        .talk-based-on {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
          border-left: 2px solid var(--accent);
          padding-left: var(--space-xs);
        }
      </style>
      ${track ? `<div class="talk-track">${track}</div>` : ''}
      ${title ? `<div class="talk-title">${title}</div>` : ''}
      ${description ? `<div class="talk-description">${description}</div>` : ''}
      ${basedOn ? `<div class="talk-based-on">Based on: ${basedOn}</div>` : ''}
    `;
  }
}

customElements.define('ep-talk-card', EpTalkCard);
