class EpNavCards extends HTMLElement {
  connectedCallback() { this.render(); }

  render() {
    const cards = [
      { href: '/books/', label: 'Books', desc: 'Two books on software architecture and AI-native systems' },
      { href: '/whitepapers/', label: 'White Papers', desc: 'Five research papers published between 2023 and 2025' },
      { href: '/projects/', label: 'Projects', desc: 'Open source tools and runtimes built from the frameworks' },
      { href: '/writing/', label: 'Writing', desc: 'Weekly publishing on Medium since May 2025' },
      { href: '/speaking/', label: 'Speaking', desc: 'Conference talks on architecture, WASM, and AI-native systems' },
    ];

    this.innerHTML = `
      <style>
        ep-nav-cards {
          display: block;
          margin: var(--space-lg) 0;
        }
        .nav-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .nav-card {
          display: block;
          padding: var(--space-md) 0;
          border-top: 1px solid var(--border);
          text-decoration: none;
          transition: border-color 0.15s;
        }
        .nav-card:hover .nav-card-label {
          color: var(--white);
        }
        .nav-card-label {
          font-family: var(--mono);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: var(--mid);
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          margin-bottom: 0.35rem;
          transition: color 0.15s;
        }
        .nav-card-label::after {
          content: '↗';
          font-size: 0.7rem;
          color: var(--accent);
        }
        .nav-card-desc {
          font-size: 0.875rem;
          color: var(--mid);
          line-height: 1.5;
        }
        @media (max-width: 640px) {
          .nav-cards-grid { grid-template-columns: 1fr; }
        }
      </style>
      <div class="nav-cards-grid">
        ${cards.map(c => `
          <a class="nav-card" href="${c.href}">
            <div class="nav-card-label">${c.label}</div>
            <div class="nav-card-desc">${c.desc}</div>
          </a>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('ep-nav-cards', EpNavCards);
