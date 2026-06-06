class EpFooter extends HTMLElement {
  connectedCallback() { this.render(); }

  render() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <style>
        ep-footer { display: block; min-height: 56px; }
        footer {
          padding: 1.25rem 3rem;
          background: var(--fg);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .footer-links {
          display: flex;
          gap: 1.5rem;
          font-family: var(--mono);
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          list-style: none;
          flex-wrap: wrap;
          align-items: center;
        }
        .footer-links a { color: var(--bg); opacity: 0.55; text-decoration: none; transition: opacity 0.15s; }
        .footer-links a:hover { opacity: 1; }
        .footer-copy {
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--bg);
          opacity: 0.55;
          white-space: nowrap;
        }
        @media (max-width: 640px) {
          footer { padding: 1rem 1.5rem; }
          .footer-links { gap: 1rem; }
        }
      </style>
      <footer>
        <ul class="footer-links">
          <li><a href="https://www.universalmicroservices.com" target="_blank" rel="noopener">universalmicroservices.com</a></li>
          <li><a href="https://www.amazon.com/dp/B0GTTTTQH4" target="_blank" rel="noopener">UMA Book</a></li>
          <li><a href="https://github.com/enricopiovesan" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://linkedin.com/in/enricopiovesan" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="https://blog.enricopiovesan.com" target="_blank" rel="noopener">Blog</a></li>
        </ul>
        <p class="footer-copy">Enrico Piovesan ${year}</p>
      </footer>
    `;
  }
}
customElements.define('ep-footer', EpFooter);
