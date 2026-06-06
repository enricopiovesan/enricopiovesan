---
title: Designing Adaptive AI Systems with UMA and MCP
description: How Universal Microservices Architecture and the Model Context Protocol combine to produce AI systems that adapt to changing requirements without structural rewrites.
layout: page.njk
permalink: /whitepapers/uma-mcp/
canonical: https://enricopiovesan.com/whitepapers/uma-mcp/
ogTitle: Designing Adaptive AI Systems with UMA and MCP
ogDescription: How Universal Microservices Architecture and the Model Context Protocol combine to produce AI systems that adapt to changing requirements without structural rewrites.
---

**2025 · Enrico Piovesan**

---

Most AI systems are brittle in a specific way. The model is capable. The integration is frozen. Change a service contract, update a capability, add a new data source, and the agent breaks — not because the model cannot handle it but because the context interface was never designed to evolve. Rebuilding the plumbing every time the system changes is not a scaling strategy.

This paper addresses that problem directly. Universal Microservices Architecture provides the portable execution model. The Model Context Protocol provides the context interface. Together they produce agents that reason over live system state rather than static documentation, and systems that can be updated without redeploying the models or rebuilding the integration layer.

## What the paper covers

**The integration gap in agentic systems.** Current architectures treat the connection between AI models and live systems as an afterthought. Agents consume static documentation or brittle function wrappers. When the system changes, the documentation drifts and the wrappers break. The paper traces why this gap exists and why it compounds over time.

**UMA as the execution layer.** A UMA service separates business logic from the runtime environment through contracts. The contract describes what the service does, what it requires, and what it guarantees. That contract is machine-readable by design — it was written to be consumed by pipelines, validators, and agents, not just by developers reading documentation.

**MCP as the context interface.** The Model Context Protocol defines how a model requests context from live systems. Applied over a UMA service mesh, MCP allows an agent to query current capability contracts, discover what services are available, and reason about state without requiring a human to translate between the model's understanding and the system's reality.

**Adaptive architecture in practice.** When a UMA service is updated, its contract changes. An MCP-connected agent consuming that contract sees the change at query time. No redeployment. No documentation update cycle. The adaptation is structural, not manual.

**Failure modes and boundaries.** What this combination does not solve. The paper is explicit about where contract-driven context ends and where model reasoning begins, and why conflating them produces systems that appear robust but are not.

## Who it is for

Architects and engineering leaders designing the infrastructure layer for production agentic systems — teams who have deployed a first agent and are now asking what the codebase needs to look like to support the second, third, and tenth.

---

[UMA framework](/uma/) · [C-DAD framework](/c-dad/) · [White Papers](/whitepapers/)
