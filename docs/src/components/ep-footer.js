class EpFooter extends HTMLElement {
  static get observedAttributes() { return ['base']; }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const year = new Date().getFullYear();
    const base = (this.getAttribute('base') || '/').replace(/\/$/, '');

    const b = base;

    this.innerHTML = `
      <style>
        ep-footer { display: block; }
        .footer-contact {
          padding: 2.5rem 3rem;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          border-bottom: 1px solid rgba(10,10,10,0.15);
          flex-wrap: wrap;
        }
        .footer-contact-label {
          font-family: var(--mono);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: var(--bg);
          opacity: 0.35;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .footer-contact-text {
          font-size: 0.95rem;
          color: var(--bg);
          line-height: 1.6;
          max-width: 480px;
        }
        .footer-contact-link {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--accent);
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.15s;
        }
        .footer-contact-link:hover { opacity: 0.75; }
        @media (max-width: 640px) {
          .footer-contact { padding: 2rem 1.5rem; flex-direction: column; align-items: flex-start; }
        }
        footer {
          padding: 2.5rem 3rem;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
        .footer-section-label {
          font-family: var(--mono);
          font-size: 0.7rem;
          letter-spacing: 0.04em;
          color: var(--bg);
          opacity: 0.35;
          margin-top: 1rem;
          margin-bottom: 0.1rem;
          display: block;
        }
        .footer-sub {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding-left: 0.85rem;
          border-left: 1px solid rgba(10,10,10,0.15);
          margin-bottom: 0.2rem;
        }
        .footer-sub a { font-size: 0.65rem; }
        .footer-bottom {
          grid-column: 1 / -1;
          border-top: 1px solid rgba(var(--bg-raw, 245,244,240), 0.12);
          padding-top: 1rem;
          font-family: var(--mono);
          font-size: 0.65rem;
          color: var(--bg);
          opacity: 0.35;
        }
        @media (max-width: 760px) {
          footer { grid-template-columns: 1fr 1fr; padding: 2rem 1.5rem; }
        }
        @media (max-width: 480px) {
          footer { grid-template-columns: 1fr; }
        }
      </style>
      <div class="footer-contact">
        <div>
          <p class="footer-contact-label">Get in touch</p>
          <p class="footer-contact-text">Speaking invitations, collaborations, or just a question about the work.</p>
        </div>
        <a class="footer-contact-link" href="https://linkedin.com/in/enricopiovesan" target="_blank" rel="noopener">Connect on LinkedIn →</a>
      </div>
      <footer>
        <div class="footer-col">
          <p class="footer-col-label">Pages</p>
          <ul>
            <li><a href="${b}/about/">About</a></li>
            <li>
              <a href="${b}/work/" class="footer-section-label">Work</a>
              <ul class="footer-sub">
                <li><a href="${b}/books/">Books</a></li>
                <li><a href="${b}/whitepapers/">White Papers</a></li>
                <ul class="footer-sub">
                  <li><a href="${b}/whitepapers/uma/">UMA</a></li>
                  <li><a href="${b}/whitepapers/ecca/">ECCA</a></li>
                  <li><a href="${b}/whitepapers/c-dad/">C-DAD</a></li>
                  <li><a href="${b}/whitepapers/csma/">CSMA</a></li>
                </ul>
                <li><a href="${b}/projects/">Projects</a></li>
              </ul>
            </li>
            <li>
              <a href="${b}/thinking/" class="footer-section-label">Thinking</a>
              <ul class="footer-sub">
                <li><a href="${b}/concepts/">Concepts</a></li>
                <ul class="footer-sub">
                  <li><a href="${b}/concepts/universal-microservices/">Universal Microservices</a></li>
                  <li><a href="${b}/concepts/contract-driven-ai-development/">Contract-Driven AI Dev</a></li>
                  <li><a href="${b}/concepts/agentic-systems/">Agentic Systems</a></li>
                </ul>
                <li><a href="${b}/perspectives/">Perspectives</a></li>
              </ul>
            </li>
            <li><a href="${b}/speaking/">Speaking</a></li>
            <li><a href="${b}/writing/">Writing</a></li>
            <li><a href="${b}/uses/">Uses</a></li>
            <li><a href="${b}/uma/">UMA</a></li>
            <li><a href="${b}/c-dad/">C-DAD</a></li>
            <li><a href="${b}/now/">Now</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <p class="footer-col-label">Links</p>
          <ul>
            <li><a href="https://blog.enricopiovesan.com" target="_blank" rel="noopener">Blog</a></li>
            <li><a href="https://www.universalmicroservices.com" target="_blank" rel="noopener">universalmicroservices.com</a></li>
            <li><a href="https://www.amazon.com/dp/B0GTTTTQH4" target="_blank" rel="noopener">UMA Book</a></li>
            <li><a href="https://github.com/enricopiovesan" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://linkedin.com/in/enricopiovesan" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="https://medium.com/@enricopiovesan" target="_blank" rel="noopener">Medium</a></li>
            <li><a href="https://x.com/enricopiovesan" target="_blank" rel="noopener">X</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <p class="footer-col-label">Copyright</p>
          <p style="font-family:var(--mono);font-size:0.7rem;color:var(--bg);opacity:0.55;line-height:1.7;">Enrico Piovesan ${year}<br>Platform architect. Author.<br>Open source builder.</p>
        </div>

        <p class="footer-bottom">Enrico Piovesan ${year}</p>
      </footer>
    `;
  }
}
customElements.define('ep-footer', EpFooter);
