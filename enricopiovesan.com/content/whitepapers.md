---
title: White Papers — Enrico Piovesan
description: Five research papers on software architecture, AI-native systems, contract-driven development, and agentic systems published between 2023 and 2025.
layout: whitepapers.njk
permalink: /whitepapers/
canonical: https://enricopiovesan.com/whitepapers/
ogTitle: White Papers — Enrico Piovesan
ogDescription: Five research papers on software architecture, AI-native systems, and contract-driven development published between 2023 and 2025.
intro: I am not an academic. These papers did not come from a research agenda. They came from problems I could not stop thinking about. After enough years in this industry you start recognizing patterns, the same structural failure showing up in different companies with different stacks and different teams. When a pattern bothers me enough and I cannot find a satisfying answer anywhere, I eventually write one down. That is where all of these came from.
papers:
  - title: Contract-Driven AI Development (C-DAD)
    date: November 2025
    description: Most of the conversation about AI in software development focuses on what the models can do. This paper focuses on what the codebase needs to provide. AI agents and agentic systems can navigate software that declares its intent through contracts. They struggle with software that only has code. C-DAD introduces a foundation for building AI-native systems where contracts, not code, define collaboration between humans, machines, and runtimes. It covers verifiable contracts, automated reasoning, and hybrid governance as a coherent approach to making codebases that AI agents can actually work with.
    page: /whitepapers/c-dad/
    url: /whitepapers/Contract-Driven AI Development (C-DAD) - White Paper.pdf
    image: /src/assets/img/c-dad-paper.png
  - title: Event Contract Catalog Architecture (ECCA)
    date: August 2025
    description: Event-driven architectures have a governance problem that schema registries and API management platforms were not designed to solve. Events cross team boundaries, service boundaries, and time boundaries. Without a way to make them discoverable, governable, and consistent at scale, they become a source of invisible coupling that compounds over years. ECCA is a blueprint for an event contract catalog that treats events as first-class architectural artifacts with declared contracts, ownership, and lifecycle.
    page: /whitepapers/ecca/
    url: /whitepapers/Event Contract Catalog Architecture (ECCA) - White Paper.pdf
    image: /src/assets/img/ecca-paper.png
  - title: Designing Adaptive AI Systems with UMA and MCP
    date: June 2025
    description: As AI agents became a real part of software systems, the question of how they participate in a UMA architecture needed a concrete answer. This paper explores how Universal Microservices Architecture and the Model Context Protocol combine to produce AI systems that can adapt to changing requirements without structural rewrites. The key idea is that agents should be able to propose and rank, while the runtime stays authoritative over validation, policy, and final execution.
    page: /whitepapers/uma-mcp/
    image: /src/assets/img/uma-paper.png
  - title: Universal Microservices Architecture (UMA)
    date: August 2024
    description: The foundational paper introducing UMA as a portable, contract-based execution model for distributed systems at scale. The central argument is that separating business logic from runtime environment is not just a performance optimization or a deployment convenience. It is an architectural decision that changes what a system can do, where it can run, and how long it can stay coherent as requirements change. This paper establishes the vocabulary and the model that the book later expanded into 13 runnable chapters.
    page: /whitepapers/uma/
    url: /whitepapers/Universal Microservices Architecture (UMA) - White Paper.pdf
    image: /src/assets/img/uma-paper.png
  - title: Client-Side Microservices Architecture (CSMA)
    date: June 2023
    description: This is where the thinking started. The browser kept getting treated as a consumer of server logic rather than a legitimate execution environment in its own right. CSMA was an attempt to apply service-oriented thinking to the frontend, packaging business logic as modular, portable units that could run in the browser without depending on a server call for every decision. It was the first time I wrote down a pattern I had been circling around for years, and it became the foundation that UMA built on.
    page: /whitepapers/csma/
    url: /whitepapers/Client-side Microservices Architecture (CSMA) - White Paper.pdf
    image: /src/assets/img/csma-paper.png
---
