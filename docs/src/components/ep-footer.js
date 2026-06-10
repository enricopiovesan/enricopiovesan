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
          padding: 3rem 3rem;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          border-bottom: 1px solid rgba(23,43,54,0.2);
          flex-wrap: wrap;
        }
        .footer-contact-label {
          font-family: var(--mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: var(--footer-fg);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .footer-contact-text {
          font-size: 1.35rem;
          font-weight: 400;
          color: var(--footer-fg);
          line-height: 1.4;
          max-width: 540px;
        }
        .footer-contact-link {
          font-family: var(--mono);
          font-size: 0.8rem;
          color: var(--footer-fg);
          text-decoration: underline;
          text-underline-offset: 3px;
          white-space: nowrap;
          transition: opacity 0.15s;
          flex-shrink: 0;
        }
        .footer-contact-link:hover { opacity: 0.65; }
        @media (max-width: 640px) {
          .footer-contact { padding: 2rem 1.5rem; flex-direction: column; align-items: flex-start; }
        }
        footer {
          padding: 2.5rem 3rem;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          align-items: start;
        }
        .footer-col-label {
          font-family: var(--mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: var(--footer-fg);
          text-transform: uppercase;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(23,43,54,0.2);
        }
        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .footer-col > ul > li > a {
          font-family: var(--mono);
          font-size: 0.78rem;
          letter-spacing: 0.03em;
          color: var(--footer-fg);
          opacity: 0.8;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .footer-col > ul > li > a:hover { opacity: 1; }
        .footer-section-label {
          font-family: var(--mono);
          font-size: 0.78rem;
          letter-spacing: 0.03em;
          color: var(--footer-fg);
          opacity: 0.75;
          margin-top: 0.5rem;
          margin-bottom: 0.4rem;
          display: block;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .footer-section-label:hover { opacity: 1; }
        .footer-sub {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-left: 0.85rem;
          border-left: 1px solid rgba(23,43,54,0.2);
          margin-bottom: 0.25rem;
        }
        .footer-sub a {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--footer-fg);
          opacity: 0.8;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .footer-sub a:hover { opacity: 1; }
        .footer-bottom {
          grid-column: 1 / -1;
          border-top: 1px solid rgba(23,43,54,0.2);
          padding-top: 1.25rem;
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--footer-fg);
          opacity: 0.7;
        }
        @media (max-width: 1100px) {
          footer { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
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
          <p class="footer-col-label">Work</p>
          <ul>
            <li><a href="${b}/books/">Books</a></li>
            <li>
              <a href="${b}/whitepapers/">White Papers</a>
              <ul class="footer-sub">
                <li><a href="${b}/whitepapers/uma/">UMA</a></li>
                <li><a href="${b}/whitepapers/ecca/">ECCA</a></li>
                <li><a href="${b}/whitepapers/c-dad/">C-DAD</a></li>
                <li><a href="${b}/whitepapers/csma/">CSMA</a></li>
              </ul>
            </li>
            <li><a href="${b}/projects/">Projects</a></li>
            <li><a href="${b}/writing/">Writing</a></li>
            <li><a href="${b}/speaking/">Speaking</a></li>
            <li><a href="${b}/teaching/">Teaching</a></li>
            <li><a href="${b}/uma/">UMA framework</a></li>
            <li><a href="${b}/c-dad/">C-DAD framework</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <p class="footer-col-label">Thinking</p>
          <ul>
            <li>
              <a href="${b}/concepts/">Concepts</a>
              <ul class="footer-sub">
                <li><a href="${b}/concepts/universal-microservices/">Universal Microservices</a></li>
                <li><a href="${b}/concepts/contract-driven-ai-development/">Contract-Driven AI Dev</a></li>
                <li><a href="${b}/concepts/agentic-systems/">Agentic Systems</a></li>
              </ul>
            </li>
            <li>
              <a href="${b}/perspectives/">Perspectives</a>
              <ul class="footer-sub">
                <li><a href="${b}/perspectives/context-engineering/">Context Engineering</a></li>
                <li><a href="${b}/perspectives/ai-native-architecture/">What Makes Software AI-Native?</a></li>
              </ul>
            </li>
            <li><a href="${b}/knowledge-graph/">Knowledge Graph</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <p class="footer-col-label">About</p>
          <ul>
            <li><a href="${b}/about/">About</a></li>
            <li><a href="${b}/uses/">Uses</a></li>
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

        <p class="footer-bottom">Enrico Piovesan ${year}</p>
      </footer>
    `;
  }
}
customElements.define('ep-footer', EpFooter);
