# PRD Development Guide

> Source: Dean Peters — Product-Manager-Skills (prd-development)

## PRD Structure (10 Sections)

```markdown
# [Feature] PRD

## 1. Executive Summary       — One paragraph: problem + solution + impact
## 2. Problem Statement       — Who, what, why, evidence (quotes + data)
## 3. Target Users & Personas — Primary + secondary personas + JTBD
## 4. Strategic Context        — OKRs, market opportunity, why now?
## 5. Solution Overview        — High-level description + user flows
## 6. Success Metrics          — Primary, secondary, guardrail metrics
## 7. User Stories             — Epic hypothesis + acceptance criteria
## 8. Out of Scope             — What we're NOT building + why
## 9. Dependencies & Risks     — Technical, external, team deps
## 10. Open Questions          — Unresolved decisions
```

## Key Principles
- PRD frames problem + solution, NOT pixel-perfect spec
- Living document — evolves as you learn
- Write exec summary first (forces clarity), refine last

## Success Metrics Template

| Type | Definition | Example |
|------|-----------|---------|
| **Primary** | ONE metric to optimize | Activation rate 40%→60% |
| **Secondary** | Monitor, don't optimize for | Time-to-first-action |
| **Guardrail** | Must NOT get worse | Signup conversion rate |

## User Story Format

```
As a [persona],
I want to [action],
so that [outcome].

Acceptance Criteria:
- [ ] When [trigger], then [behavior]
- [ ] Given [context], when [action], then [result]
```

## Anti-Patterns
- ❌ Written in isolation → collaborate with design + eng
- ❌ No evidence in problem statement → include quotes + data
- ❌ Too prescriptive → let design own UI details
- ❌ No success metrics → always define primary metric
- ❌ No out-of-scope → leads to scope creep
