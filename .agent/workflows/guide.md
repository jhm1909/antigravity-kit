---
description: Interactive workflow discovery — helps users find the right workflow or chain for their task
---

# Guide — Workflow Discovery

> [!TIP]
> Don't know which workflow to use? This guide analyzes your situation and recommends the best path.
> Works for beginners (guides every step) and experts (skip straight to what you need).

---

## Step 1: Understand Context

**Invoke `[project-manager]` skill** to analyze the user's intent.

Ask user:

```
🧭 What are you trying to do?

1. 🆕 Start a new project from scratch
2. ➕ Add a feature to an existing project
3. 🐛 Fix a bug
4. 🎨 Design UI/UX
5. 📚 Write documentation
6. 🔍 Study/absorb another project's patterns
7. 🧪 Write tests
8. 🚀 Deploy / ship
9. 🤷 I don't know, help me figure it out
```

> **For beginners**: pick a number. The AI will handle everything.
> **For experts**: skip this and call any workflow directly (e.g. `/break-tasks`).

---

## Step 2: Analyze & Recommend

**Invoke `[project-manager]` skill** to match intent → workflow chain.

Based on user's answer, present the recommended **workflow chain**:

### If 1: New Project

```
📋 Recommended chain for a new project:

Phase 0 — Planning:
  /brainstorm        → Define requirements, roadmap, PRD
  /documentation     → Create specs (SDD, epics, stories)

Phase 1 — MVP:
  /break-tasks       → Break into atomic tasks
  /implement-feature → Code phase 1 features
  /gen-tests         → Write tests
  /commit            → Save progress

Phase 2+ — Iterate:
  /break-tasks       → Next batch of features
  /implement-feature → Code them
  /commit            → Ship

Ready to start? Type /brainstorm to begin!
```

### If 2: Add Feature

```
📋 For a new feature:
  /break-tasks       → Break feature into tasks
  /implement-feature → Code the feature
  /gen-tests         → Test coverage
  /commit            → Push changes

Already have specs? Skip straight to /break-tasks.
No specs yet? Start with /brainstorm first.
```

### If 3: Fix Bug

```
📋 For bug fixing:
  /development       → Debug + fix
  /gen-tests         → Add regression test
  /commit            → Push fix
```

### If 4: Design UI/UX

```
📋 For UI/UX work:
  /ui-ux-design      → Create design specs
  /break-tasks       → Break into component tasks
  /implement-feature → Build components
  /commit            → Push
```

### If 5: Documentation

```
📋 For documentation:
  /documentation     → Generate docs (from code or requirements)
  /commit            → Push docs

Mode A: From existing codebase (reverse-engineer)
Mode B: From requirements (forward-engineer)
```

### If 6: Study External Project

```
📋 For absorbing patterns:
  /absorb            → Analyze reference project
  /break-tasks       → Plan integration tasks
  /implement-feature → Apply best parts
  /commit            → Save
```

### If 7: Write Tests

```
📋 For testing:
  /qa                → Create test plan
  /gen-tests         → Generate test code
  /commit            → Push tests
```

### If 8: Deploy

```
📋 For deployment:
  /development       → Final code review
  /commit            → Ensure latest pushed
  Then follow your CI/CD pipeline.
```

### If 9: Help Me

**Invoke `[lead-architect]` skill** to analyze project state.

// turbo

Check project structure to detect stage:

```bash
ls docs/ 2>/dev/null; ls src/ 2>/dev/null; ls package.json 2>/dev/null
```

| What I see | Stage | Start with |
|-----------|-------|-----------|
| Empty project | Beginning | `/brainstorm` |
| Docs but no code | Planning done | `/break-tasks` |
| Code but no docs | Legacy project | `/documentation` (Mode A) |
| Code + tests failing | Bug phase | `/development` |
| Everything looks good | Ship it | `/commit` |

---

## Step 3: Execute Chain

**Invoke `[project-manager]` skill** to track chain progress.

After user picks a workflow:

1. Execute the chosen workflow
2. When it completes, auto-suggest the next in chain:
   ```
   ✅ /brainstorm complete!
   💡 Next in chain: /documentation — create detailed specs
   Ready? Type /documentation or skip to /break-tasks.
   ```
3. Track progress:
   ```
   Chain progress: ✅ /brainstorm → 🔄 /documentation → ⏳ /break-tasks → ⏳ /implement-feature
   ```

---

## All Available Workflows

| Workflow | Purpose | Skills Used | Best For |
|----------|---------|-------------|----------|
| `/brainstorm` | Requirements, roadmap | `project-manager` | Starting a project |
| `/documentation` | Specs, SDD, stories | `lead-architect`, `business-analysis` | After brainstorm |
| `/break-tasks` | Task breakdown | `lead-architect`, `business-analysis` | Before coding |
| `/implement-feature` | Full implementation | All dev skills | Coding phase |
| `/development` | Quick fixes | Context-dependent | Small tasks |
| `/ui-ux-design` | Design specs | `designer` | Design phase |
| `/qa` | Test plans | `qa-tester` | Quality check |
| `/gen-tests` | Generate test code | `qa-tester` | After coding |
| `/absorb` | Study reference project | `lead-architect` | Learning patterns |
| `/commit` | Git commit + push | _(no skill)_ | Saving work |
| `/bootstrap` | Project scaffolding | `lead-architect` | Initial setup |
| `/custom-behavior` | Customize rules | `project-manager` | Meta-config |
| `/guide` | This workflow! | `project-manager` | When lost |
