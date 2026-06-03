class EpProjectCard extends HTMLElement {
  static get observedAttributes() { return ['title', 'description', 'url', 'github', 'status']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const title = this.getAttribute('title') || '';
    const description = this.getAttribute('description') || '';
    const url = this.getAttribute('url') || '';
    const github = this.getAttribute('github') || '';
    const status = this.getAttribute('status') || '';

    this.innerHTML = `
      <style>
        ep-project-card {
          display: block;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          margin-bottom: var(--space-sm);
          transition: border-color 0.15s;
        }
        ep-project-card:hover {
          border-color: var(--mid);
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
          color: var(--white);
        }
        .project-status {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--mid);
          flex-shrink: 0;
        }
        .project-description {
          font-size: 0.9375rem;
          color: var(--mid);
          margin-bottom: var(--space-sm);
          line-height: 1.5;
        }
        .project-links {
          display: flex;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }
        .project-links a {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--accent);
          text-decoration: none;
        }
        .project-links a:hover {
          text-decoration: underline;
        }
      </style>
      <div class="project-header">
        <span class="project-title">${title}</span>
        ${status ? `<span class="project-status">${status}</span>` : ''}
      </div>
      ${description ? `<div class="project-description">${description}</div>` : ''}
      <div class="project-links">
        ${url ? `<a href="${url}" target="_blank" rel="noopener">site ↗</a>` : ''}
        ${github ? `<a href="${github}" target="_blank" rel="noopener">github ↗</a>` : ''}
      </div>
    `;
  }
}

customElements.define('ep-project-card', EpProjectCard);
