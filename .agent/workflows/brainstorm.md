---
description: Analyze ideas with the user and create preliminary high-level documents (Roadmap, PRD).
---

# Brainstorm Workflow

## HARD-GATE: Design Before Implementation

> [!CAUTION]
> Do NOT invoke any implementation skill, write any code, scaffold any project, or take
> any implementation action until you have presented a design and the user has approved it.
> This applies to EVERY request regardless of perceived simplicity.

**Anti-Pattern: "This Is Too Simple To Need A Design"**
Every project goes through this process. A todo list, a single-function utility, a config change — all of them.
"Simple" projects are where unexamined assumptions cause the most wasted work.
The design can be short (a few sentences for truly simple projects), but you MUST present it and get approval.

---

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                            | Example                                 |
| :------------------------------------------- | :----------------------------------------------------- | :-------------------------------------- |
| `mcp_sequential-thinking_sequentialthinking` | Analyze requirements, feature dependencies, trade-offs | Break down ambiguous requests           |
| `mcp_context7_query-docs`                    | Research library patterns, APIs, best practices        | "How to setup auth in Next.js"          |
| `search_web`                                 | Proactive research for implementation patterns         | "best architecture for agentic systems" |

---

## Step 1: Iterative Requirement Analysis & Research

> [!IMPORTANT]
> **LOOP THIS STEP**: Cycle until the user's requirements are crystal clear.

**Goal**: Achieve a "Shared Understanding" with the user.

1. **Analyze (Internal)**:
   - Use `mcp_sequential-thinking_sequentialthinking` to breakdown the request.
   - Explore angles, edge cases, and creative possibilities.
   - Identify gaps, missing features, or ambiguous terms.

2. **Research (External)**:
   - Use `search_web` to understand domain, competitors, best practices.
   - Use `read_url_content` for specific references.
   - Verify technical feasibility.

3. **Clarify (Interaction)**:
    - **ONE question per message** — don't overwhelm with multiple questions
    - Prefer **multiple choice** questions when possible (easier to answer than open-ended)
    - If a topic needs more exploration, break it into multiple questions
    - Summarize findings in an artifact.
    - Ask specific questions to resolve ambiguities.
    - **WAIT** for user response.

4. **Evaluation**:
   - New info? → **GO TO 1.1** (Repeat).
   - User confirms → **BREAK LOOP**, go to Step 2.

---

## Step 2: Create Roadmap

// turbo

> 💡 **MCP**: Use `sequential-thinking` for phased planning and risk assessment.

1. **Invoke `[product-manager]` skill** to draft:
   - Project timeline and milestones
   - Phase breakdown (MVP, v1.0, v2.0)
   - Key deliverables per phase — **each major feature becomes a wiki-link**: `[[Epic-{Feature}]]`
2. Create `draft-roadmap.md` artifact for review
3. After approval → Save to `docs/010-Planning/Roadmap-{ProjectName}.md`
4. **WAIT** for user response

---

## Step 3: Create PRD & Atomized Feature Docs

// turbo

> [!IMPORTANT]  
> **AI-OPTIMIZED RULE**: 1 file = 1 concept. Never dump all features into 1 monolithic PRD.
> All files MUST follow `documents.md` conventions: frontmatter, naming, wiki-links.

### Step 3.1: PRD Overview

1. **Invoke `[product-manager]` skill** to draft a **concise** PRD overview:
   - Business objectives and success metrics
   - Target audience/user personas (brief)
   - Feature list — each feature is a wiki-link: `[[Epic-{Feature}]]`
   - Technical constraints
2. Save to `docs/020-Requirements/PRD-{ProjectName}.md`

> [!TIP]  
> PRD should be **max 50-80 lines**. Details go in individual Epic/Use Case files.

### Step 3.2: Create Individual Epic Files

For **each major feature** identified in the PRD:

1. Create `docs/022-User-Stories/Epics/Epic-{FeatureName}.md` with:

```yaml
---
id: EPIC-{NNN}
type: epic
status: draft
created: YYYY-MM-DD
linked-to: [[PRD-{ProjectName}]]
---
```

Content sections:
- **Summary** — What this feature does (2-3 sentences)
- **User Value** — Why users need this
- **Scope** — What's included, what's explicitly NOT included
- **Acceptance Criteria** — Checkable conditions for "done"
- **Related**: `[[UC-{NN}-{Feature}]]`, `[[Story-{Feature}]]`

### Step 3.3: Create Individual Use Case Files

For **each feature** that has user-facing flows:

1. Create `docs/020-Requirements/Use-Cases/UC-{NN}-{FeatureName}.md` with:

```yaml
---
id: UC-{NN}
type: use-case
status: draft
created: YYYY-MM-DD
linked-to: [[Epic-{FeatureName}]]
---
```

Content sections:
- **Actor** — Who performs this action
- **Preconditions** — What must be true before
- **Main Flow** — Numbered steps (happy path)
- **Alternative Flows** — Edge cases, error handling
- **Postconditions** — What's true after success

### Step 3.4: Create MOC Files

Create/update Map of Content files for each populated folder:

- `docs/010-Planning/Planning-MOC.md` — links to Roadmap
- `docs/020-Requirements/Requirements-MOC.md` — links to PRD + Use Cases
- `docs/022-User-Stories/Stories-MOC.md` — links to all Epics

**WAIT** for user to review all artifacts before proceeding.

---

## Step 4: Transition

1. Present summary:
   - File count created
   - Wiki-link graph (which files reference which)
   - Any gaps identified
2. Suggest next step: `/documentation` (SDD, Stories) or `/implement-feature`

---

## Quick Reference

| Step | Skill           | Output |
| :--- | :-------------- | :----- |
| 1    | (analysis loop) | Shared understanding |
| 2    | product-manager | `Roadmap-{Name}.md` |
| 3.1  | product-manager | `PRD-{Name}.md` (overview) |
| 3.2  | product-manager | `Epic-{Feature}.md` × N |
| 3.3  | business-analysis | `UC-{NN}-{Feature}.md` × N |
| 3.4  | — | MOC files |

## AI-Optimization Checklist

Before finishing, verify:
- [ ] Every file has frontmatter (id, type, status, created, linked-to)
- [ ] PRD references all Epics via `[[wiki-links]]`
- [ ] Roadmap phases reference Epics via `[[wiki-links]]`
- [ ] Each Epic references its Use Cases
- [ ] MOC files list all documents in their folder
- [ ] No file exceeds ~100 lines (split if necessary)
