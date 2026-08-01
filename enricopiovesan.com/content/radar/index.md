---
title: Software Architecture Radar — Monthly Architecture Signals for 2026
description: Ten software architecture signals worth paying attention to each month. Covering agentic AI, governance, multi-agent coordination, and architecture documentation — curated for architects and engineering leaders.
layout: section.njk
sectionGroup: radar
breadcrumb:
  - label: Radar
permalink: /radar/
canonical: https://enricopiovesan.com/radar/
ogTitle: Software Architecture Radar — Monthly Architecture Signals for 2026
ogDescription: Ten software architecture signals per month, curated from GitHub, arXiv, Hacker News, release notes, and practitioner blogs. Architecture intelligence for engineers building serious systems.
---

Ten signals worth paying attention to each month. Curated from GitHub, arXiv, Hacker News, release notes, and practitioner blogs. Each issue covers what surfaced across those six source types in a given month, then identifies what the signals collectively point to.

Not trends for the sake of trends. Not recaps of what everyone is already talking about. Signals that matter for architects, engineering leaders, and teams building serious software systems.

Published monthly.

## H1 2026 signal tracker

Ten themes tracked across seven issues. A filled dot marks a month where that theme appeared as a named signal.

<div class="signal-tracker" style="margin: 2rem 0 2.5rem; overflow-x: auto;">
<table style="border-collapse: collapse; width: 100%; font-size: 0.85rem; line-height: 1.4;">
<thead>
<tr>
<th style="text-align: left; padding: 0.5rem 1.5rem 0.5rem 0; border-bottom: 2px solid currentColor; font-weight: 600; white-space: nowrap; min-width: 200px;">Theme</th>
<th style="padding: 0.5rem 0.75rem; border-bottom: 2px solid currentColor; text-align: center; font-weight: 600; white-space: nowrap;">Jan</th>
<th style="padding: 0.5rem 0.75rem; border-bottom: 2px solid currentColor; text-align: center; font-weight: 600; white-space: nowrap;">Feb</th>
<th style="padding: 0.5rem 0.75rem; border-bottom: 2px solid currentColor; text-align: center; font-weight: 600; white-space: nowrap;">Mar</th>
<th style="padding: 0.5rem 0.75rem; border-bottom: 2px solid currentColor; text-align: center; font-weight: 600; white-space: nowrap;">Apr</th>
<th style="padding: 0.5rem 0.75rem; border-bottom: 2px solid currentColor; text-align: center; font-weight: 600; white-space: nowrap;">May</th>
<th style="padding: 0.5rem 0.75rem; border-bottom: 2px solid currentColor; text-align: center; font-weight: 600; white-space: nowrap;">Jun</th>
<th style="padding: 0.5rem 0.75rem; border-bottom: 2px solid currentColor; text-align: center; font-weight: 600; white-space: nowrap;">Jul</th>
<th style="padding: 0.5rem 0 0.5rem 1rem; border-bottom: 2px solid currentColor; text-align: center; font-weight: 600; white-space: nowrap; opacity: 0.6; font-size: 0.75rem;">Issues</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; border-bottom: 1px solid currentColor; border-bottom-opacity: 0.1; white-space: nowrap; opacity: 0.85;">Agentic AI tooling</td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; border-bottom: 1px solid currentColor; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">7/7</td>
</tr>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; border-bottom: 1px solid currentColor; white-space: nowrap; opacity: 0.85;">Governance as architecture</td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; border-bottom: 1px solid currentColor; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">7/7</td>
</tr>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; border-bottom: 1px solid currentColor; white-space: nowrap; opacity: 0.85;">Multi-agent coordination</td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; border-bottom: 1px solid currentColor; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">6/7</td>
</tr>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; border-bottom: 1px solid currentColor; white-space: nowrap; opacity: 0.85;">arXiv research signal</td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; border-bottom: 1px solid currentColor; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">6/7</td>
</tr>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; border-bottom: 1px solid currentColor; white-space: nowrap; opacity: 0.85;">Supply chain security</td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; border-bottom: 1px solid currentColor; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">4/7</td>
</tr>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; border-bottom: 1px solid currentColor; white-space: nowrap; opacity: 0.85;">Architecture documentation gap</td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; border-bottom: 1px solid currentColor; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">4/7</td>
</tr>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; border-bottom: 1px solid currentColor; white-space: nowrap; opacity: 0.85;">Sustainability / Green SW</td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; border-bottom: 1px solid currentColor; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">4/7</td>
</tr>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; border-bottom: 1px solid currentColor; white-space: nowrap; opacity: 0.85;">Framework releases (.NET)</td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; border-bottom: 1px solid currentColor; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">4/7</td>
</tr>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; border-bottom: 1px solid currentColor; white-space: nowrap; opacity: 0.85;">Architecture patterns</td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem; border-bottom: 1px solid currentColor;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; border-bottom: 1px solid currentColor; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">3/7</td>
</tr>
<tr>
<td style="padding: 0.6rem 1.5rem 0.6rem 0; white-space: nowrap; opacity: 0.85;">EU AI Act readiness</td>
<td style="text-align: center; padding: 0.6rem 0.75rem;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.8;"></span></td>
<td style="text-align: center; padding: 0.6rem 0.75rem;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor;opacity:0.2;"></span></td>
<td style="text-align: center; padding: 0.6rem 0 0.6rem 1rem; font-size: 0.75rem; opacity: 0.55; font-weight: 600;">2/7</td>
</tr>
</tbody>
</table>
</div>

## What is trending

These themes appeared in four or more of the seven 2026 issues so far. They are not individual stories — they are structural shifts.

**Agentic AI tooling (7/7 issues).** Every month introduced new frameworks, tools, or infrastructure responses driven by agentic development workflows. The signal moved from tooling going viral in January to infrastructure teams designing for 30x capacity in April to multi-agent firms becoming the default pattern by June to a July pushback against orchestration itself, in favor of loop engineering and parallel independent agent attempts. This is not a trend — it is a ground condition, and it is still changing shape month to month.

**Governance as architecture (7/7 issues).** Not a compliance add-on. Governance appeared every month as the architectural layer that tooling was building faster than teams could fill. It showed up in security frameworks (OESIS naming AI as an endpoint category), in research papers (governance-aware sandbox, widening governance gaps in coding agents), in regulatory readiness (EU AI Act), and in production failures (Adobe breach exposing bulk data export without controls, then in July the Hugging Face and Anthropic disclosures showing agent evaluation environments reaching real production infrastructure). The recurring signal: capability is shipping, governance patterns are not keeping pace, and July made the cost of that gap concrete rather than theoretical.

**Multi-agent coordination (6/7 issues).** Single-agent approaches gave way to specialised agent teams, then in July that consolidation met its first real pushback. The pattern moved through the half: ByteDance's framework in February, skills registries under security scrutiny in March, GitHub's 30x capacity disclosure driven by agentic workloads in April, multi-agent firm structures dominating GitHub trending in May, the MCP standard becoming the de facto integration layer by June. By July, practitioners were arguing in public that heavy orchestration degrades performance more than it helps, and Orca's parallel-attempt pattern showed up as a simpler alternative gaining real GitHub traction.

**arXiv research surge in architecture (6/7 issues).** The software architecture research community published at an unusual rate on AI-native design, agentic SDLC reference architectures, documentation for AI-augmented systems, and agent harness patterns. March, April, and May each had three or more significant papers, and July added two papers on opposite ends of the same problem, generating microservice architectures from requirements and validating them structurally afterward. The research community has accepted agentic AI as a core architecture concern rather than a specialisation.

---

## New tech to evaluate

These tools appeared once or twice but scored high on practitioner signal — viral growth, concrete use case, or addressing a problem with no existing solution.

**Claude Code** (`anthropics/claude-code`) — Treats the entire codebase, not the file, as the agent's operating unit. The first widely adopted tool to do this. Sets the vocabulary and structural assumptions for every subsequent agentic coding tool.

**OpenClaw** — Went from 9k to 210k+ stars in under 60 days. Local-first AI infrastructure emphasis, service decoupling as a design constraint. Three months of sustained growth indicate this is solving a real problem rather than riding a moment.

**Bumblebee** — Read-only supply chain scanner for MCP servers, editor extensions, and package managers. Written in Go with zero non-standard library dependencies. Addresses a new attack surface (the MCP ecosystem) that existing dependency scanners were not designed for.

**Pear by Holepunch** — P2P platform that removes central servers from the application layer entirely, using a distributed routing protocol. Low adoption friction compared to previous P2P architectures. Worth understanding as edge computing and local-first patterns expand.

**Semantic code search MCP server** — Lets agents query codebases by semantic similarity rather than file path. Context management as infrastructure rather than a model concern. Reduces context window waste and enables architecture-aware codebase navigation.

---

## Becoming standard

These patterns have moved from research or early adoption toward being the expected baseline. Teams not aware of them are working with outdated reference points.

**Six-layer agentic SDLC architecture** — orchestration, tool integration, context management, memory, governance, and human oversight. Published as a reference architecture in April 2026, the six-layer model is the clearest formal specification of what agentic software engineering systems need to contain.

**MCP as the context integration standard** — The Anthropic Model Context Protocol has become the de facto standard for how agents connect to tools, context sources, and external systems. Evaluated once, depended on everywhere the agent pattern appears.

**Deterministic and agentic hybrid architecture** — Wrapping agentic components in deterministic orchestration layers for systems with regulatory or compliance requirements. This resolves the false choice between autonomous agents and governed systems. The expected enterprise pattern for the rest of 2026.

**Fitness functions via AI tooling** — Expressing architectural constraints as automated checks rather than documentation that drifts. AI tooling has reduced the implementation cost to the point where fitness functions are practical rather than aspirational. The path to machine-enforceable architectural constraints.

**AI Adoption Maturity Model (CMU and Accenture)** — Published in January, appearing in enterprise architecture capability assessments across sectors by March. Gives architects a shared vocabulary for the readiness conversation. Three months from release to widespread reference in capability reviews indicates the field had been waiting for this framing.

---

## Repos to watch

Concrete GitHub repositories that appeared as signals across the six issues. Each link is to the repo, not to a summary.

- [anthropics/claude-code](https://github.com/anthropics/claude-code) — Agentic terminal coding tool. The codebase-level context pattern it establishes will influence every subsequent tool in this space.
- [OpenClaw](https://github.com/openclaw/openclaw) — 210k+ stars. Local-first AI infrastructure. Three months of sustained growth.
- ByteDance agent framework — 25k stars in February. Multi-agent coordination and structured output handling for complex workflows.
- [Bumblebee](https://github.com/PerplexityAI/bumblebee) — Supply chain scanning for the MCP and editor extension ecosystem. Zero dependencies by design.
- Semantic code search MCP server — Architecture-aware codebase navigation for coding agents. Trending March 2026.

---

## Issues

<div style="border-top: 1px solid currentColor; margin: 1.5rem 0 0; padding-top: 1.5rem; opacity: 0.95;">
<div style="margin-bottom: 0.6rem;">
<span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">governance</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">MCP</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">agent security</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;text-transform:uppercase;">orchestration</span>
</div>
<p style="margin: 0 0 0.4rem;"><strong><a href="/radar/2026-07/">July 2026 — Agent evaluation environments escape into production, twice</a></strong></p>
<p style="margin: 0; font-size: 0.9rem; opacity: 0.75;">Hugging Face and Anthropic separately disclose agent evaluation environments that reached real production infrastructure. MCP ships its biggest specification revision since launch. Practitioners push back on heavy agent orchestration in favor of loop engineering and parallel independent attempts.</p>
</div>

<div style="border-top: 1px solid currentColor; margin: 1.5rem 0 0; padding-top: 1.5rem; opacity: 0.95;">
<div style="margin-bottom: 0.6rem;">
<span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">multi-agent</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">agentic AI</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">governance</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;text-transform:uppercase;">MCP</span>
</div>
<p style="margin: 0 0 0.4rem;"><strong><a href="/radar/2026-06/">June 2026 — Agents as architectural participants, not tools</a></strong></p>
<p style="margin: 0; font-size: 0.9rem; opacity: 0.75;">Microsoft ships MAF v1.0 at Build, a 52-paper systematic review maps LLM capability limits in architecture tasks, and two high-signal HN threads push back on the idea that AI reduces the need for architectural thinking. Fitness functions resurface as a mechanism for machine-enforceable architectural constraints.</p>
</div>

<div style="border-top: 1px solid currentColor; margin: 1.5rem 0 0; padding-top: 1.5rem; opacity: 0.95;">
<div style="margin-bottom: 0.6rem;">
<span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">judgment</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">EU AI Act</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">research</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;text-transform:uppercase;">multi-agent</span>
</div>
<p style="margin: 0 0 0.4rem;"><strong><a href="/radar/2026-05/">May 2026 — Architectural judgment as the non-automatable core</a></strong></p>
<p style="margin: 0; font-size: 0.9rem; opacity: 0.75;">matklad's "Learning Software Architecture" reaches 300+ points on Hacker News. A 52-paper systematic review confirms LLMs cannot yet handle cross-cutting trade-off analysis. Multi-agent firm structures dominate GitHub trending. The EU AI Act August deadline appears in architecture planning cycles for the first time.</p>
</div>

<div style="border-top: 1px solid currentColor; margin: 1.5rem 0 0; padding-top: 1.5rem; opacity: 0.95;">
<div style="margin-bottom: 0.6rem;">
<span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">capacity</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">agentic SDLC</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">governance</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;text-transform:uppercase;">security</span>
</div>
<p style="margin: 0 0 0.4rem;"><strong><a href="/radar/2026-04/">April 2026 — GitHub redesigns for 30x capacity, three agentic SDLC papers in one week</a></strong></p>
<p style="margin: 0; font-size: 0.9rem; opacity: 0.75;">GitHub discloses it moved from a 10x to 30x capacity plan driven by agentic development workflows. In the same week: a six-layer agentic SDLC reference architecture backed by SWE-bench data (1.96% to 78.4%), a study of 70 agent harness projects, and an analysis of how AI coding agents reshape architecture decisions. An Adobe breach reveals missing rate limits as an architectural failure.</p>
</div>

<div style="border-top: 1px solid currentColor; margin: 1.5rem 0 0; padding-top: 1.5rem; opacity: 0.95;">
<div style="margin-bottom: 0.6rem;">
<span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">documentation</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">security</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">supply chain</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;text-transform:uppercase;">research</span>
</div>
<p style="margin: 0 0 0.4rem;"><strong><a href="/radar/2026-03/">March 2026 — Architecture documentation is the broken layer — three papers agree</a></strong></p>
<p style="margin: 0; font-size: 0.9rem; opacity: 0.75;">A multivocal review of 37 studies, a paper on automated architecture view generation, and a paper rethinking documentation for AI-augmented ecosystems all converge on the same finding: existing documentation captures structure but not intent. A skills registry scan covering 14,000+ agent skills finds a 16 percent AI audit failure rate.</p>
</div>

<div style="border-top: 1px solid currentColor; margin: 1.5rem 0 0; padding-top: 1.5rem; opacity: 0.95;">
<div style="margin-bottom: 0.6rem;">
<span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">governance</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">security frameworks</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">agent frameworks</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;text-transform:uppercase;">sustainability</span>
</div>
<p style="margin: 0 0 0.4rem;"><strong><a href="/radar/2026-02/">February 2026 — Governance is the missing architecture layer</a></strong></p>
<p style="margin: 0; font-size: 0.9rem; opacity: 0.75;">A ByteDance agent framework reaches 25k stars and number one on GitHub trending. OPSWAT names AI as a first-class endpoint security category in the OESIS framework for the first time. A governance-aware AI sandbox architecture is accepted for EASE 2026. The tooling is maturing faster than the governance patterns that would make it safe to depend on.</p>
</div>

<div style="border-top: 1px solid currentColor; margin: 1.5rem 0 0; padding-top: 1.5rem; opacity: 0.95;">
<div style="margin-bottom: 0.6rem;">
<span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">supply chain</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">agentic tooling</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;margin-right:0.4rem;text-transform:uppercase;">maturity model</span><span style="display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.05em;padding:0.2em 0.55em;border:1px solid currentColor;border-radius:3px;opacity:0.6;text-transform:uppercase;">sustainability</span>
</div>
<p style="margin: 0 0 0.4rem;"><strong><a href="/radar/2026-01/">January 2026 — Agentic tooling goes viral, supply chain security, AI adoption maturity</a></strong></p>
<p style="margin: 0; font-size: 0.9rem; opacity: 0.75;">Claude Code becomes one of the fastest-rising repositories on GitHub within days of release. Bumblebee arrives as the first supply chain scanner designed for the MCP ecosystem. CMU and Accenture release the AI Adoption Maturity Model. OpenClaw goes from 9k to 60k stars in days. Infrastructure pressure building under AI workloads that existing architectures were not designed for.</p>
</div>
