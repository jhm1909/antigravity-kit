# Antigravity Kit Architecture

> **ag-kit** — Modular AI Agent Capability Expansion Toolkit

---

## Overview

Antigravity Kit is a multi-layer system:

```
USER → /guide (Layer 1: Discovery)
  → Workflow Chain (Layer 2: Orchestration)
    → Invoke [skill] (Layer 3: Expertise)
      → Knowledge Graph (Layer 4: Routing)
        → Rules (Layer 5: Guardrails)
```

**Philosophy**: Friendly for beginners (guided workflows), powerful for experts (direct skill invocation).

---

## Directory Structure

```
.agent/
├── ARCHITECTURE.md           # This file
├── graph-index.json          # Knowledge graph (v3.0)
├── skills-manifest.json      # Skill metadata + triggers (v2.0)
├── mcp_config.json           # MCP server template
├── skills/                   # 13 Skills + sub-skills
│   ├── ai-engineer/
│   ├── backend-developer/
│   ├── blockchain-engineer/
│   ├── business-analysis/
│   ├── designer/
│   ├── devops-engineer/
│   ├── frontend-developer/
│   │   ├── react-nextjs/     # Sub-skill
│   │   └── threejs/          # Sub-skill
│   ├── lead-architect/
│   ├── marketer/
│   │   └── remotion-best-practices/
│   ├── mobile-developer/
│   │   ├── api-routes/
│   │   ├── building-ui/
│   │   ├── data-fetching/
│   │   ├── deployment/
│   │   ├── dev-client/
│   │   ├── tailwind-setup/
│   │   ├── upgrading-expo/
│   │   └── use-dom/
│   ├── project-manager/
│   ├── prompt-engineer/
│   └── qa-tester/
├── workflows/                # 14 Workflows
│   ├── guide.md              # 🧭 Discovery
│   ├── brainstorm.md         # 💡 Planning
│   ├── documentation.md      # 📚 Specs
│   ├── break-tasks.md        # 📋 Task breakdown
│   ├── implement-feature.md  # 🔨 Coding
│   ├── development.md        # 🐛 Quick fixes
│   ├── ui-ux-design.md       # 🎨 Design
│   ├── qa.md                 # 🧪 Test plans
│   ├── gen-tests.md          # ✅ Test code
│   ├── absorb.md             # 🔍 Study reference kits
│   ├── commit.md             # 📦 Git (3-mode)
│   ├── bootstrap.md          # 🚀 Project scaffolding
│   └── custom-behavior.md    # ⚙️ Meta-config
├── rules/                    # 9 Always-on Rules
│   ├── clean-code.md
│   ├── documents.md          # Dewey Decimal doc structure
│   ├── git-workflow.md
│   ├── nano-banana.md        # Image generation convention
│   ├── research.md
│   ├── skill-loading.md      # Skill activation protocol
│   ├── testing.md
│   ├── workflow-advisor.md   # Auto-suggest workflow chains
│   └── workflow-skill-convention.md  # Layer architecture
└── tmp/                      # Temporary files (gitignored)
```

---

## Skills (13 + 12 sub-skills)

| Skill | Domain | Triggers | Used By Workflows |
|-------|--------|----------|-------------------|
| `project-manager` | management | roadmap, PRD, sprint | brainstorm, guide, absorb |
| `business-analysis` | analysis | requirements, persona | documentation, absorb, break-tasks |
| `lead-architect` | infra | architecture, ADR | documentation, absorb, implement-feature |
| `frontend-developer` | web | react, css, component | implement-feature, ui-ux-design |
| `backend-developer` | infra | API, auth, database | implement-feature, documentation |
| `mobile-developer` | mobile | expo, react-native | implement-feature |
| `designer` | design | UI, UX, figma | ui-ux-design, implement-feature |
| `devops-engineer` | infra | docker, CI/CD | documentation |
| `ai-engineer` | ai | LLM, RAG, agentic | implement-feature |
| `qa-tester` | qa | testing, E2E | gen-tests, qa, documentation |
| `blockchain-engineer` | blockchain | web3, solidity | implement-feature |
| `marketer` | marketing | SEO, social media | — |
| `prompt-engineer` | ai | system prompt, few-shot | — |

---

## Workflows (14)

### Workflow Chains

```
New Project:    /brainstorm → /documentation → /break-tasks → /implement-feature → /commit
New Feature:    /break-tasks → /implement-feature → /gen-tests → /commit
Bug Fix:        /development → /gen-tests → /commit
UI/UX:          /ui-ux-design → /break-tasks → /implement-feature → /commit
Study Kit:      /absorb → /break-tasks → /implement-feature → /commit
MVP Sprint:     /brainstorm → /documentation → [/break-tasks → /implement-feature → /commit] × N
```

### Commit Modes

| Mode | Branch | Diff | .gitignore | Protected | Message | Push |
|------|--------|------|------------|-----------|---------|------|
| ⚡ Quick | skip | brief | skip | skip | auto | auto |
| 🛡️ Safe | check | full | auto-fix | confirm | approve | auto |
| 🎛️ Custom | ask | full | ask | list all | edit | ask |

---

## Rules (9)

| Rule | Type | Purpose |
|------|------|---------|
| `clean-code` | auto | Coding standards |
| `documents` | auto | Dewey Decimal doc structure |
| `git-workflow` | auto | Branch strategy, commit format |
| `nano-banana` | auto | Image generation convention |
| `research` | auto | Deep research protocol |
| `skill-loading` | auto | Skill activation routing |
| `testing` | auto | Test coverage requirements |
| `workflow-advisor` | auto | Auto-suggest workflow chains |
| `workflow-skill-convention` | auto | 5-layer architecture enforcement |

---

## Profiles

Pre-configured skill bundles (via `ag-kit init --profile`):

| Profile | Skills | Optional |
|---------|--------|----------|
| `web-frontend` | frontend, designer | react-nextjs, threejs |
| `fullstack-saas` | frontend, backend, devops, PM, QA | react-nextjs, ai-engineer |
| `mobile-app` | mobile, designer, QA | backend |
| `video-content` | marketer, frontend, remotion | threejs |
| `ai-powered-app` | ai-engineer, frontend, backend | lead-architect |
| `blockchain-dapp` | blockchain, frontend, backend | devops |

---

## CLI

```bash
npx ag-kit init              # Setup .agent/ in your project
npx ag-kit init --profile web-frontend  # Profile-based setup
npx ag-kit list              # Show installed skills
npx ag-kit status            # Kit integrity check
```

---

## Statistics

| Metric | Count |
|--------|------:|
| Skills | 13 primary + 12 sub-skills |
| Workflows | 14 |
| Rules | 9 |
| Profiles | 6 |
| CLI Commands | 4 |
| Knowledge Graph Nodes | 45 |
