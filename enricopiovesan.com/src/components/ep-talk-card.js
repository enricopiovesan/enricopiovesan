class EpTalkCard extends HTMLElement {
  static get observedAttributes() { return ['title', 'track', 'description', 'based-on', 'based-on-url']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const title = this.getAttribute('title') || '';
    const track = this.getAttribute('track') || '';
    const description = this.getAttribute('description') || '';
    const basedOn = this.getAttribute('based-on') || '';
    const basedOnUrl = this.getAttribute('based-on-url') || '';

    this.innerHTML = `
      <style>
        ep-talk-card {
          display: block;
          border-top: 1px solid var(--border);
          padding: var(--space-md) 0;
        }
        .talk-track {
          font-family: var(--mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: var(--space-xs);
        }
        .talk-title {
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          margin-bottom: var(--space-sm);
          line-height: 1.35;
        }
        .talk-description {
          font-size: 0.9375rem;
          color: var(--mid);
          line-height: 1.8;
          max-width: 520px;
          margin-bottom: var(--space-sm);
        }
        .talk-proof {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--mid);
          border-left: 2px solid var(--accent);
          padding-left: var(--space-xs);
        }
        .talk-proof a {
          color: var(--mid);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          transition: color 0.15s, border-color 0.15s;
        }
        .talk-proof a:hover {
          color: var(--white);
          border-color: var(--mid);
        }
      </style>
      ${track ? `<div class="talk-track">${track}</div>` : ''}
      ${title ? `<div class="talk-title">${title}</div>` : ''}
      ${description ? `<div class="talk-description">${description}</div>` : ''}
      ${basedOn ? `
        <div class="talk-proof">
          Based on: ${basedOnUrl ? `<a href="${basedOnUrl}" target="_blank" rel="noopener">${basedOn}</a>` : basedOn}
        </div>` : ''}
    `;
  }
}

customElements.define('ep-talk-card', EpTalkCard);
