---
title: Open Source Architecture Projects
description: Four open source projects by Enrico Piovesan including UMA, C-DAD toolkit, Traverse runtime, and youaskm3 knowledge layer.
layout: projects.njk
permalink: /projects/
canonical: https://enricopiovesan.com/projects/
ogTitle: Projects
ogDescription: Four open source projects built from the UMA and C-DAD frameworks. Spec-governed, CI-enforced, production-grade.
intro: I do not believe in separating thinking from building. The frameworks and papers mean nothing if I cannot show them working in real code. Seniority used to be a reason to step back from the hands-on work. With AI in the picture that era is over. Every project here exists because I needed to prove something to myself, not to anyone else.
projects:
  - title: UMA-code-examples
    type: Book companion
    stack: Rust, WASM, HTML, JS
    status: published
    description: The companion repository to the Universal Microservices Architecture book. Thirteen chapters of runnable Rust and WASM code that follow the book chapter by chapter. Every business logic path has test coverage enforced in CI. Not because it was required but because a book about portable, contract-driven distributed systems that ships with untested code would be embarrassing. There is a live reference application running at universalmicroservices.com that anyone can inspect.
    github: https://github.com/enricopiovesan/UMA-code-examples
    url: https://www.universalmicroservices.com
  - title: the-day-after-toolkit
    type: CLI tool
    stack: TypeScript
    status: in progress
    description: The companion tooling to The Day After book. A CLI called cdad that audits a codebase for AI agent readiness and scaffolds the contracts needed to fix what it finds. Six commands. OpenSpec-governed. Configs included for Claude, Cursor, and Codex so the tool works with the agents most teams are actually using. The book explains the thinking. This tool lets you run it against a real codebase today.
    github: https://github.com/enricopiovesan/the-day-after-toolkit
  - title: Traverse
    type: Runtime / research
    stack: Rust
    status: pre-implementation
    description: Traverse is where the UMA and C-DAD ideas go further. A contract-driven Rust and WASM runtime for discovering, validating, and composing portable business capabilities across multi-agent orchestration scenarios. The spec is governed, the quality standards are in place, and the ADR process is documented before a single line of implementation is written. That is not bureaucracy. That is the only way to build a runtime that stays coherent as it grows. Pre-implementation means the foundation is right, not that the work has not started.
    github: https://github.com/enricopiovesan/Traverse
  - title: youaskm3
    type: Personal knowledge layer
    stack: Rust, WASM, Web Components, PWA
    status: in progress (M0)
    description: A personal knowledge layer built on the same foundations as Traverse and UMA. WASM-native, MCP-powered, designed to work with agentic systems. Runs entirely on GitHub Pages with no server, no database, and no ongoing cost. The federation model means anyone can fork it, run their own instance, and register in a shared registry. It is an attempt to build something that reflects what I actually believe about software — portable, composable, owned by the person running it, and free to operate.
    github: https://github.com/youaskm3/youaskm3
---
