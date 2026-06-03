class EpProjectCard extends HTMLElement {
  static get observedAttributes() { return ['title', 'type', 'stack', 'status', 'description', 'url', 'github']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const title = this.getAttribute('title') || '';
    const type = this.getAttribute('type') || '';
    const stack = this.getAttribute('stack') || '';
    const status = this.getAttribute('status') || '';
    const description = this.getAttribute('description') || '';
    const url = this.getAttribute('url') || '';
    const github = this.getAttribute('github') || '';

    this.innerHTML = `
      <style>
        ep-project-card {
          display: block;
          border-top: 1px solid var(--border);
          padding: var(--space-md) 0;
        }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-sm);
          margin-bottom: var(--space-xs);
        }
        .project-title {
          font-size: 1.125rem;
          font-weight: 500;
          font-family: var(--mono);
          color: var(--white);
        }
        .project-status {
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--mid);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }
        .project-meta {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--mid);
          margin-bottom: var(--space-sm);
          display: flex;
          gap: var(--space-sm);
        }
        .project-type { color: var(--accent); }
        .project-description {
          font-size: 0.9375rem;
          color: var(--mid);
          line-height: 1.8;
          max-width: 520px;
          margin-bottom: var(--space-sm);
        }
        .project-links {
          display: flex;
          gap: var(--space-md);
        }
        .project-links a {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          transition: color 0.15s, border-color 0.15s;
        }
        .project-links a:hover {
          color: var(--white);
          border-color: var(--mid);
        }
      </style>
      <div class="project-header">
        <span class="project-title">${title}</span>
        ${status ? `<span class="project-status">${status}</span>` : ''}
      </div>
      <div class="project-meta">
        ${type ? `<span class="project-type">${type}</span>` : ''}
        ${stack ? `<span>${stack}</span>` : ''}
      </div>
      ${description ? `<div class="project-description">${description}</div>` : ''}
      <div class="project-links">
        ${github ? `<a href="${github}" target="_blank" rel="noopener">github →</a>` : ''}
        ${url ? `<a href="${url}" target="_blank" rel="noopener">site →</a>` : ''}
      </div>
    `;
  }
}

customElements.define('ep-project-card', EpProjectCard);
