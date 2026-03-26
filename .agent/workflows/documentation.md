---
description: Generate comprehensive documentation (Architecture, API, Specs) from either Codebase or Requirements.
---

# Documentation Workflow

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                    |
| :------------------------------------------- | :--------------------------------------------- |
| `mcp_sequential-thinking_sequentialthinking` | Analyze complex architecture, design decisions |
| `mcp_context7_query-docs`                    | Research framework patterns, diagram syntax    |

> [!IMPORTANT]
> **AI-OPTIMIZED RULE**: 1 file = 1 concept. All files MUST have frontmatter, wiki-links, and follow `documents.md` naming conventions. No file should exceed ~100 lines — split if necessary.

---

## Step 0: Determine Mode

**Determine the source of truth:**

1. **From Codebase**: Reverse engineer docs from existing code.
2. **From Requirements**: Forward engineer detailed specs (SDD, Stories) from PRD/Roadmap.

---

# MODE A: From Codebase

## Step A1: Codebase Discovery

// turbo

> 💡 **MCP**: Use `sequential-thinking` to analyze unfamiliar project structures

1. **Invoke `[lead-architect]` skill** to analyze codebase structure
2. Identify: tech stack, entry points, API routes, DB schemas
3. **Clarify & Confirm**:
   - **CRITICAL**: If unclear, **ASK** the user for clarification.
   - Summarize findings and **WAIT** for user to confirm

---

## Step A2: Technical Documentation (Architecture, API, Schema)

// turbo

1. **Invoke `[lead-architect]` skill** to create individual files:
   - `docs/030-Specs/Architecture/SDD-{ProjectName}.md` — System Context (C4)
   - `docs/030-Specs/Architecture/Component-{Name}.md` — per major component
   - `docs/030-Specs/Architecture/Sequence-{Flow}.md` — per critical flow
2. **Invoke `[backend-developer]` skill** to create individual files:
   - `docs/030-Specs/API/Endpoint-{Resource}.md` — per API resource group
   - `docs/030-Specs/Schema/DB-Entity-{Name}.md` — per database entity

> [!TIP]
> Each architecture diagram gets its own file. AI finds `Sequence-Auth.md` faster than searching a 500-line SDD.

---

## Step A3: Functional Documentation (Reverse Engineering)

// turbo

**Objective**: Derive business logic from existing implementation.

1. **Invoke `[business-analysis]` skill** to:
   - Analyze codebase to understand user flows
   - Create **individual files per feature** (not monolithic):
     - `docs/022-User-Stories/Epics/Epic-{Feature}.md` — per identified feature
     - `docs/020-Requirements/Use-Cases/UC-{NN}-{Feature}.md` — per user flow
   - Each file has frontmatter with `linked-to` wiki-links
2. **Review**: Present findings to user to confirm alignment

---

## Step A4: Operational & Quality Documentation

// turbo

**Objective**: Document how to run, test, and deploy.

1. **Invoke `[devops-engineer]` skill** to create:
   - `docs/030-Specs/Architecture/Infrastructure.md`
   - `docs/030-Specs/Architecture/Deployment.md`
   - `docs/030-Specs/Configuration.md`
2. **Invoke `[qa-tester]` skill** to create:
   - `docs/035-QA/Test-Plans/Strategy.md`
   - `docs/035-QA/Reports/Coverage.md`
3. **Invoke `[backend-developer]` skill** to create:
   - `docs/060-Manuals/Admin-Guide/Setup-Guide.md`
   - `docs/060-Manuals/Admin-Guide/Scripts.md`

---

## Step A5: Project Planning & Strategy

// turbo

1. **Invoke `[product-manager]` skill** to create:
   - `docs/010-Planning/Roadmap.md` — with `[[Epic-X]]` wiki-links
   - `docs/010-Planning/OKRs.md`
   - `docs/010-Planning/Sprints/Current-Status.md`
2. **Review**: Present for alignment

---

# MODE B: From Requirements

**Prerequisite**: Existing PRD + Epics from `/brainstorm`.

## Step B1: Create SDD (System Design Document)

// turbo

> 💡 **MCP**:
>
> - **MUST** use `sequential-thinking` for architectural decisions
> - Use `context7` with relevant framework docs for tech stack research

1. **Read existing artifacts**: Scan `docs/020-Requirements/PRD-*.md` and `docs/022-User-Stories/Epics/Epic-*.md`
2. **Invoke `[lead-architect]` skill** to draft:
   - High-level system architecture
   - Technology stack decisions
   - Component diagram
   - Data flow overview
3. Create `draft-sdd.md` artifact for review
4. After approval → Save to `docs/030-Specs/Architecture/SDD-{ProjectName}.md`

---

## Step B2: Expand Epics (if needed)

// turbo

> [!IMPORTANT]
> If `/brainstorm` already created `Epic-{Feature}.md` files, **READ and EXPAND** them — don't recreate from scratch.

1. **Read** all `docs/022-User-Stories/Epics/Epic-*.md` files
2. **Invoke `[business-analysis]` skill** to:
   - Expand each Epic with detailed acceptance criteria
   - Add Mermaid sequence/flow diagrams where helpful
   - Create `docs/020-Requirements/Use-Cases/UC-{NN}-{Feature}.md` if missing
3. Update wiki-links between Epics and Use Cases

---

## Step B3: Create Individual User Stories

// turbo

> [!IMPORTANT]
> **1 Story file per Epic**. Never create a monolithic `all-user-stories.md`.

For **each Epic** in `docs/022-User-Stories/Epics/`:

1. **Invoke `[business-analysis]` skill** to create:
   - `docs/022-User-Stories/Backlog/Story-{FeatureName}.md`

```yaml
---
id: STORY-{NNN}
type: story
status: draft
created: YYYY-MM-DD
linked-to: [[Epic-{FeatureName}]]
complexity: S|M|L|XL
---
```

Content:
- **As a** {user}, **I want** {action}, **so that** {benefit}
- **Acceptance Criteria** — checkable list
- **Tasks** — grouped checklist for implementation

2. After review → keep in `Backlog/` (moves to `Active-Sprint/` during implementation)

---

## Step B4: Create ADRs (Optional)

// turbo

**Skip if**: User did not request ADRs.

1. **Invoke `[lead-architect]` skill** to document each technical decision as individual file:
   - `docs/030-Specs/Architecture/ADR-{NNN}-{Decision}.md`

---

# Finalize

## Step X: Finalize

// turbo

1. **Create/update ALL MOC files** in populated folders:
   - `docs/010-Planning/Planning-MOC.md`
   - `docs/020-Requirements/Requirements-MOC.md`
   - `docs/022-User-Stories/Stories-MOC.md`
   - `docs/030-Specs/Specs-MOC.md`
   - `docs/035-QA/QA-MOC.md`
   - `docs/040-Design/Design-MOC.md`
   - `docs/060-Manuals/Manuals-MOC.md`
2. **Validate** wiki-links and frontmatter across all created files
3. Present summary:
   - Total files created (by Dewey folder)
   - Wiki-link graph overview
   - Suggest next steps: `/ui-ux-design` or `/implement-feature`

---

## AI-Optimization Checklist

Before finishing, verify:
- [ ] Every file has frontmatter (id, type, status, created, linked-to)
- [ ] No monolithic files — 1 concept per file
- [ ] All cross-references use `[[wiki-links]]`
- [ ] MOC files updated for every populated folder
- [ ] No file exceeds ~100 lines
- [ ] Naming follows `documents.md` conventions exactly
