---
title: "Enrico Piovesan — Platform Software Architect at Autodesk"
description: Platform Software Architect at Autodesk, author of Universal Microservices Architecture (Apress), and originator of the C-DAD framework. Based in Golden, BC, Canada.
layout: about.njk
sectionGroup: about
breadcrumb:
  - label: About
permalink: /about/
canonical: https://enricopiovesan.com/about/
ogTitle: About Enrico Piovesan
ogDescription: Platform Software Architect at Autodesk, author of Universal Microservices Architecture (Apress), and originator of the C-DAD framework.
ogImage: og-about.png
name: Enrico Piovesan
role: Platform Software Architect
employer: Autodesk
location: Golden, BC, Purcell Mountains, Canada
tagline: Platform architect. Author. Open source builder.
links:
  - label: GitHub
    url: https://github.com/enricopiovesan
  - label: LinkedIn
    url: https://linkedin.com/in/enricopiovesan
  - label: Medium
    url: https://blog.enricopiovesan.com
  - label: X
    url: https://x.com/enricopiovesan
  - label: UMA
    url: https://www.universalmicroservices.com
---

Software should work for users, not for the runtime it happens to run on.

I spent years building products across startups in travel, education, and payments. Good teams, real users, hard deadlines. And the same problems kept showing up regardless of the company or the stack. Business logic rewritten for every new runtime. Systems that worked in isolation and fell apart at the boundaries. Codebases that only made sense to the people who built them, and only for as long as those people stayed.

At some point I stopped treating those as facts of life and started asking why they kept happening. The answer, most of the time, was that the architecture had been designed for the environment instead of the problem.

## What I work on

The frameworks I have developed address two structural problems that keep showing up in different forms.

[Universal Microservices Architecture (UMA)](/uma/) is the answer to the portability problem. Why should the same business logic exist in five different forms across browser, backend, edge, and AI pipeline? UMA separates what a capability does from where it runs. The same capability executes across any runtime — browser, edge, cloud, AI agent — packaged as a portable, contract-bound unit compiled to WebAssembly. It is the architectural model behind [the book published by Apress](https://www.amazon.com/dp/B0GTTTTQH4) and the live reference application at [universalmicroservices.com](https://www.universalmicroservices.com).

[Contract-Driven AI Development (C-DAD)](/c-dad/) is the answer to the navigability problem. Why can AI agents describe what software does but not why it does it — and why does that gap produce bugs nobody planned for? C-DAD makes software legible to AI agents by declaring intent through machine-enforceable contracts rather than leaving it implicit in code. It is the model behind the forthcoming book [The Day After](/books/) and the [the-day-after-toolkit](https://github.com/enricopiovesan/the-day-after-toolkit) CLI.

Both frameworks came from real problems I could not stop thinking about. They are documented in white papers, implemented in open source tools, and tested in production.

## Published work

**Books**
- *[Universal Microservices Architecture](https://www.amazon.com/dp/B0GTTTTQH4)* — Apress, 2024. 13 runnable chapters in Rust and WebAssembly. 100% business logic coverage enforced in CI.
- *The Day After* — Apress, forthcoming. Restructuring software organizations for the age of AI agents.

**White papers** — four research papers published 2023–2025: [CSMA](/whitepapers/csma/), [UMA](/whitepapers/uma/), [ECCA](/whitepapers/ecca/), [C-DAD](/whitepapers/c-dad/).

**Open source** — [UMA-code-examples](https://github.com/enricopiovesan/UMA-code-examples), [the-day-after-toolkit](https://github.com/enricopiovesan/the-day-after-toolkit), [Traverse](https://github.com/enricopiovesan/Traverse), [youaskm3](https://github.com/youaskm3/youaskm3).

## Background

I am a Platform Software Architect at Autodesk. Before that I spent four years as a Domain Software Architect at Ford, and before that I co-founded companies in travel, education, and payments. I moved from Italy to Canada about ten years ago and ended up in Golden, BC, which is a small town in the Purcell Mountains with exceptional snow. I am a certified ski instructor and a ski patroller. I have two daughters who think the word monolith is scary, and I have not corrected them. I still make real carbonara. No cream, no shortcuts.

I do not believe in work life balance. I believe in seasons. This is mine to give everything.
