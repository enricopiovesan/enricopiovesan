---
title: Enrico Piovesan
description: Platform architect and author building frameworks for software that runs anywhere and codebases that AI agents can actually navigate.
layout: home.njk
permalink: /
canonical: https://enricopiovesan.com/
ogTitle: Enrico Piovesan
ogDescription: Platform architect and author building frameworks for software that runs anywhere and codebases that AI agents can actually navigate.
ogImage: og-default.png
tagline: "Software should work for users, not for the runtime it happens to run on."
intro: "After years building products across startups and enterprise platforms, from travel and payments to automotive and design software at global scale, I kept hitting the same wall. The same business logic rewritten for every environment. Systems that worked in isolation and broke at the seams. Codebases nobody could navigate when the team changed. I stopped accepting those as facts of life and started building frameworks to fix them."
work:
  - label: Books
    href: /books/
    desc: Two books. One on making software run anywhere without rewriting it. One on making software navigable by AI agents without throwing it away.
  - label: White Papers
    href: /whitepapers/
    desc: Four research papers from 2023 to 2025. Each one started as a problem I could not stop thinking about.
  - label: Projects
    href: /projects/
    desc: Four open source projects built from the same frameworks. Spec-governed, CI-enforced, running in production.
  - label: Writing
    href: /writing/
    desc: Weekly posts on Medium since May 2025. Posts become papers. Papers become books.
  - label: Speaking
    href: /speaking/
    desc: Three conference talks drawn from published work and shipped tooling.
frameworks:
  - name: Universal Microservices Architecture
    abbr: UMA
    abbr_title: Universal Microservices Architecture
    href: /uma/
    desc: A portable, contract-driven execution model for distributed systems. Business logic defined once, deployed anywhere. Write once, run where it makes sense.
  - name: Contract-Driven AI Development
    abbr: C-DAD
    abbr_title: Contract-Driven AI Development
    href: /c-dad/
    desc: A framework for building AI-native systems where contracts, not code, define what software does and why it can be trusted by AI agents.
opensource:
  - name: Traverse
    stack: Rust / WASM
    href: https://github.com/enricopiovesan/Traverse
    desc: A contract-driven Rust and WASM runtime for discovering, validating, and composing portable business capabilities across multi-agent orchestration scenarios.
  - name: youaskm3
    stack: Rust / WASM / PWA
    href: https://github.com/youaskm3/youaskm3
    desc: A personal knowledge layer built on UMA foundations. WASM-native, MCP-powered, designed to work with agentic systems. Runs on GitHub Pages with no server or database.
---
