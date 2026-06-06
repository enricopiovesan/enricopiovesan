class EpFooter extends HTMLElement {
  static get observedAttributes() { return ['base']; }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const year = new Date().getFullYear();
    const base = (this.getAttribute('base') || '/').replace(/\/$/, '');
    const pages = [
      { href: `${base}/about/`, label: 'About' },
      { href: `${base}/books/`, label: 'Books' },
      { href: `${base}/whitepapers/`, label: 'White Papers' },
      { href: `${base}/projects/`, label: 'Projects' },
      { href: `${base}/writing/`, label: 'Writing' },
      { href: `${base}/speaking/`, label: 'Speaking' },
      { href: `${base}/uses/`, label: 'Uses' },
      { href: `${base}/concepts/`, label: 'Concepts' },
    ];
    const links = [
      { href: 'https://blog.enricopiovesan.com', label: 'Blog' },
      { href: 'https://www.universalmicroservices.com', label: 'universalmicroservices.com' },
      { href: 'https://www.amazon.com/dp/B0GTTTTQH4', label: 'UMA Book' },
      { href: 'https://github.com/enricopiovesan', label: 'GitHub' },
      { href: 'https://linkedin.com/in/enricopiovesan', label: 'LinkedIn' },
      { href: 'https://medium.com/@enricopiovesan', label: 'Medium' },
      { href: 'https://x.com/enricopiovesan', label: 'X' },
    ];

    this.innerHTML = `
      <style>
        ep-footer { display: block; }
        footer {
          padding: 2.5rem 3rem;
          background: var(--fg);
          display: grid;
          grid-template-columns: 1fr 1fr auto;
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
        .footer-copy {
          font-family: var(--mono);
          font-size: 0.65rem;
          color: var(--bg);
          opacity: 0.35;
          white-space: nowrap;
          align-self: end;
          text-align: right;
        }
        @media (max-width: 760px) {
          footer {
            grid-template-columns: 1fr 1fr;
            padding: 2rem 1.5rem;
          }
          .footer-copy { grid-column: 1 / -1; text-align: left; }
        }
        @media (max-width: 480px) {
          footer { grid-template-columns: 1fr; }
        }
      </style>
      <footer>
        <div class="footer-col">
          <p class="footer-col-label">Pages</p>
          <ul>
            ${pages.map(p => `<li><a href="${p.href}">${p.label}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <p class="footer-col-label">Links</p>
          <ul>
            ${links.map(l => `<li><a href="${l.href}" target="_blank" rel="noopener">${l.label}</a></li>`).join('')}
          </ul>
        </div>
        <p class="footer-copy">Enrico Piovesan ${year}</p>
      </footer>
    `;
  }
}
customElements.define('ep-footer', EpFooter);
