---
trigger: model_decision
description: Always apply when doing or writing testing
---

# Pre-Commit Checklist

> IMPORTANT: Run this checklist BEFORE every commit. Do not skip.

## Verification Steps

1. **Skill check**: Did you load the correct skill for this task?
   - If unsure, re-read `.agent/rules/skill-loading.md`

2. **Workflow check**: Did you follow the workflow completely?
   - If no workflow was used, state why explicitly

3. **Code quality**:
   - [ ] No hardcoded secrets or API keys
   - [ ] No `console.log` debugging left behind
   - [ ] No commented-out code blocks
   - [ ] No TODO without a linked issue

4. **Testing** (if code changed):
   - [ ] Tests pass (`npm test` or equivalent)
   - [ ] New code has test coverage

5. **Documentation** (if behavior changed):
   - [ ] README or docs updated if user-facing behavior changed
   - [ ] Code comments for non-obvious logic

6. **Git hygiene**:
   - [ ] `.env` files are NOT staged
   - [ ] `node_modules/` is NOT staged
   - [ ] Commit message follows Conventional Commits format

## When to Skip

- Typo-only fixes (docs, comments)
- Dependency version bumps with no code changes
