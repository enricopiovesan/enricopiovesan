class EpNav extends HTMLElement {
  static get observedAttributes() { return ['active', 'base']; }
  connectedCallback() {
    this.render();
    this._applyStoredTheme();
  }
  attributeChangedCallback() { this.render(); }

  _applyStoredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) document.documentElement.setAttribute('data-theme', stored);
  }

  _toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let next;
    if (!current) {
      next = systemDark ? 'light' : 'dark';
    } else if (current === 'dark') {
      next = 'light';
    } else {
      next = 'dark';
    }

    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    this._updateToggle();
  }

  _updateToggle() {
    const btn = this.querySelector('.theme-toggle');
    if (!btn) return;
    const theme = document.documentElement.getAttribute('data-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (!theme && systemDark);
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.textContent = isDark ? '○' : '●';
  }

  render() {
    const active = this.getAttribute('active') || '';
    const base = (this.getAttribute('base') || '/').replace(/\/$/, '');
    const links = [
      { href: `${base}/books/`, label: 'Books', slug: 'books' },
      { href: `${base}/whitepapers/`, label: 'White Papers', slug: 'whitepapers' },
      { href: `${base}/projects/`, label: 'Projects', slug: 'projects' },
      { href: `${base}/writing/`, label: 'Writing', slug: 'writing' },
      { href: `${base}/speaking/`, label: 'Speaking', slug: 'speaking' },
      { href: `${base}/about/`, label: 'About', slug: 'about' },
      { href: 'https://medium.com/@enricopiovesan', label: 'Blog', slug: '', external: true },
    ];

    this.innerHTML = `
      <style>
        ep-nav { display: block; min-height: 76px; }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 3rem;
          border-bottom: 1px solid var(--border);
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 2rem;
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
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--mono);
          font-size: 0.85rem;
          color: var(--mid);
          padding: 0;
          line-height: 1;
          transition: color 0.15s;
          flex-shrink: 0;
        }
        .theme-toggle:hover { color: var(--white); }
        @media (max-width: 640px) {
          nav { padding: 1.5rem; gap: 1rem; flex-wrap: wrap; }
          .nav-links { gap: 1rem; }
        }
      </style>
      <nav aria-label="Main navigation">
        <div class="nav-left">
          <a href="${base}/" class="nav-name">ENRICO PIOVESAN</a>
          <ul class="nav-links">
            ${links.map(l => `
              <li><a href="${l.href}"${l.external ? ' target="_blank" rel="noopener"' : ''}${active === l.slug && !l.external ? ' aria-current="page"' : ''}>${l.label}</a></li>
            `).join('')}
          </ul>
        </div>
        <button class="theme-toggle" aria-label="Toggle theme">●</button>
      </nav>
    `;

    this.querySelector('.theme-toggle').addEventListener('click', () => this._toggleTheme());
    this._updateToggle();
  }
}
customElements.define('ep-nav', EpNav);
