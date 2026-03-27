---
name: project-manager
description: >
  Project planning, roadmapping, requirements, prioritization, and skill management.
  Use for PRDs, user stories, RICE/Kano, discovery, and process automation.
  Upgraded with Dean Peters product management frameworks.
license: MIT
compatibility: Claude Code, Cursor, Gemini CLI, GitHub Copilot
metadata:
  author: jhm1909
  version: "5.0.0"
  domain: management
  estimated_tokens: 12000
  sources:
    - deanpeters/Product-Manager-Skills (discovery, PRD, JTBD, 73 PM skills)
---

# Project Manager

Deliver value through efficient systems and clear processes.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[business-analysis]], [[qa-tester]], [[lead-architect]], [[designer]]
- **conflicts**: []
- **enhances**: [[frontend-developer]], [[backend-developer]], [[mobile-developer]] (skill detection), [[business-analysis]] (requirements)
- **moc**: [[product-development-moc]]

## Core Philosophy

1. **Outcome & Efficiency** ??Value (Product) through efficient systems (Process)
2. **Voice of User & Team** ??Represent user in requirements, team in process
3. **Ruthless Prioritization** ??"No" protects focus
4. **Automated Governance** ??Automate rules, don't just follow them

## Decision Tree

```
What PM activity is needed?
???œâ? Discovery / Research?
?? ?”â? Read: discovery-process.md (6-phase workflow)
???œâ? PRD / Requirements?
?? ?”â? Read: prd-development.md (10-section template)
???œâ? Understanding customer needs?
?? ?”â? Read: jobs-to-be-done.md (JTBD framework)
???œâ? Strategic planning?
?? ?”â? Use: strategic-frameworks (Roadmap, OKRs)
???”â? Process / Governance?
   ?”â? Use: rules-guide, workflows-guide
```

## Capabilities

| Capability | Keywords | Router |
|:-----------|:---------|:-------|
| **Strategic Planning** | Roadmap, Vision, OKRs | `strategic-frameworks` |
| **Requirements** | PRD, Specs, User Stories | `prd-template`, `user-story-template` |
| **Discovery** | Research, Interviews, JTBD | `discovery_process`, `jobs_to_be_done` |
| **Process** | Rules, Workflows | `rules-guide`, `workflows-guide` |
| **Decomposition** | Breakdown, Estimation | `task-decomposition` |
| **Skill Management** | Create/Update skills | `skill-questionnaire` |

## Quick Rules

- **Repeated 3x?** ??Make a **Workflow** (`.agent/workflows/`)
- **Mistake 2x?** ??Make a **Rule** (`.agent/rules/`)
- **Domain-specific?** ??Consult **[[business-analysis]]**

## Skill Detection Matrix

| Domain | Required Skill |
|:-------|:---------------|
| Frontend/UI | [[frontend-developer]] |
| Backend/API | [[backend-developer]] |
| Mobile | [[mobile-developer]] |
| Design | [[designer]] |
| Infrastructure | [[devops-engineer]] |
| AI/LLM | [[ai-engineer]] |
| Blockchain | [[blockchain-engineer]] |
| Video | [[remotion-best-practices]] |

## References

| Reference | Purpose |
|:----------|:--------|
| `router.json` | Find templates by keyword |
| `templates/adr.md` | Architecture Decision Record |
| `templates/rfc.md` | Request for Comments |
| `templates/prd-template.md` | Product Requirements |
| `templates/user-story-template.md` | User stories |
| `discovery-process.md` | Product discovery 6-phase workflow (Dean Peters) |
| `prd-development.md` | Structured PRD creation guide (Dean Peters) |
| `jobs-to-be-done.md` | JTBD framework (Dean Peters) |

## Related Skills

- [[business-analysis]] ??Deep requirements analysis
- [[qa-tester]] ??Quality and testing
- [[lead-architect]] ??High-level technical decisions

---

*Orchestrates all other skills | Hub for project governance | Dean Peters frameworks integrated*
