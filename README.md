# Enrico Piovesan

After years building products for real users across startups in travel, education, and payments, I kept running into the same problems — business logic rewritten for every runtime, codebases that no one could navigate, systems that worked in isolation but broke at the seams. I stopped accepting those as facts of life and started building frameworks to fix them.

That's where UMA, C-DAD, and Traverse came from. Not from theory — from real problems that kept showing up.

---

## Problems I work on

**Business logic gets rewritten for every runtime — browser, backend, edge, AI pipeline.**
Most architectures assume the environment too early. The same logic ends up duplicated four or five times across a codebase, and teams pay that cost forever.

→ **[Universal Microservices Architecture (UMA)](https://www.universalmicroservices.com/)** — a portable, contract-driven execution model for distributed systems. Write once, run where it makes sense.
→ **[UMA-code-examples](https://github.com/enricopiovesan/UMA-code-examples)** — 13 chapters of runnable Rust/WASM code. 100% business logic coverage enforced in CI. Live reference app.
→ **[Book on Amazon](https://www.amazon.com/dp/B0GTTTTQH4)** — the full model, the tradeoffs, and the design sequence behind it.

---

**Most codebases aren't navigable by AI agents — not because the AI is bad, but because the code has no contracts.**
Tribal knowledge is locked in people's heads. There's no map. Agents guess, hallucinate, and break things. The fix isn't more prompting — it's better structure.

→ **[the-day-after-toolkit](https://github.com/enricopiovesan/the-day-after-toolkit)** — a CLI (`cdad`) that audits codebase agent-readiness and scaffolds the contracts needed to fix it. On npm today.
→ **The Day After** — the book behind the toolkit. Currently in negotiation with Apress.
→ **[C-DAD white paper](https://drive.google.com/file/d/1HC_ZWJl9aYaMeN78qiL3ZYBVY7mAGl3f/view)** — Contract-Driven AI Development: verifiable contracts, automated reasoning, hybrid governance.

---

## What I'm building now

**[Traverse](https://github.com/enricopiovesan/Traverse)** — a contract-driven Rust/WASM runtime for discovering, validating, and composing portable business capabilities. Pre-implementation, spec-governed, personal R&D.

**[youaskm3](https://github.com/youaskm3/youaskm3)** — a WASM-native, MCP-powered personal knowledge layer. Runs entirely on GitHub Pages — no server, no database, no cost. Federation model so anyone can fork and run their own instance.

---

## Writing

Five years of thinking about portable systems, AI-native architecture, and contract-driven development — in white papers and two active Medium publications.

| Date | Paper |
|---|---|
| Nov 2025 | [Contract-Driven AI Development (C-DAD)](https://drive.google.com/file/d/1HC_ZWJl9aYaMeN78qiL3ZYBVY7mAGl3f/view) |
| Aug 2025 | [Event Contract Catalog Architecture (ECCA)](https://docs.google.com/document/d/1hpyLDZg9c1Od3vycR7GHIcxuCriWeiAxDFyCbb0h6Ro/edit) |
| Jun 2025 | [Designing Adaptive AI Systems with UMA and MCP](https://medium.com/software-architecture-in-the-age-of-ai) |
| Aug 2024 | [Universal Microservices Architecture (UMA)](https://docs.google.com/document/d/1MHj8ruFsGsZTNfMayP9Xck2qAMnXu-qfjTs0zWjP8OE/edit) |
| Jun 2023 | [Client-Side Microservices Architecture (CSMA)](https://drive.google.com/file/d/1OKA_0HSFym2JkKPujx8vQdxFfzNJlw0-/view) |

**Medium:** [Mastering Software Architecture for the AI Era](https://medium.com/software-architecture-in-the-age-of-ai) (Wednesdays) · [The Rise of Device-Independent Architecture](https://medium.com/the-rise-of-device-independent-architecture) (Fridays)

---

## Speaking

I talk about portable systems, contract-driven AI development, and what it actually takes to restructure software for the age of AI agents — drawn directly from the books, white papers, and shipped tooling above.

Three topics I'm currently submitting to conferences:

- **"Write Once, Run Where It Makes Sense"** — the architecture of portable business logic with WASM and UMA. Architecture and platform engineering tracks.
- **"Contract-Driven AI Development"** — how verifiable contracts change how we build AI-assisted systems. AI engineering tracks.
- **"The Day After: Restructuring Software for the Age of AI Agents"** — practical patterns for making codebases navigable by AI agents. Engineering leadership tracks.

---

I'm a Software Architect at Autodesk by day. I moved from Italy to Canada about ten years ago and ended up in Golden, BC — Purcell Mountains, population small, snow quality excellent. I'm a certified ski instructor. When there's fresh snow, everything else waits.

The Day After with Apress and Traverse are next. youaskm3 is in progress.

**[enricopiovesan.com](https://enricopiovesan.com)** · **[LinkedIn](https://linkedin.com/in/enricopiovesan)** · **[Medium](https://medium.com/@enricopiovesan)** · **[X](https://x.com/enricopiovesan)**
