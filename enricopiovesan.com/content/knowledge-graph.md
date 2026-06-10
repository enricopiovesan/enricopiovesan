---
title: "Knowledge Graph — Enrico Piovesan"
description: Interactive knowledge graph mapping the relationships between UMA, C-DAD, ECCA, CSMA, and the broader architecture and AI-native software concepts developed by Enrico Piovesan.
layout: section.njk
sectionGroup: thinking
breadcrumb:
  - href: /thinking/
    label: Thinking
  - label: Knowledge Graph
permalink: /knowledge-graph/
canonical: https://enricopiovesan.com/knowledge-graph/
ogTitle: Knowledge Graph
ogDescription: Explore the interconnected frameworks and concepts behind UMA, C-DAD, ECCA, and CSMA — mapped as a navigable knowledge graph.
ogImage: og-default.png
lastUpdated: June 2026
---

This graph maps the ideas, concepts, and arguments across 250+ articles and four white papers. Every node is a topic, framework, or argument, extracted from the writing itself, not from code or site structure.

## Core Concepts

The most connected ideas across all writing:

- **[Contract-Driven AI Development (<abbr title="Contract-Driven AI Development">C-DAD</abbr>)](/cdad/).** Machine-enforceable contracts, declared capabilities, and governed composition as the foundation for AI-native software.
- **[Universal Microservices Architecture (<abbr title="Universal Microservices Architecture">UMA</abbr>)](/uma/).** Runtime-portable services via WebAssembly. The runtime is a deployment decision, not an architectural one.
- **[Event Contract Catalog Architecture (<abbr title="Event Contract Catalog Architecture">ECCA</abbr>)](/whitepapers/ecca/).** Federated governance for event-driven systems via schema registries and policy evaluation.
- **[Client-side Microservices Architecture (<abbr title="Client-Side Microservices Architecture">CSMA</abbr>)](/whitepapers/csma/).** The original distributed client runtime model, predecessor to UMA.
- **WebAssembly.** The portable execution substrate connecting all four frameworks.
- **Agentic Systems.** AI agents as first-class consumers of software architecture.

## Idea Clusters

| Cluster | Key Ideas |
|---|---|
| Contract-Driven AI Trust | Agent drift, contract feedback loops, AI consistency |
| Agent Runtime & Capabilities | Capability discovery, agent planning, UMA descriptors |
| Zero Trust Runtime Security | Code signing, attestation, capability least-privilege |
| Agentic Systems & App Collapse | Application layer collapse, capability surfaces, SaaS disruption |
| AI-Native Architecture | Architecture as metadata, discoverability, machine-readable design |
| Wasm Edge & AI Inference | Portable AI, edge inference, WASI NN, embedded Wasm |
| Legacy Modernization | Extract vs. refactor, contracts over code, vibe coding limits |
| Architectural Evolution | CSMA → UMA → ECCA → C-DAD progression |

## Concept Groups

Co-occurring idea clusters found across multiple articles:

- **Piovesan Architecture Family.** <abbr title="Client-Side Microservices Architecture">CSMA</abbr>, <abbr title="Universal Microservices Architecture">UMA</abbr>, <abbr title="Event Contract Catalog Architecture">ECCA</abbr>, <abbr title="Contract-Driven AI Development">C-DAD</abbr> as a single evolving system
- **Contract-First Design Philosophy.** Immutable contracts, event contracts, CloudEvents, machine-first manifests
- **Three Properties of AI-Native Software.** Declared capabilities, machine-enforceable contracts, governed composition
- **UMA Runtime Architecture.** Universal runtime, low-latency server runtime, microservices registry, abstraction layer
- **ECCA Governance Stack.** Schema registry, event catalog, runtime observability, federated governance, policy engine
- **AI Agent Navigability.** C-DAD, agentic systems, context engineering, AI navigability
- **Wasm AI Inference Stack.** ONNX runtime, TensorFlow.js, Candle, local-first AI execution

## Interactive Graph

<div style="width:min(860px,100%);margin-left:calc((min(860px,100%) - 100%) / 2 * -1);border:1px solid var(--border);border-radius:4px;overflow:hidden;margin-top:2rem;margin-bottom:2rem;">
  <iframe
    src="/public/knowledge-graph-viz.html"
    width="100%"
    height="820"
    style="border:none;display:block;"
    title="Enrico Piovesan — Knowledge Graph"
    loading="lazy"
  ></iframe>
</div>

<p style="font-family:var(--mono);font-size:0.68rem;color:var(--mid);">577 nodes · 602 edges · 82 communities. Built with <a href="https://github.com/safishamsi/graphifyy" style="color:var(--mid);">graphify</a> from 250+ articles and 4 white papers.</p>

## Related

- [White Papers](/whitepapers/), full technical papers for each framework
- [C-DAD Framework](/cdad/), contract-driven AI development
- [UMA Framework](/uma/), universal microservices architecture
- [Perspectives](/perspectives/), takes on context engineering and AI-native architecture
