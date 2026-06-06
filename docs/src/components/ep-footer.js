class EpFooter extends HTMLElement {
  static get observedAttributes() { return ['base']; }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const year = new Date().getFullYear();
    const base = (this.getAttribute('base') || '/').replace(/\/$/, '');

    const cols = [
      {
        label: 'Pages',
        links: [
          { href: `${base}/about/`, label: 'About' },
          { href: `${base}/books/`, label: 'Books' },
          { href: `${base}/projects/`, label: 'Projects' },
          { href: `${base}/writing/`, label: 'Writing' },
          { href: `${base}/speaking/`, label: 'Speaking' },
          { href: `${base}/uses/`, label: 'Uses' },
          { href: `${base}/uma/`, label: 'UMA' },
          { href: `${base}/c-dad/`, label: 'C-DAD' },
        ],
      },
      {
        label: 'Concepts',
        links: [
          { href: `${base}/concepts/`, label: 'All concepts' },
          { href: `${base}/concepts/universal-microservices/`, label: 'Universal Microservices' },
          { href: `${base}/concepts/contract-driven-ai-development/`, label: 'Contract-Driven AI Dev' },
          { href: `${base}/concepts/agentic-systems/`, label: 'Agentic Systems' },
        ],
      },
      {
        label: 'White Papers',
        links: [
          { href: `${base}/whitepapers/`, label: 'All papers' },
          { href: `${base}/whitepapers/uma/`, label: 'UMA' },
          { href: `${base}/whitepapers/ecca/`, label: 'ECCA' },
          { href: `${base}/whitepapers/c-dad/`, label: 'C-DAD' },
          { href: `${base}/whitepapers/csma/`, label: 'CSMA' },
        ],
      },
      {
        label: 'Links',
        links: [
          { href: 'https://blog.enricopiovesan.com', label: 'Blog', external: true },
          { href: 'https://www.universalmicroservices.com', label: 'universalmicroservices.com', external: true },
          { href: 'https://www.amazon.com/dp/B0GTTTTQH4', label: 'UMA Book', external: true },
          { href: 'https://github.com/enricopiovesan', label: 'GitHub', external: true },
          { href: 'https://linkedin.com/in/enricopiovesan', label: 'LinkedIn', external: true },
          { href: 'https://medium.com/@enricopiovesan', label: 'Medium', external: true },
          { href: 'https://x.com/enricopiovesan', label: 'X', external: true },
        ],
      },
    ];

    this.innerHTML = `
      <style>
        ep-footer { display: block; }
        footer {
          padding: 2.5rem 3rem;
          background: var(--fg);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          align-items: start;
        }
        .footer-col-label {
          font-family: var(--mono);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: var(--bg);
          opacity: 0.35;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }
        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .footer-col a {
          font-family: var(--mono);
          font-size: 0.7rem;
          letter-spacing: 0.04em;
          color: var(--bg);
          opacity: 0.55;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .footer-col a:hover { opacity: 1; }
        .footer-bottom {
          grid-column: 1 / -1;
          border-top: 1px solid rgba(var(--bg-raw, 245,244,240), 0.12);
          padding-top: 1rem;
          font-family: var(--mono);
          font-size: 0.65rem;
          color: var(--bg);
          opacity: 0.35;
        }
        @media (max-width: 900px) {
          footer { grid-template-columns: 1fr 1fr; padding: 2rem 1.5rem; }
        }
        @media (max-width: 480px) {
          footer { grid-template-columns: 1fr; }
        }
      </style>
      <footer>
        ${cols.map(col => `
          <div class="footer-col">
            <p class="footer-col-label">${col.label}</p>
            <ul>
              ${col.links.map(l => `<li><a href="${l.href}"${l.external ? ' target="_blank" rel="noopener"' : ''}>${l.label}</a></li>`).join('')}
            </ul>
          </div>
        `).join('')}
        <p class="footer-bottom">Enrico Piovesan ${year}</p>
      </footer>
    `;
  }
}
customElements.define('ep-footer', EpFooter);
