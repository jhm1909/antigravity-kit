---
trigger: model_decision
description: Always apply when using git for commits, branches, or version control
---

# Git Workflow Rule

## Critical Rules (MUST Follow)

1. **MUST** use **Conventional Commits** format for all commit messages: `type(scope): description`
2. **MUST** review `git diff --stat` before staging — never commit blindly
3. **MUST** ask user before staging protected files (`.env`, lock files, CI configs)
4. **MUST** suggest creating a feature branch when on `main` with > 5 file changes
5. **MUST NOT** use `--no-verify` unless there is a tooling failure (OOM, SIGKILL) — never to bypass real lint/test errors
6. **MUST NOT** commit `.env` files, secrets, or API keys — check `.gitignore` first

## Commit Type Reference

| Type | Use For | Example |
|------|---------|---------|
| `feat` | New feature | `feat(auth): add OAuth2 login flow` |
| `fix` | Bug fix | `fix(api): handle null response in user endpoint` |
| `refactor` | Code restructuring (no behavior change) | `refactor(utils): extract validation helpers` |
| `docs` | Documentation only | `docs: add API reference to README` |
| `chore` | Maintenance, deps, config | `chore: upgrade React to v19` |
| `test` | Adding/fixing tests | `test(auth): add token expiry edge cases` |
| `style` | Formatting, whitespace (no logic) | `style: fix indentation in config files` |
| `ci` | CI/CD pipeline changes | `ci: add deploy workflow for staging` |
| `perf` | Performance improvement | `perf(db): add index on user_email column` |

## Decision Flow

```
┌─────────────────────────────────────────────────────────────┐
│ BEFORE any git commit:                                       │
├─────────────────────────────────────────────────────────────┤
│ 1. Check current branch                                      │
│    On main + many changes? → Suggest feature branch          │
├─────────────────────────────────────────────────────────────┤
│ 2. Review changes (git status + git diff --stat)             │
│    Protected files changed? → List and ask confirmation      │
├─────────────────────────────────────────────────────────────┤
│ 3. Stage files                                               │
│    > 15 files? → Offer split by scope / selective staging    │
├─────────────────────────────────────────────────────────────┤
│ 4. Generate commit message                                   │
│    → Conventional Commits format                             │
│    → Present to user for approval                            │
├─────────────────────────────────────────────────────────────┤
│ 5. Commit and push                                           │
│    Push rejected? → git pull --rebase, then retry            │
└─────────────────────────────────────────────────────────────┘
```

## Scope Detection

Auto-detect scope from file paths — use the **first meaningful directory**:

| Path Pattern | Scope |
|-------------|-------|
| `apps/<name>/...` | `<name>` |
| `packages/<name>/...` | `<name>` |
| `src/components/...` | `components` |
| `.agent/skills/...` | `skills` |
| `cli/...` | `cli` |
| Root files | omit scope |

When files span multiple scopes, omit scope or use the dominant one.
