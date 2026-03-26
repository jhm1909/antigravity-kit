---
name: business-analysis
description: >
  Requirements analysis, technical specs, agile documentation. Use for bridging business goals to technical implementation.
license: MIT
compatibility: Claude Code, Cursor, Gemini CLI, GitHub Copilot
metadata:
  author: jhm1909
  version: "2.0.0"
  domain: analysis
  estimated_tokens: 8000
---

# Business Analysis

Bridge the gap between abstract business goals and concrete technical implementation.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[project-manager]], [[lead-architect]], [[designer]], [[frontend-developer]], [[backend-developer]]
- **conflicts**: []
- **enhances**: [[qa-tester]] (acceptance criteria), [[lead-architect]] (technical specs)
- **moc**: [[product-development-moc]]

## Core Philosophy

1. **Gap Analysis First** — Analyze constraint conflicts before solutions
2. **Sequential Thinking** — Break down step-by-step, don't guess
3. **Visuals First** — Diagrams are truth (text is ambiguous)
4. **Obsidian Native** — Graph-ready docs with `[[Wiki-links]]`
5. **Agile Orthodoxy** — User Stories (INVEST), Acceptance Criteria (Gherkin)
6. **Multiple Perspectives** — Strategic, Product, Technical

## Perspectives

| Perspective | Focus | Output |
|:------------|:------|:-------|
| 🎩 **Strategic** | ROI, KPIs, Roadmap | BRD |
| 🎩 **Product** | UX, Features, Flows | PRD, User Stories |
| 🎩 **Technical** | Schema, APIs, States | Technical Spec |

## Workflow

1. **Market & Domain Research** — `search_web` for validation
2. **Requirement Gathering** — Specific constraints, not "what do you want?"
3. **Logic & Flow Analysis** — Happy path, negative path, edge cases
4. **Diagramming** — Mermaid diagrams (state, sequence, class)
5. **Documentation** — PRD, Specs, User Stories
6. **Link** — Update MOCs with new documents

## Domain Knowledge

| Domain | Path |
|:-------|:-----|
| SaaS | `references/domains/saas.md` |
| FinTech | `references/domains/fintech.md` |
| E-Commerce | `references/domains/ecommerce.md` |
| HealthTech | `references/domains/healthtech.md` |
| EdTech | `references/domains/education.md` |
| Blockchain | `references/domains/blockchain-dapp.md` |
| AI/ML | `references/domains/ai-agent.md` |
| Marketplace | `references/domains/marketplace.md` |

## Templates

| Template | Purpose |
|:---------|:--------|
| `prd-functional.md` | Detailed PRD |
| `user-story-detailed.md` | Gherkin syntax, dev notes |
| `brd.md` | Business Requirements |
| `use-case.md` | Actor flows, exceptions |
| `change-request.md` | Impact analysis |

## Related Skills

- [[project-manager]] — Planning and coordination
- [[lead-architect]] — Technical design
- [[designer]] — UX implementation
- [[qa-tester]] — Acceptance criteria validation

---

*Requirements to implementation | Domain expertise hub*
