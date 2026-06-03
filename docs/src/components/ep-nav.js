class EpNav extends HTMLElement {
  static get observedAttributes() { return ['active', 'base']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const active = this.getAttribute('active') || '';
    const base = (this.getAttribute('base') || '/').replace(/\/$/, '');
    const links = [
      { href: `${base}/`, label: 'Home', slug: 'home' },
      { href: `${base}/books/`, label: 'Books', slug: 'books' },
      { href: `${base}/projects/`, label: 'Projects', slug: 'projects' },
      { href: `${base}/speaking/`, label: 'Speaking', slug: 'speaking' },
      { href: `${base}/whitepapers/`, label: 'White Papers', slug: 'whitepapers' },
      { href: `${base}/writing/`, label: 'Writing', slug: 'writing' },
    ];

    this.innerHTML = `
      <style>
        ep-nav {
          display: block;
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: var(--space-sm);
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }
        .nav-brand {
          font-family: var(--mono);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--white);
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-links {
          display: flex;
          gap: var(--space-sm);
          list-style: none;
          flex-wrap: wrap;
        }
        .nav-links a {
          font-size: 0.875rem;
          color: var(--mid);
          text-decoration: none;
          transition: color 0.15s;
        }
        .nav-links a:hover,
        .nav-links a[aria-current="page"] {
          color: var(--white);
        }
      </style>
      <nav aria-label="Main navigation">
        <div class="nav-inner">
          <a href="/" class="nav-brand">Enrico Piovesan</a>
          <ul class="nav-links">
            ${links.map(l => `
              <li><a href="${l.href}"${active === l.slug ? ' aria-current="page"' : ''}>${l.label}</a></li>
            `).join('')}
          </ul>
        </div>
      </nav>
    `;
  }
}

customElements.define('ep-nav', EpNav);
