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
  - id: community-projects
    label: Community projects
  - id: patrol-toolkit
    label: Patrol Toolkit
intro: I do not believe in separating thinking from building. The frameworks and papers mean nothing if I cannot show them working in real code. Seniority used to be a reason to step back from the hands-on work. With AI in the picture that era is over.
projects:
  - title: Traverse
    id: traverse
    type: Runtime / research
    stack: Rust
    status: in progress
    description: Traverse is where the UMA and C-DAD ideas go further. A contract-driven Rust and WASM runtime for discovering, validating, and composing portable business capabilities across multi-agent orchestration scenarios. The spec is governed, the quality standards are in place, and the ADR process is documented before a single line of implementation is written. That is not bureaucracy. That is the only way to build a runtime that stays coherent as it grows.
    github: https://github.com/enricopiovesan/Traverse
  - title: youaskm3
    id: youaskm3
    type: Personal knowledge layer
    stack: Rust, WASM, Web Components, PWA
    status: in progress
    description: A personal knowledge layer built on the same foundations as Traverse and UMA. WASM-native, MCP-powered, designed to work with agentic systems. Runs entirely on GitHub Pages with no server, no database, and no ongoing cost. The federation model means anyone can fork it, run their own instance, and register in a shared registry.
    github: https://github.com/youaskm3/youaskm3
community:
  - title: Patrol Toolkit
    id: patrol-toolkit
    type: Community tool
    stack: ""
    status: in progress
    description: A side project for the ski patrol community. Not architecture-driven. Just something useful built for the people who do the work on the mountain.
    github: https://github.com/enricopiovesan/Patrol-Toolkit
---
