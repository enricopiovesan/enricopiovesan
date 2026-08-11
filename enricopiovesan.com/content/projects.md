---
title: Open Source Projects
description: Open source projects by Enrico Piovesan. Architecture projects and community tools.
layout: projects.njk
sectionGroup: work
breadcrumb:
  - href: /work/
    label: Work
  - label: Projects
permalink: /projects/
canonical: https://enricopiovesan.com/projects/
ogTitle: Projects
ogDescription: Open source projects built from the UMA and C-DAD frameworks, and community tools.
toc:
  - id: architecture-projects
    label: Architecture projects
  - id: traverse
    label: Traverse
  - id: youaskm3
    label: youaskm3
  - id: the-day-after-toolkit
    label: the-day-after-toolkit
  - id: uma-code-examples
    label: UMA-code-examples
  - id: community-projects
    label: Community projects
  - id: patrol-toolkit
    label: Patrol Toolkit
intro: I do not believe in separating thinking from building. The frameworks and papers mean nothing if I cannot show them working in real code. Seniority used to be a reason to step back from the hands-on work. With AI in the picture that era is over.
projects:
  - title: Traverse
    id: traverse
    type: Contract-driven WASM runtime
    stack: Rust
    status: v0.8.1 · Apache 2.0 · Open source
    description: "A contract-driven Rust and WASM runtime for discovering, validating, and composing portable business capabilities. Each capability is sandboxed in Wasmtime and governed by a machine-readable contract that declares preconditions, postconditions, and invariants. Nothing executes without a verified contract, and every execution produces a trace artifact. AI agents discover and call capabilities safely through an MCP stdio server, and the registry at registry.traverse-framework.com makes capabilities discoverable across projects. Built spec-first throughout, with 73 governing specs and merge-gating CI that fails if the implementation drifts from the approved spec. The live implementation of both UMA and C-DAD working together in production. 9 crates, 6 runnable domain examples, and full documentation, quickstart, blog, and changelog at traverse-framework.com. Not affiliated with Autodesk."
    github: https://github.com/traverse-framework
    url: https://traverse-framework.com
  - title: youaskm3
    id: youaskm3
    type: Personal knowledge layer
    stack: Rust, WASM, Web Components, PWA
    status: in progress
    description: "A personal knowledge layer that makes everything you have read, written, and built queryable as a connected graph — running entirely on infrastructure you own. WASM-native, MCP-powered, designed to work with agentic systems. Runs entirely on GitHub Pages with no server, no database, and no ongoing cost. The federation model means anyone can fork it, run their own instance, and register in a shared registry without depending on a central authority."
    github: https://github.com/youaskm3/youaskm3
  - title: the-day-after-toolkit
    id: the-day-after-toolkit
    type: CLI / developer tooling
    stack: TypeScript
    status: in progress
    description: "Audits a codebase for AI agent readiness and scaffolds the contracts needed to make it navigable, turning the ideas in The Day After AI into something a team can run against their own code today. Six commands covering audit and scaffolding. OpenSpec-governed. Ships with configuration for Claude, Cursor, and Codex so it fits directly into the agent workflows teams are already using. Built and functional, not yet published to npm."
    github: https://github.com/enricopiovesan/the-day-after-toolkit
  - title: UMA-code-examples
    id: uma-code-examples
    type: Reference implementation
    stack: Rust, WASM
    status: active
    description: "The working reference implementation for the UMA book. 13 chapters of runnable Rust and WASM code with 100% business logic test coverage enforced in CI. Every concept in the book has corresponding runnable code — the live reference application at universalmicroservices.com is the same code described in the book, not a simplified demo. Dual MIT and Apache 2.0 licensed."
    github: https://github.com/enricopiovesan/UMA-code-examples
community:
  - title: Patrol Toolkit
    id: patrol-toolkit
    type: Community tool
    stack: ""
    status: in progress
    description: A side project for the ski patrol community. Not architecture-driven. Just something useful built for the people who do the work on the mountain.
    github: https://github.com/enricopiovesan/Patrol-Toolkit
---
