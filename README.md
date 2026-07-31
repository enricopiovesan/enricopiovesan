# Enrico Piovesan

After years building products for real users across startups in travel, education, and payments, I kept running into the same problems. Business logic rewritten for every runtime. Codebases that no one could navigate. Systems that worked in isolation but broke at the seams. I stopped accepting those as facts of life and started building frameworks to fix them.

That's where UMA, C-DAD, and Traverse came from. Not from theory. From real problems that kept showing up.

---

## Problems I work on

**Business logic gets rewritten for every runtime — browser, backend, edge, AI pipeline.**
Most architectures assume the environment too early. The same logic ends up duplicated four or five times across a codebase, and teams pay that cost forever.

→ **[Universal Microservices Architecture (UMA)](https://www.universalmicroservices.com/)** — a portable, contract-driven execution model for distributed systems. Write once, run where it makes sense.
→ **[UMA-code-examples](https://github.com/enricopiovesan/UMA-code-examples)** — 10 chapters of runnable Rust/WASM code. 100% business logic coverage enforced in CI. Live reference app.
→ **[Book on Amazon](https://www.amazon.com/dp/B0GTTTTQH4)** — the full model, the tradeoffs, and the design sequence behind it.

---

**Most codebases aren't navigable by AI agents — not because the AI is bad, but because the code has no contracts.**
Tribal knowledge is locked in people's heads. There's no map. Agents guess, hallucinate, and break things. The fix isn't more prompting. It's better structure.

→ **[the-day-after-toolkit](https://github.com/enricopiovesan/the-day-after-toolkit)** — a CLI (`cdad`) that audits codebase agent-readiness and scaffolds the contracts needed to fix it.
→ **[The Day After AI](https://thedayafteraibook.com)**: forthcoming from Apress. Contract signed, manuscript complete. Making software companies legible to AI agents.
→ **[C-DAD white paper](https://enricopiovesan.com/whitepapers/c-dad/)**: verifiable contracts, automated reasoning, hybrid governance.

---

## What I'm building now

**[Traverse](https://traverse-framework.com)**: a contract-driven Rust/WASM runtime for discovering, validating, and composing portable business capabilities. Shipped at v0.8.1, Apache 2.0, open source. 9 crates, 73 governing specs, MCP integration, and a registry at [registry.traverse-framework.com](https://registry.traverse-framework.com). Code lives at [github.com/traverse-framework/traverse](https://github.com/traverse-framework/traverse).

**[youaskm3](https://github.com/enricopiovesan/youaskm3)** — a WASM-native, MCP-powered personal knowledge layer. Runs entirely on GitHub Pages. No server, no database, no cost. Federation model so anyone can fork and run their own instance.

---

## Writing

Five years of thinking about portable systems, AI-native architecture, and contract-driven development. In white papers and two active Medium publications.

| Date | Paper |
|---|---|
| Nov 2025 | [Contract-Driven AI Development (C-DAD)](https://enricopiovesan.com/whitepapers/c-dad/) |
| Aug 2025 | [Event Contract Catalog Architecture (ECCA)](https://enricopiovesan.com/whitepapers/ecca/) |
| Aug 2024 | [Universal Microservices Architecture (UMA)](https://enricopiovesan.com/whitepapers/uma/) |
| Jun 2023 | [Client-Side Microservices Architecture (CSMA)](https://enricopiovesan.com/whitepapers/csma/) |

**Medium:** [Mastering Software Architecture for the AI Era](https://medium.com/software-architecture-in-the-age-of-ai) (Wednesdays) · [The Rise of Device-Independent Architecture](https://medium.com/the-rise-of-device-independent-architecture) (Fridays)

---

## Claude Code Skills

Reusable, structured workflows for Claude Code. Each skill encodes a repeatable process — what to research, how to structure the output, what quality checks to run — so complex tasks stay consistent across sessions.

→ **[skills/](https://github.com/enricopiovesan/enricopiovesan/tree/main/skills)** — full index with parameters and trigger phrases.

| Skill | What it does |
|---|---|
| [topic-signal-report](https://github.com/enricopiovesan/enricopiovesan/blob/main/skills/topic-signal-report/SKILL.md) | Multi-source signal report on any topic: GitHub, YouTube, Hacker News, arXiv, releases, and practitioner blogs |

---

## Speaking

I talk about portable systems, contract-driven AI development, and what it actually takes to restructure software for the age of AI agents. Drawn directly from the books, white papers, and shipped tooling above.

Three topics I'm currently submitting to conferences:

- **"Write Once, Run Where It Makes Sense"** — the architecture of portable business logic with WASM and UMA. Architecture and platform engineering tracks.
- **"Contract-Driven AI Development"** — how verifiable contracts change how we build AI-assisted systems. AI engineering tracks.
- **"The Day After AI: Making Software Companies Legible to AI Agents"**: practical patterns for making codebases navigable by AI agents. Engineering leadership tracks.

---

I'm a Software Architect at Autodesk by day. I moved from Italy to Canada about ten years ago and ended up in Golden, BC. Purcell Mountains, population small, snow quality excellent. I'm a certified ski instructor. When there's fresh snow, everything else waits.

The Day After AI is forthcoming from Apress. Traverse is live at [traverse-framework.com](https://traverse-framework.com). youaskm3 is in progress.

**[enricopiovesan.com](https://enricopiovesan.com)** · **[thedayafteraibook.com](https://thedayafteraibook.com)** · **[LinkedIn](https://linkedin.com/in/enricopiovesan)** · **[Medium](https://medium.com/@enricopiovesan)** · **[X](https://x.com/enricopiovesan)**
