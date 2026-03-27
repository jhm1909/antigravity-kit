This project uses [Antigravity Kit](https://github.com/jhm1909/antigravity-kit) for AI agent configuration.

## Mandatory Rules

> IMPORTANT: You MUST follow these rules for EVERY task. No exceptions.

1. BEFORE any task: read `.agent/rules/skill-loading.md` to load the correct skill
2. BEFORE any commit: follow `.agent/workflows/commit.md` completely
3. BEFORE writing code: check `.agent/rules/clean-code.md` for standards
4. BEFORE writing tests: check `.agent/rules/testing.md` for requirements
5. BEFORE writing docs: check `.agent/rules/documents.md` for conventions
6. When starting a new task: suggest a workflow from `.agent/workflows/`

## Structure

All agent capabilities are in `.agent/`:

- `skills/` — 21 domain expert skills (frontend, backend, AI, security, design, etc.)
- `workflows/` — 15 chainable task workflows (brainstorm, implement, test, commit, etc.)
- `rules/` — 10 always-on coding standards and guardrails
- `skills-manifest.json` — Skill routing, triggers, and profiles

## How to Use

1. Read `.agent/skills-manifest.json` to understand available skills and their triggers
2. When starting a new task, check `.agent/workflows/guide.md` for workflow discovery
3. Skills are loaded on-demand — only read `SKILL.md` when the task matches a skill's triggers
4. Follow rules in `.agent/rules/` at all times

## Workflow Chains

```
New Project:  /brainstorm -> /documentation -> /break-tasks -> /implement-feature -> /commit
New Feature:  /break-tasks -> /implement-feature -> /gen-tests -> /commit
Bug Fix:      /development -> /gen-tests -> /commit
Debug:        /debug -> /commit
```

## Self-Verification

Before completing ANY task, verify:
- [ ] Loaded the correct skill for this task type
- [ ] Followed the workflow steps in order (did not skip steps)
- [ ] Applied relevant rules (testing, docs, git, clean-code)
- [ ] Code passes lint and tests
