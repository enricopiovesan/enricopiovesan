---
title: "Knowledge Graph — Enrico Piovesan"
description: Interactive knowledge graph mapping the relationships between UMA, C-DAD, ECCA, CSMA, and the broader architecture and AI-native software concepts developed by Enrico Piovesan.
layout: page.njk
permalink: /knowledge-graph/
canonical: https://enricopiovesan.com/knowledge-graph/
ogTitle: Knowledge Graph
ogDescription: Explore the interconnected frameworks and concepts behind UMA, C-DAD, ECCA, and CSMA — mapped as a navigable knowledge graph.
ogImage: og-default.png
lastUpdated: June 2026
---

This graph maps the relationships between the frameworks, whitepapers, tools, and concepts published on this site. Core abstractions are connected by edges extracted from the actual content — architectural papers, perspectives, and code.

## Core Abstractions

The most connected nodes in the graph — concepts that bridge the most ideas:

- **[Contract-Driven AI Development (C-DAD)](/cdad/)** — the framework for building AI-native software using machine-enforceable contracts, declared capabilities, and governed composition. Bridges agentic systems, context engineering, and distributed architecture.
- **[Universal Microservices Architecture (UMA)](/uma/)** — runtime-portable microservices via WebAssembly. Connects CSMA, ECCA, and the broader ecosystem of open-source tools.
- **[Event Contract Catalog Architecture (ECCA)](/whitepapers/ecca/)** — federated governance layer for event-driven systems, schema registries, and policy evaluation.
- **[Client-side Microservices Architecture (CSMA)](/whitepapers/csma/)** — the original distributed runtime model, predecessor to UMA.

## Architectural Evolution

The four frameworks follow a deliberate progression:

1. **CSMA** — client-side runtime isolation and service decomposition
2. **UMA** — runtime portability via WebAssembly, server and client unified
3. **ECCA** — event contract governance across federated systems
4. **C-DAD** — contracts as the primary interface for AI-native and agentic systems

Each framework builds on the contract-first design philosophy introduced in CSMA and extended through to C-DAD's machine-first manifests.

## Framework Clusters

| Cluster | Key Concepts |
|---|---|
| Context Engineering & UMA | Runtime portability, WebAssembly, UMA framework, context engineering |
| Intellectual Frameworks | C-DAD, agentic systems, AI-native software, AI navigability |
| Author & Whitepapers | Enrico Piovesan, CSMA/UMA/ECCA/C-DAD white papers |
| Web Components | Navigation, hero, footer, book/paper/talk/project cards |
| Build & Deploy | Eleventy config, CI pipeline, scripts |

## Hyperedge Groups

Groups of concepts that co-occur across multiple documents:

- **Enrico Piovesan Core Frameworks** — UMA + C-DAD as co-defined, co-dependent systems
- **Architectural Evolution: CSMA → UMA → ECCA → C-DAD** — the four-framework progression
- **AI Agent Navigability Cluster** — C-DAD, agentic systems, context engineering, AI-native software
- **Three Structural Properties of AI-Native Software** — declared capabilities, machine-enforceable contracts, governed composition
- **C-DAD Ecosystem** — framework, whitepapers, The Day After toolkit, Traverse, The Day After (book)
- **Contract-First Design Philosophy** — immutable contracts, event contracts, CloudEvents, machine-first manifests

## Interactive Graph

<div style="width:100%;border:1px solid var(--border);border-radius:4px;overflow:hidden;margin:2rem 0;">
  <iframe
    src="/public/knowledge-graph-viz.html"
    width="100%"
    height="700"
    style="border:none;display:block;"
    title="Enrico Piovesan — Knowledge Graph"
    loading="lazy"
  ></iframe>
</div>

<p style="font-family:var(--mono);font-size:0.68rem;color:var(--mid);">345 nodes · 444 edges · 45 communities. Built with <a href="https://github.com/safishamsi/graphifyy" style="color:var(--mid);">graphify</a> from the site's own content.</p>

## Related

- [White Papers](/whitepapers/) — full technical papers for each framework
- [C-DAD Framework](/cdad/) — contract-driven AI development
- [UMA Framework](/uma/) — universal microservices architecture
- [Perspectives](/perspectives/) — takes on context engineering and AI-native architecture
