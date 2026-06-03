class EpFooter extends HTMLElement {
  connectedCallback() { this.render(); }

  render() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <style>
        ep-footer { display: block; min-height: 64px; }
        footer {
          padding: 2rem 3rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-links {
          display: flex;
          gap: 2rem;
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          list-style: none;
        }
        .footer-links a { color: var(--mid); text-decoration: none; transition: color 0.15s; }
        .footer-links a:hover { color: var(--white); }
        .footer-copy {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--mid);
        }
        @media (max-width: 640px) {
          footer { padding: 1.5rem; }
          .footer-links { gap: 1rem; flex-wrap: wrap; }
        }
      </style>
      <footer>
        <ul class="footer-links">
          <li><a href="https://www.universalmicroservices.com" target="_blank" rel="noopener">universalmicroservices.com</a></li>
          <li><a href="https://www.amazon.com/dp/B0GTTTTQH4" target="_blank" rel="noopener">UMA Book</a></li>
          <li><a href="https://github.com/enricopiovesan" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://linkedin.com/in/enricopiovesan" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
        <p class="footer-copy">Enrico Piovesan ${year}</p>
      </footer>
    `;
  }
}
customElements.define('ep-footer', EpFooter);
