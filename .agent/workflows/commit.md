---
description: Git commit and push with Conventional Commits, branch safety, and protected file guards
---

# Git Commit & Push

> [!IMPORTANT]
> Uses **Conventional Commits** format. Always reviews changes before committing.
> Works with any project — auto-detects scopes from directory structure.

---

## Step 0: Branch Safety Check

// turbo

```bash
git branch --show-current
```

**If on `main` or `master`:**

Present options to user:

```
⚠️ You are on the main branch.
1. Create a new branch and commit there (recommended)
2. Commit directly to main (small changes only)
```

- If user picks **Option 1**: ask for branch name or auto-suggest from changes (e.g. `feat/add-auth-module`), then:
  ```bash
  git checkout -b <branch-name>
  ```
- If user picks **Option 2** or says "trực tiếp" / "directly": proceed on main.
- For < 3 files changed, default to Option 2.

**If on feature branch**, proceed normally. After all commits, present:

```
What would you like to do?
1. Push to remote (default)
2. Push and create a Pull Request
3. Keep locally
```

---

## Step 1: Diff Summary

// turbo

```bash
git status --short && echo "---" && git diff --stat
```

After running, **auto-detect scopes** from changed file paths:

**Scope detection strategy** (works for any project):
1. Extract the **top-level directory** of each changed file
2. Group files by that directory → each group = one scope
3. Root-level files → scope is omitted

| Example Path | Detected Scope |
|-------------|----------------|
| `src/components/Button.tsx` | `src` or more granularly `components` |
| `apps/web/pages/index.tsx` | `web` (monorepo) |
| `lib/utils.ts` | `lib` |
| `.agent/skills/designer/SKILL.md` | `skills` |
| `cli/index.js` | `cli` |
| `README.md` | _(root, omit scope)_ |

**Common scope mappings** (auto-apply when detected):

| Directory Pattern | Suggested Scope |
|-------------------|----------------|
| `apps/<name>/` | `<name>` |
| `packages/<name>/` | `<name>` |
| `src/` | omit (single-app) |
| `.agent/skills/` | `skills` |
| `.agent/workflows/` | `workflows` |
| `.agent/rules/` | `rules` |
| `cli/` or `bin/` | `cli` |
| `docs/` | `docs` |
| `test/` or `__tests__/` | `test` |
| `.github/` | `ci` |

Present a summary table:

| Scope | Files | Example Changes |
|-------|------:|-----------------|
| `cli` | 2 | index.js, migrate.js |
| `skills` | 23 | SKILL.md frontmatter updates |

---

## Step 1.5: File Selection (if > 15 changed files)

If more than **15 files** are changed, present selection options:

```
📦 Found <N> changed files across <M> scopes.
How would you like to commit?

1. All at once (single commit)
2. Split by scope (one commit per scope) — recommended
3. Let me pick specific files
```

- **Option 1**: Stage all, single commit
- **Option 2**: Split mode — commit each scope separately (Steps 3-5 loop)
- **Option 3**: List all changed files with numbers, let user type numbers/ranges:
  ```
  Changed files:
   [1] cli/index.js
   [2] cli/migrate-skills.js
   [3] .agent/skills/ai-engineer/SKILL.md
   [4] .agent/skills/backend-developer/SKILL.md
   ...

  Enter file numbers to stage (e.g. 1,2,5-8 or "all"):
  ```

If ≤ 15 files, default to **Option 1** (all at once) without asking.

---

## Step 2: Protected Files Guard

// turbo

Before staging, check for **protected files** in the changed list:

| Category | Common Files |
|----------|-------------|
| Lock files | `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `go.sum`, `Cargo.lock` |
| Environment | `.env`, `.env.*` |
| CI/CD | `.github/workflows/*`, `Dockerfile*`, `docker-compose*` |
| Config roots | `package.json`, `tsconfig.json`, `*.config.*` |
| Git config | `.gitignore`, `.gitmodules` |

**Rules:**
- If protected files are modified → **list explicitly** and ask for confirmation
- `package-lock.json` acceptable if `package.json` also changed
- **Never** silently stage `.env` files
- Config files: confirm intent ("Did you intentionally modify `tsconfig.json`?")

---

## Step 3: Stage Files

// turbo

### Single Mode
```bash
git add -A
```
Or specific files if user selected in Step 1.5:
```bash
git add <file1> <file2> ...
```

### Split Mode
Stage only files for the **current scope group**:
```bash
git add <scope-directory>/
```

Commit order (dependencies first):
1. Shared libraries / internal packages
2. Backend / API
3. Frontend / UI
4. Documentation
5. CI/CD
6. Root config files

---

## Step 4: Generate Commit Message

// turbo

1. Analyze the staged diff
2. Generate a **Conventional Commit** message:

| Prefix | Use For |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring |
| `docs:` | Documentation only |
| `chore:` | Maintenance (deps, config) |
| `test:` | Adding/fixing tests |
| `style:` | Formatting, no logic change |
| `ci:` | CI/CD changes |
| `perf:` | Performance improvement |

3. Format: `type(scope): short description`
   - Lowercase, imperative mood, no period, max 72 chars
   - Scope = auto-detected from Step 1 (omit if root-only or mixed)
4. For complex changes, add body after blank line
5. For breaking changes: `type(scope)!: description` + `BREAKING CHANGE:` footer

**Examples:**
- `feat(cli): add profile-based init command`
- `refactor(skills): migrate frontmatter to agentskills.io spec`
- `chore: update package.json metadata`
- `docs: add installation guide to README`
- `fix(api): handle null response from auth endpoint`

6. **Present to user for approval** before committing

---

## Step 5: Commit

```bash
git commit -m "<approved message>"
```

### Hook Failures

| Scenario | Action |
|----------|--------|
| Lint fails on your files | Fix errors, do NOT bypass |
| Lint SIGKILL (OOM) | `--no-verify` + inform user |
| Prettier on non-code | `--no-verify` |
| Test failures | Fix tests, do NOT bypass |

When using `--no-verify`, always inform user why.

---

## Step 6: Loop (Split Mode Only)

Repeat Steps 3–5 for each remaining scope group.
Show progress: `✅ 2/4 committed: skills, cli`

---

## Step 7: Push

// turbo

```bash
git push origin HEAD
```

If rejected:
```bash
git pull --rebase origin HEAD && git push origin HEAD
```

If this is a **new branch** (created in Step 0):
```bash
git push -u origin HEAD
```

---

## Step 8: Confirm

// turbo

```bash
git log --oneline -<N>
```

Report:
```
✅ Committed and pushed successfully.
<hash> <message>
```

If on a feature branch, remind user:
```
💡 To create a PR: gh pr create --fill
```

---

## Error Recovery

| Failure | Recovery |
|---------|----------|
| Nothing to commit | Inform user |
| Push rejected | `git pull --rebase` then retry |
| Merge conflict | Show files, ask user to resolve |
| Auth failure | Check credentials / SSH |
| Wrong branch | `git stash && git checkout -b feat/<name> && git stash pop` |
| Large files blocked | Check `.gitignore`, suggest `git-lfs` |
