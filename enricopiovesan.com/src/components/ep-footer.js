class EpFooter extends HTMLElement {
  connectedCallback() { this.render(); }

  render() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <style>
        ep-footer {
          display: block;
          border-top: 1px solid var(--border);
          margin-top: var(--space-xl);
        }
        .footer-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: var(--space-md) var(--space-sm);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }
        .footer-copy {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
        }
        .footer-links {
          display: flex;
          gap: var(--space-sm);
          list-style: none;
        }
        .footer-links a {
          font-size: 0.75rem;
          color: var(--mid);
          text-decoration: none;
        }
        .footer-links a:hover {
          color: var(--white);
        }
      </style>
      <footer>
        <div class="footer-inner">
          <span class="footer-copy">© ${year} Enrico Piovesan</span>
          <ul class="footer-links">
            <li><a href="https://linkedin.com/in/enricopiovesan" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="https://github.com/enricopiovesan" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://medium.com/@enricopiovesan" target="_blank" rel="noopener">Medium</a></li>
          </ul>
        </div>
      </footer>
    `;
  }
}

customElements.define('ep-footer', EpFooter);
