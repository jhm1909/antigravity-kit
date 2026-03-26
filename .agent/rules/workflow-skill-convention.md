---
trigger: model_decision
description: Convention for how workflows must invoke skills — the multi-layer architecture
---

# Workflow ↔ Skill Convention

## Multi-Layer Architecture

```
┌───────────────────────────────────────────────┐
│                   USER                         │
│         "I want to build a SaaS app"          │
├───────────────────────────────────────────────┤
│              LAYER 1: Guide                    │
│   /guide detects intent → recommends chain    │
├───────────────────────────────────────────────┤
│           LAYER 2: Workflow Chain              │
│   /brainstorm → /documentation → /break-tasks │
├───────────────────────────────────────────────┤
│            LAYER 3: Skills                     │
│   Each step invokes expert skills:            │
│   [project-manager] → [lead-architect] →      │
│   [business-analysis] → [frontend-developer]  │
├───────────────────────────────────────────────┤
│          LAYER 4: Manifest                    │
│   skills-manifest.json routes dependencies:   │
│   extends, requires, suggests, conflicts      │
├───────────────────────────────────────────────┤
│            LAYER 5: Rules                      │
│   Always-on guardrails: clean-code, testing,  │
│   git-workflow, skill-loading, research       │
└───────────────────────────────────────────────┘
```

## Critical Rules (MUST Follow)

1. **MUST** invoke at least one skill per major workflow step
2. **MUST** use the format: `**Invoke \`[skill-name]\` skill** to <action>`
3. **MUST** invoke the most relevant skill — not just any skill
4. **MUST NOT** create workflows that are just shell commands without skill context
5. **MUST NOT** invoke skills for trivial operations (file copy, git status)

## Skill Selection Guide

| Workflow Step Doing... | Invoke This Skill |
|----------------------|-------------------|
| Analyzing requirements | `[business-analysis]` |
| Planning roadmap / PRD | `[project-manager]` |
| Architecture decisions | `[lead-architect]` |
| Breaking into tasks | `[lead-architect]` + `[business-analysis]` |
| UI/UX design | `[designer]` |
| Frontend code | `[frontend-developer]` |
| Backend/API code | `[backend-developer]` |
| Mobile code | `[mobile-developer]` |
| Testing | `[qa-tester]` |
| Research | `[research rule]` (not a skill, but activates deep research) |
| DevOps / deploy | `[devops-engineer]` |
| Security review | `[blockchain-engineer]` or domain-specific |
| AI/LLM integration | `[ai-engineer]` |

## Why This Matters

### For Beginners (non-technical users)
- They type `/guide` → AI suggests the chain
- Each workflow step tells AI which **expert mindset** to adopt
- Result: expert-level output without knowing anything about skills

### For Experienced Developers
- They can call any workflow directly or skip steps
- Skills provide **domain-specific best practices** they might miss
- Knowledge graph prevents loading conflicting or redundant skills
- They can override: "skip the research step" → workflow adapts

### For the AI
- Skills are **not decorative** — they change the AI's behavior
- `Invoke [lead-architect]` = think about system design, scalability, trade-offs
- `Invoke [qa-tester]` = think about edge cases, test coverage, regression
- Without skill invocation, AI defaults to generic responses
- With skill invocation, AI activates domain expertise

## Example: Good vs Bad Workflow Step

### ❌ Bad (no skill, vague instruction)
```markdown
## Step 2: Create Plan
1. Create a plan document
2. Save to docs/
```

### ✅ Good (skill invoked, specific actions)
```markdown
## Step 2: Create Plan

**Invoke `[lead-architect]` skill** to analyze technical requirements.
**Invoke `[project-manager]` skill** to create phased roadmap.

1. Break project into phases (MVP → v1.0 → v2.0)
2. Identify dependencies between features
3. Estimate complexity per phase
4. Create `docs/010-Planning/Roadmap-{Name}.md`
```

## Workflow Template

When creating new workflows, follow this template:

```markdown
---
description: <what this workflow does>
---

# Workflow Name

## Step N: <Step Name>

// turbo (if safe to auto-run)

**Invoke `[relevant-skill]` skill** to <specific action>.

> **For beginners**: <explain what happens in simple terms>
> **For experts**: <mention what can be skipped or customized>

1. <Specific action>
2. <Specific action>
3. **WAIT** for user input (if needed)
```
