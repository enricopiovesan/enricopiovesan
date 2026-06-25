# Skills

Reusable Claude Code skills for research, writing, and analysis workflows. Each skill lives in its own folder with a `SKILL.md` file that defines its trigger conditions, parameters, and execution instructions.

---

## Available skills

### [topic-signal-report](./topic-signal-report/SKILL.md)

Produces a structured signal report on any topic, technology, or domain. Researches across GitHub trending repositories, YouTube talks, Hacker News discussions, arXiv papers, release notes, and practitioner blogs — then synthesizes an honest, opinionated summary of where a topic actually stands right now.

**Trigger:** "give me a signal report on X", "what is trending in X", "research what is happening in X", "top repos and talks on X"

**Parameters:** topic (required), count per source (default 5), time window (default 30 days)

**Output:** a structured markdown report saved as `signal-report-[topic]-[month]-[year].md`

---

## How skills work

Skills are instruction files for [Claude Code](https://claude.ai/code). When a trigger phrase matches, Claude loads the skill and follows its workflow rather than improvising from scratch. This keeps complex multi-step tasks consistent and reproducible across sessions.

To use a skill, invoke it with `/skill-name` or describe what you want in natural language — Claude will match the trigger and load the right skill automatically.
