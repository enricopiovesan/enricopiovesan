---
title: Software Architecture Books, Papers & Projects
description: Published books, research white papers, and open source tools from Enrico Piovesan — covering UMA, C-DAD, portable systems, and AI-native software architecture.
layout: page.njk
permalink: /work/
canonical: https://enricopiovesan.com/work/
ogTitle: Work
ogDescription: Books, white papers, and open source projects by Enrico Piovesan.
---

Everything here came from the same starting point: a problem that kept showing up in different companies, different stacks, and different teams, and a decision that the answer had to be architectural rather than incidental. The books, papers, and tools are all attempts to make that answer concrete and usable.

## [Books](/books/)

Two books on software architecture and AI-native systems. The first, *[Universal Microservices Architecture](https://www.amazon.com/dp/B0GTTTTQH4)*, is published by Apress. It covers the full UMA model across 13 runnable chapters in Rust and WebAssembly, with 100% business logic coverage enforced in CI and a live reference application at universalmicroservices.com. It is the only book that treats runtime portability as an architectural primitive rather than a deployment convenience. The second, *The Day After*, is forthcoming from Apress. It builds the organizational model for restructuring software teams for the age of AI agents — role by role, using C-DAD as its structural foundation. Both books are grounded in the same conviction: that the problems most teams attribute to people or process are actually architectural.

## [White Papers](/whitepapers/)

Four research papers published between 2023 and 2025, each addressing a specific structural problem that the industry was either ignoring or solving incompletely. [CSMA (2023)](/whitepapers/csma/) applied service-oriented thinking to the browser and asked why frontend logic kept getting duplicated instead of packaged. [UMA (2024)](/whitepapers/uma/) extended that question to every runtime in the stack and introduced the portable execution model. [ECCA (2025)](/whitepapers/ecca/) addressed event governance — the gap between schema registries and actual contract-level accountability for event-driven systems. [C-DAD (2025)](/whitepapers/c-dad/) defined how AI agents can navigate software through machine-enforceable contracts rather than code. Each paper is freely available. Each one is also the foundation of shipped tooling or a published book.

## [Projects](/projects/)

Four open source projects, each built to prove that the frameworks work in running code. [UMA-code-examples](https://github.com/enricopiovesan/UMA-code-examples) provides 13 chapters of runnable Rust and WASM implementations from the book — every claim tested in CI. [the-day-after-toolkit](https://github.com/enricopiovesan/the-day-after-toolkit) is a CLI that audits codebases for AI agent readiness and scaffolds the contracts needed to fix what it finds — configured out of the box for Claude, Cursor, and Codex. [Traverse](https://github.com/enricopiovesan/Traverse) is a contract-driven Rust and WASM runtime for multi-agent orchestration scenarios, built spec-first before a line of implementation was written. [youaskm3](https://github.com/youaskm3/youaskm3) is a personal knowledge layer that runs entirely on GitHub Pages with no server and no ongoing cost. All four are governed by OpenSpec contracts and CI-enforced quality gates.
