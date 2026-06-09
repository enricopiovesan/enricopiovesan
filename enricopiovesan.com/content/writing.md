---
title: Software Architecture Writing on Medium
description: Two weekly Medium series on software architecture and AI-native systems — one covering C-DAD and agentic patterns, one covering UMA, WebAssembly, and portable systems.
layout: writing.njk
permalink: /writing/
canonical: https://enricopiovesan.com/writing/
ogTitle: Writing
ogDescription: Weekly writing on software architecture, WASM, and AI-native systems. Two Medium publication series.
intro:
  - I started writing to think, not to publish. A post is usually me trying to work out whether an idea holds up when I write it down. Sometimes it does not and I learn something. Sometimes it does and it becomes the seed of a white paper. Some of the white papers eventually became a book. I am not sure that is a writing strategy. It is just what happened.
  - I have been at this for a short time and I am still figuring it out. What I do know is that if you want to understand something deeply you have to force yourself to write about it and build it. The writing makes the thinking visible. The building makes the thinking honest. The published artifact is almost a bonus. The real value is in what you learned getting there.
series:
  - name: Mastering Software Architecture for the AI Era
    cadence: Wednesdays
    url: https://medium.com/software-architecture-in-the-age-of-ai
    description: This is where the C-DAD thinking lives. Posts about contract-driven development, AI-native architecture, what it actually takes to make software organizations ready for agentic systems, and the patterns that keep showing up when that goes wrong. The writing here tends to be more conceptual. It is me trying to figure out what the next version of software architecture looks like when AI agents are a real part of the system.
    recent:
      - title: "Read on Medium →"
        url: https://medium.com/software-architecture-in-the-age-of-ai
  - name: The Rise of Device-Independent Architecture
    cadence: Fridays
    url: https://medium.com/the-rise-of-device-independent-architecture
    description: This is where the UMA thinking lives. Posts about WebAssembly, portable systems, device-independent architecture, and what it means to design software that runs where it makes sense instead of where the stack happens to put it. The writing here tends to be more technical. It is me working through the ideas that ended up in the book and the companion repository.
    recent:
      - title: "Inside a Universal Microservice: Contracts, WASM, and the Registry"
        url: https://medium.com/the-rise-of-device-independent-architecture/inside-a-universal-microservice-architecture-uma-bb04cf6343ac
      - title: "Read on Medium →"
        url: https://medium.com/the-rise-of-device-independent-architecture
profile_url: https://blog.enricopiovesan.com
note: The follower counts on these publications are small. The ideas are not. If something resonates, the best thing you can do is read it and share it with someone who would find it useful.
---

## What the writing covers

The two series cover the same underlying problem from different angles. One is more conceptual — the organizational and architectural shifts required when AI agents become part of software teams. The other is more technical — the execution model, the tooling, and the concrete decisions that make software portable and agent-navigable.

**Mastering Software Architecture for the AI Era** covers contract-driven development, AI-native architecture, agentic systems design, and what software organizations need to change structurally when AI agents move from tools to participants. Topics include: how to design software that AI agents can reason about (not just execute), why context engineering alone is insufficient, what makes a codebase agent-ready versus agent-adjacent, and how governance changes when humans and machines share authorship of software decisions. This is the C-DAD thinking developed in writing before it became a white paper or a book.

**The Rise of Device-Independent Architecture** covers WebAssembly, portable runtime design, Universal Microservices Architecture, and what it means to separate business logic from execution environment at the architectural level. Topics include: how to structure a universal microservice, what the contract-runtime interface looks like in practice, how WASM changes the deployment model for distributed systems, and why portability needs to be an architectural first-class property rather than a build-time configuration. This is the UMA thinking — from the early pattern recognition through to the design decisions that ended up in the book.

Posts appear weekly. The series that precedes papers and books is usually the one where ideas are still being stress-tested. If a post changes your thinking, the white paper behind it has the formal model.
