class EpNav extends HTMLElement {
  static get observedAttributes() { return ['active', 'base']; }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const active = this.getAttribute('active') || '';
    const base = (this.getAttribute('base') || '/').replace(/\/$/, '');
    const links = [
      { href: `${base}/books/`, label: 'Books', slug: 'books' },
      { href: `${base}/whitepapers/`, label: 'White Papers', slug: 'whitepapers' },
      { href: `${base}/projects/`, label: 'Projects', slug: 'projects' },
      { href: `${base}/writing/`, label: 'Writing', slug: 'writing' },
      { href: `${base}/speaking/`, label: 'Speaking', slug: 'speaking' },
    ];

    this.innerHTML = `
      <style>
        ep-nav { display: block; }
        ep-nav { display: block; min-height: 76px; }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 3rem;
          border-bottom: 1px solid var(--border);
        }
        .nav-name {
          font-family: var(--mono);
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          color: var(--mid);
          text-decoration: none;
          transition: color 0.15s;
        }
        .nav-name:hover { color: var(--white); }
        .nav-links {
          display: flex;
          gap: 2rem;
          font-family: var(--mono);
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          color: var(--mid);
          list-style: none;
          flex-wrap: wrap;
        }
        .nav-links a { color: var(--mid); transition: color 0.15s; }
        .nav-links a:hover,
        .nav-links a[aria-current="page"] { color: var(--white); }
        @media (max-width: 640px) {
          nav { padding: 1.5rem; gap: 1rem; flex-wrap: wrap; }
          .nav-links { gap: 1rem; }
        }
      </style>
      <nav aria-label="Main navigation">
        <a href="${base}/" class="nav-name">ENRICO PIOVESAN</a>
        <ul class="nav-links">
          ${links.map(l => `
            <li><a href="${l.href}"${active === l.slug ? ' aria-current="page"' : ''}>${l.label}</a></li>
          `).join('')}
        </ul>
      </nav>
    `;
  }
}
customElements.define('ep-nav', EpNav);
