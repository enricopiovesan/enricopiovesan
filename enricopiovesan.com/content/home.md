---
title: Enrico Piovesan — Platform Architect and Author
description: Platform architect and author building frameworks for software that runs anywhere and codebases that AI agents can actually navigate.
layout: home.njk
permalink: /
canonical: https://enricopiovesan.com/
ogTitle: Enrico Piovesan
ogDescription: Platform architect and author building frameworks for software that runs anywhere and codebases that AI agents can actually navigate.
hero: Software should work for users, not for the runtime it happens to run on.
intro:
  - After years building products across startups in travel, education, and payments, I kept hitting the same wall. The same business logic rewritten for every environment. Systems that worked in isolation and broke at the seams. Codebases nobody could navigate when the team changed. I stopped accepting those as facts of life and started building frameworks to fix them.
  - That is where UMA came from. Then C-DAD. Then Traverse. Not from theory. From real problems that kept showing up.
nav_cards:
  - label: Books
    desc: Two books. One on making software run anywhere without rewriting it. One on making software navigable by AI agents without throwing it away.
    href: /books/
  - label: White Papers
    desc: Four research papers from 2023 to 2025. Each one started as a problem I could not stop thinking about.
    href: /whitepapers/
  - label: Projects
    desc: Four open source projects built from the same frameworks. Spec-governed, CI-enforced, and running in production or pre-implementation with quality standards in place.
    href: /projects/
  - label: Writing
    desc: Weekly posts on Medium since May 2025. Posts become papers. Papers become books. Writing is how I figure out what I think.
    href: /writing/
  - label: Speaking
    desc: Three conference talks drawn directly from published work and shipped tooling. Currently submitting CFPs for architecture, WASM, and AI engineering tracks.
    href: /speaking/
bio: "Platform Software Architect at Autodesk. Author of Universal Microservices Architecture (Apress). Based in Golden, BC, Canada. Two books, four research papers, four open source projects."
about_href: /about/
---

## The frameworks

Two architectural frameworks, each developed to address a structural problem that kept appearing in different companies with different stacks.

[Universal Microservices Architecture (UMA)](/uma/) addresses the portability problem. Most distributed systems treat the runtime as an assumption baked into the architecture — a backend service assumes a server, a browser component assumes a browser, an edge function assumes a CDN. When AI pipelines became part of the stack, teams discovered they had to rewrite the same business logic for a fourth environment. UMA inverts that assumption. Business logic is defined once as a portable, contract-bound unit compiled to WebAssembly and deployed to any runtime — browser, edge, cloud, or AI pipeline — without modification. The runtime becomes a deployment decision, not an architectural one. The [Apress book](https://www.amazon.com/dp/B0GTTTTQH4) covers the full model across 13 runnable chapters in Rust and WASM.

[Contract-Driven AI Development (C-DAD)](/c-dad/) addresses the navigability problem. AI agents can read code and infer behavior. What they cannot do is reason about why a system is designed the way it is, which constraints are load-bearing, and which invariants must never be violated. Without that information, agents produce output that looks correct and fails at the boundary — not with a visible error, but with a plausible result that violates a constraint nobody declared. C-DAD replaces implicit intent with machine-enforceable contracts that agents can validate against before anything executes. The forthcoming book [The Day After](/books/) covers how to restructure software organizations around this model.

Both frameworks have white papers, open source tooling, and conference talks behind them. All of it is on this site.
