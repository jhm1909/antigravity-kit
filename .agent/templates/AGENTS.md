This project uses [Antigravity Kit](https://github.com/jhm1909/antigravity-kit) for AI agent configuration.

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

## Key Rules

- Always check `.agent/rules/skill-loading.md` before loading any skill
- Follow `.agent/rules/git-workflow.md` for commits
- Follow `.agent/rules/testing.md` for test coverage
- Follow `.agent/rules/documents.md` for documentation conventions
