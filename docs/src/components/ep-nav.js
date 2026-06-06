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
    const next = (!current ? (systemDark ? 'light' : 'dark') : current === 'dark' ? 'light' : 'dark');
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
    btn.innerHTML = isDark
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  _toggleMenu() {
    const menu = this.querySelector('.nav-links');
    const btn = this.querySelector('.hamburger');
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.innerHTML = open ? '✕' : '☰';
  }

  _bindDropdowns() {
    this.querySelectorAll('.nav-dropdown').forEach(item => {
      const btn = item.querySelector('.nav-dropdown-btn');
      const menu = item.querySelector('.nav-dropdown-menu');

      // Desktop: hover
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 900) menu.classList.add('open');
      });
      item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 900) menu.classList.remove('open');
      });

      // Mobile/click: toggle
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      this.querySelectorAll('.nav-dropdown-menu.open').forEach(m => m.classList.remove('open'));
    });
  }

  render() {
    const active = this.getAttribute('active') || '';
    const base = (this.getAttribute('base') || '/').replace(/\/$/, '');

    const workSlugs = ['books', 'whitepapers', 'projects'];
    const thinkingSlugs = ['concepts', 'perspectives'];
    const workActive = workSlugs.includes(active);
    const thinkingActive = thinkingSlugs.includes(active);

    const directLinks = [
      { href: `${base}/about/`, label: 'About', slug: 'about' },
      { href: `${base}/speaking/`, label: 'Speaking', slug: 'speaking' },
      { href: `${base}/writing/`, label: 'Writing', slug: 'writing' },
      { href: `${base}/uses/`, label: 'Uses', slug: 'uses' },
      { href: 'https://blog.enricopiovesan.com', label: 'Blog', slug: '', external: true },
    ];

    const workLinks = [
      { href: `${base}/books/`, label: 'Books', slug: 'books' },
      { href: `${base}/whitepapers/`, label: 'White Papers', slug: 'whitepapers' },
      { href: `${base}/projects/`, label: 'Projects', slug: 'projects' },
    ];

    const thinkingLinks = [
      { href: `${base}/concepts/`, label: 'Concepts', slug: 'concepts' },
      { href: `${base}/perspectives/`, label: 'Perspectives', slug: 'perspectives' },
    ];

    this.innerHTML = `
      <style>
        ep-nav { display: block; min-height: 64px; }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 3rem;
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .nav-name {
          font-family: var(--mono);
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          color: var(--mid);
          text-decoration: none;
          transition: color 0.15s;
          flex-shrink: 0;
        }
        .nav-name:hover { color: var(--fg); }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .nav-links {
          display: flex;
          gap: 1.25rem;
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          list-style: none;
          flex-wrap: wrap;
          align-items: center;
        }
        .nav-links > li { position: relative; }
        .nav-links a { color: var(--mid); text-decoration: none; transition: color 0.15s; padding-bottom: 2px; }
        .nav-links a:hover { color: var(--fg); }
        .nav-links a[aria-current="page"] {
          color: var(--fg);
          border-bottom: 1px solid var(--accent);
        }

        /* Dropdown trigger button */
        .nav-dropdown-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: var(--mid);
          padding: 0 0 2px 0;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.15s;
        }
        .nav-dropdown-btn:hover { color: var(--fg); }
        .nav-dropdown-btn.active { color: var(--fg); border-bottom: 1px solid var(--accent); }
        .nav-dropdown-btn::after { content: '▾'; font-size: 0.6rem; opacity: 0.6; }

        /* Dropdown menu */
        .nav-dropdown-menu {
          display: none;
          position: absolute;
          top: calc(100% + 0.75rem);
          left: 0;
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 0.5rem 0;
          min-width: 140px;
          z-index: 200;
          list-style: none;
        }
        .nav-dropdown-menu.open { display: block; }
        .nav-dropdown-menu a {
          display: block;
          padding: 0.4rem 1rem;
          color: var(--mid);
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.15s;
          border-bottom: none;
        }
        .nav-dropdown-menu a:hover { color: var(--fg); }
        .nav-dropdown-menu a[aria-current="page"] { color: var(--fg); }

        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--mid);
          padding: 0;
          line-height: 1;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .theme-toggle:hover { color: var(--fg); }
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          color: var(--mid);
          padding: 0;
          line-height: 1;
          transition: color 0.15s;
        }
        .hamburger:hover { color: var(--fg); }

        @media (max-width: 900px) {
          .hamburger { display: block; }
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg);
            border-bottom: 1px solid var(--border);
            padding: 1.5rem 2rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
            z-index: 100;
          }
          .nav-links.open { display: flex; }
          nav { padding: 1.25rem 1.5rem; }
          .nav-dropdown-menu {
            position: static;
            border: none;
            padding: 0.25rem 0 0 1rem;
            min-width: unset;
          }
          .nav-dropdown-menu a { padding: 0.3rem 0; }
        }
      </style>
      <nav aria-label="Main navigation">
        <a href="${base}/" class="nav-name">ENRICO PIOVESAN</a>
        <div class="nav-right">
          <ul class="nav-links" id="nav-menu">
            <li><a href="${base}/about/"${active === 'about' ? ' aria-current="page"' : ''}>About</a></li>

            <li class="nav-dropdown">
              <button class="nav-dropdown-btn${workActive ? ' active' : ''}" aria-haspopup="true" aria-expanded="false">Work</button>
              <ul class="nav-dropdown-menu" role="menu">
                ${workLinks.map(l => `<li><a href="${l.href}"${active === l.slug ? ' aria-current="page"' : ''}>${l.label}</a></li>`).join('')}
              </ul>
            </li>

            <li class="nav-dropdown">
              <button class="nav-dropdown-btn${thinkingActive ? ' active' : ''}" aria-haspopup="true" aria-expanded="false">Thinking</button>
              <ul class="nav-dropdown-menu" role="menu">
                ${thinkingLinks.map(l => `<li><a href="${l.href}"${active === l.slug ? ' aria-current="page"' : ''}>${l.label}</a></li>`).join('')}
              </ul>
            </li>

            <li><a href="${base}/speaking/"${active === 'speaking' ? ' aria-current="page"' : ''}>Speaking</a></li>
            <li><a href="${base}/writing/"${active === 'writing' ? ' aria-current="page"' : ''}>Writing</a></li>
            <li><a href="${base}/uses/"${active === 'uses' ? ' aria-current="page"' : ''}>Uses</a></li>
            <li><a href="https://blog.enricopiovesan.com" target="_blank" rel="noopener">Blog</a></li>
          </ul>
          <button class="theme-toggle" aria-label="Toggle theme"></button>
          <button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">☰</button>
        </div>
      </nav>
    `;

    this.querySelector('.theme-toggle').addEventListener('click', () => this._toggleTheme());
    this.querySelector('.hamburger').addEventListener('click', () => this._toggleMenu());
    this._updateToggle();
    this._bindDropdowns();
  }
}
customElements.define('ep-nav', EpNav);
