---
description: Git commit and push with Conventional Commits, branch safety, and protected file guards
---

# Git Commit & Push

> [!IMPORTANT]
> Uses **Conventional Commits** format. Works with any project.
> 3 modes: ⚡ Quick, 🛡️ Safe, 🎛️ Custom.

---

## Step 0: Choose Mode

Present to user:

```
How would you like to commit?

⚡ 1. Quick — stage all, auto-generate message, push (fastest)
🛡️ 2. Safe — full checks: branch, .gitignore, protected files (recommended)
🎛️ 3. Custom — you control each step
```

- If user says "nhanh" / "quick" / "go" → **Quick**
- If user says "an toàn" / "safe" → **Safe**
- If user says "tùy biến" / "custom" → **Custom**
- Default (no preference): **Safe**

### Mode Behavior Matrix

| Step | ⚡ Quick | 🛡️ Safe | 🎛️ Custom |
|------|---------|---------|-----------|
| Branch check | Skip | ✅ Check + suggest branch | ✅ Check + ask user |
| Diff summary | Show brief | ✅ Full summary + scope table | ✅ Full + ask scope grouping |
| File selection | All at once | All (ask if >15 files) | ✅ Always ask |
| .gitignore check | Skip | ✅ Auto-check + warn | ✅ Check + show details |
| Protected files | Skip | ✅ Auto-check + confirm | ✅ List every file for approval |
| Commit message | Auto-generate, no confirm | Auto-generate, show for confirm | ✅ User writes or edits |
| Push | Auto push | Auto push | ✅ Ask push/PR/keep local |

---

## Step 1: Branch Safety Check

> **⚡ Quick**: skip this step entirely
> **🛡️ Safe / 🎛️ Custom**: execute

// turbo

```bash
git branch --show-current
```

**If on `main` or `master`:**

```
⚠️ You are on the main branch.
1. Create a new branch and commit there (recommended)
2. Commit directly to main
```

- **🛡️ Safe**: For > 5 files, strongly recommend Option 1. For ≤ 5 files, default to Option 2.
- **🎛️ Custom**: Always ask. If Option 1: ask for branch name or auto-suggest (e.g. `feat/add-auth`), then:
  ```bash
  git checkout -b <branch-name>
  ```

**If on feature branch**, proceed. After all commits:

```
What would you like to do?
1. Push to remote (default)
2. Push and create a Pull Request
3. Keep locally
```

> **⚡ Quick**: auto-push (Option 1)

---

## Step 2: Diff Summary

// turbo

```bash
git status --short; git diff --stat
```

**Auto-detect scopes** from changed file paths:

| Directory Pattern | Scope |
|-------------------|-------|
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
| Root files | omit scope |

**🛡️ Safe / 🎛️ Custom**: Present scope summary table.
**⚡ Quick**: Show file count only: `📦 <N> files changed`.

---

## Step 2.5: File Selection

> **⚡ Quick**: skip — always stage all
> **🛡️ Safe**: ask only if > 15 files
> **🎛️ Custom**: always ask

```
📦 Found <N> changed files across <M> scopes.
How would you like to commit?

1. All at once (single commit)
2. Split by scope (one commit per scope) — recommended
3. Let me pick specific files
```

**Option 3** (🎛️ Custom):
```
Changed files:
 [1] cli/index.js
 [2] cli/migrate-skills.js
 [3] .agent/skills/ai-engineer/SKILL.md
 ...

Enter file numbers to stage (e.g. 1,2,5-8 or "all"):
```

---

## Step 3: .gitignore Safety Check

> **⚡ Quick**: skip
> **🛡️ Safe**: auto-check + auto-fix
> **🎛️ Custom**: check + ask before each fix

// turbo

```bash
test -f .gitignore && echo "EXISTS" || echo "MISSING"
```

**If `.gitignore` is MISSING:**
- 🚨 **STOP** — warn user
- Auto-generate based on project type:

| Detected Files | Project Type | Required Ignores |
|---------------|-------------|-----------------|
| `package.json` | Node.js | `node_modules/`, `dist/`, `*.log` |
| `requirements.txt` / `pyproject.toml` | Python | `__pycache__/`, `*.pyc`, `.venv/` |
| `go.mod` | Go | `vendor/`, binary outputs |
| `Cargo.toml` | Rust | `target/` |
| `*.sln` / `*.csproj` | .NET | `bin/`, `obj/` |

**If `.gitignore` EXISTS:** verify critical patterns:

| Pattern | Why |
|---------|-----|
| `node_modules/` | Dependencies (500MB+) |
| `.env` or `.env*` | Secrets, API keys |
| `dist/` / `build/` / `.next/` | Build outputs |
| `*.log` | Log files |
| `.DS_Store` / `Thumbs.db` | OS junk |

**If patterns missing (🛡️ Safe):** auto-add + inform user.
**If patterns missing (🎛️ Custom):**
```
⚠️ Your .gitignore is missing important patterns:
  - node_modules/ (detected package.json)
  - .env (secrets could be committed!)

Add them now?
1. Yes, add missing patterns (recommended)
2. No, I know what I'm doing
```

---

## Step 4: Protected Files Guard

> **⚡ Quick**: skip
> **🛡️ Safe**: check + confirm sensitive files
> **🎛️ Custom**: list every changed file for explicit approval

// turbo

Check for **protected files** in changed list:

| Category | Files |
|----------|-------|
| Lock files | `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `go.sum` |
| Environment | `.env`, `.env.*` |
| CI/CD | `.github/workflows/*`, `Dockerfile*`, `docker-compose*` |
| Config roots | `package.json`, `tsconfig.json`, `*.config.*` |
| Git config | `.gitignore`, `.gitmodules` |

**Rules:**
- **Never** silently stage `.env` files (even in ⚡ Quick mode!)
- `package-lock.json` acceptable if `package.json` also changed
- **🎛️ Custom**: "Did you intentionally modify `<file>`?" for each

---

## Step 5: Stage Files

// turbo

### Single Mode
```bash
git add -A
```

### Selective (from Step 2.5)
```bash
git add <file1> <file2> ...
```

### Split Mode
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

## Step 6: Generate Commit Message

// turbo

1. Analyze staged diff
2. Generate **Conventional Commit**:

| Prefix | Use For |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Restructuring |
| `docs:` | Documentation |
| `chore:` | Maintenance |
| `test:` | Tests |
| `style:` | Formatting only |
| `ci:` | CI/CD |
| `perf:` | Performance |

3. Format: `type(scope): short description`
   - Lowercase, imperative mood, no period, max 72 chars
4. Complex changes: add body after blank line
5. Breaking changes: `type(scope)!: description` + `BREAKING CHANGE:` footer

**Mode behavior:**
- **⚡ Quick**: auto-generate + commit immediately (no confirmation)
- **🛡️ Safe**: auto-generate + show for approval
- **🎛️ Custom**: show suggestion, user can edit or write their own

---

## Step 7: Commit

```bash
git commit -m "<message>"
```

### Hook Failures

| Scenario | Action |
|----------|--------|
| Lint fails on your files | Fix errors, do NOT bypass |
| Lint SIGKILL (OOM) | `--no-verify` + inform user |
| Prettier on non-code | `--no-verify` |
| Test failures | Fix tests, do NOT bypass |

---

## Step 8: Loop (Split Mode Only)

Repeat Steps 5–7 for each remaining scope group.
Show progress: `✅ 2/4 committed: skills, cli`

---

## Step 9: Push

// turbo

- **⚡ Quick / 🛡️ Safe**: auto-push
- **🎛️ Custom**: ask first

```bash
git push origin HEAD
```

If rejected:
```bash
git pull --rebase origin HEAD; git push origin HEAD
```

If **new branch** (created in Step 1):
```bash
git push -u origin HEAD
```

---

## Step 10: Confirm

// turbo

```bash
git log --oneline -<N>
```

```
✅ Committed and pushed successfully.
<hash> <message>
```

If on a feature branch:
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
| Wrong branch | `git stash; git checkout -b feat/<name>; git stash pop` |
| Large files blocked | Check `.gitignore`, suggest `git-lfs` |
| `.env` staged | 🚨 Unstage immediately: `git reset HEAD .env` |
