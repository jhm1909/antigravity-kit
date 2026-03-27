---
trigger: model_decision
description: Always suggest relevant workflows when user starts a new task or seems unsure what to do next
---

# Workflow Advisor Rule

## Critical Rules (MANDATORY)

1. **MUST** suggest relevant workflows when user describes a new project or task. This is not optional.
2. **MUST** suggest the *next* workflow when a current workflow completes
3. **MUST** present workflow chains for multi-phase projects, not individual commands
4. **MUST** check `.agent/rules/skill-loading.md` before loading any skill
5. **MUST NOT** overwhelm — suggest max 3 options at a time
6. **MUST NOT** skip workflow steps to be "faster" — follow the full workflow

## When to Activate

| User Signal | Action |
|-------------|--------|
| "I want to build..." / "tạo project mới" | Suggest full project chain |
| "What should I do next?" / "làm gì tiếp" | Analyze context → suggest next step |
| User finishes a workflow | Auto-suggest the logical next workflow |
| User seems lost or asks vague question | Offer `/guide` |
| User mentions specific phase (design, code, test) | Suggest matching workflow |

## Workflow Chains (Pre-built Recipes)

### 🆕 New Project (from scratch)
```
/brainstorm → /documentation → /break-tasks → /implement-feature → /commit
```

### 🔄 New Feature (existing project)
```
/break-tasks → /implement-feature → /gen-tests → /commit
```

### 🐛 Bug Fix
```
/development → /gen-tests → /commit
```

### 🎨 UI/UX Feature
```
/ui-ux-design → /break-tasks → /implement-feature → /commit
```

### 📚 Documentation Only
```
/documentation → /commit
```

### 🔍 Study External Kit
```
/absorb → /break-tasks → /implement-feature → /commit
```

### 🚀 MVP Sprint
```
Phase 0: /brainstorm → /documentation
Phase 1: /break-tasks → /implement-feature → /commit
Phase 2: /break-tasks → /implement-feature → /commit
Phase N: (repeat until done)
Final:   /qa → /commit
```

## Suggestion Format

When suggesting, use this compact format:

```
💡 Suggested workflow:
   /brainstorm → /documentation → /break-tasks → /implement-feature

   Or pick a specific one:
   1. /brainstorm — define requirements & roadmap
   2. /break-tasks — break features into atomic tasks
   3. /guide — help me choose
```

## Chain Transition Detection

After each workflow completes, check what logically comes next:

| Just Finished | Suggest Next |
|--------------|-------------|
| `/brainstorm` | `/documentation` (create specs from PRD) |
| `/documentation` | `/break-tasks` (break specs into tasks) |
| `/break-tasks` | `/implement-feature` (start coding) |
| `/implement-feature` | `/gen-tests` or `/commit` |
| `/gen-tests` | `/commit` |
| `/ui-ux-design` | `/break-tasks` → `/implement-feature` |
| `/qa` | `/commit` |
| `/absorb` | `/break-tasks` (implement absorbed items) |
| `/development` | `/commit` |

## Context Detection

Detect project stage from existing files:

| Files Found | Stage | Suggestion |
|------------|-------|-----------|
| No `docs/` folder | 🆕 Brand new | Start with `/brainstorm` |
| `docs/010-Planning/Roadmap.md` exists | Planning done | `/documentation` or `/break-tasks` |
| `docs/020-Requirements/PRD-*.md` exists | Requirements ready | `/break-tasks` |
| `docs/050-Tasks/Task-*.md` exists | Tasks defined | `/implement-feature` |
| Source code exists but no docs | Legacy project | `/documentation` (Mode A: from codebase) |
| Tests exist but failing | Bug phase | `/development` (debug mode) |
