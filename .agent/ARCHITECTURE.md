# Antigravity Kit Architecture

> **ag-kit** — Modular AI Agent Capability Expansion Toolkit

---

## Overview

Antigravity Kit is a multi-layer system:

```
USER → /guide (Layer 1: Discovery)
  → Workflow Chain (Layer 2: Orchestration)
    → Invoke [skill] (Layer 3: Expertise)
      → Manifest (Layer 4: Routing)
        → Rules (Layer 5: Guardrails)
```

**Philosophy**: Friendly for beginners (guided workflows), powerful for experts (direct skill invocation).

---

## Directory Structure

```
.agent/
├── ARCHITECTURE.md           # This file
├── skills-manifest.json      # Single source of truth (v3.0)
├── known-registries.json     # External skill registries
├── mcp_config.json           # MCP server template
├── skills/                   # 20 Skills + sub-skills
│   ├── ai-engineer/
│   ├── app-builder/
│   ├── backend-developer/
│   ├── blockchain-engineer/
│   ├── business-analysis/
│   ├── code-review/          # v2 — Trail of Bits security methodology
│   ├── context-engineering/
│   ├── debugging/
│   ├── designer/
│   ├── devops-engineer/
│   ├── frontend-developer/   # v4 — Vercel React rules
│   │   ├── react-nextjs/
│   │   ├── threejs/
│   │   └── references/       # react_performance_rules, composition_patterns
│   ├── game-development/
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
│   ├── modern-python/        # Trail of Bits toolchain
│   ├── project-manager/      # v5 — Dean Peters frameworks
│   │   └── references/       # discovery_process, prd_development, jobs_to_be_done
│   ├── prompt-engineer/
│   ├── qa-tester/            # v3 — Trail of Bits security audit
│   │   └── references/       # security_audit, supply_chain, PBT, etc.
│   └── research-first/
├── workflows/                # 15 Workflows
│   ├── guide.md              # 🧭 Discovery
│   ├── brainstorm.md         # 💡 Planning
│   ├── documentation.md      # 📚 Specs
│   ├── break-tasks.md        # 📋 Task breakdown
│   ├── implement-feature.md  # 🔨 Coding
│   ├── development.md        # 🐛 Quick fixes
│   ├── debug.md              # 🔬 Scientific debugging
│   ├── ui-ux-design.md       # 🎨 Design
│   ├── qa.md                 # 🧪 Test plans
│   ├── gen-tests.md          # ✅ Test code
│   ├── absorb.md             # 🔍 Study reference kits
│   ├── commit.md             # 📦 Git (3-mode)
│   ├── bootstrap.md          # 🚀 Project scaffolding
│   ├── install-skill.md      # 📥 On-demand skill installer
│   └── custom-behavior.md    # ⚙️ Meta-config
├── rules/                    # 10 Always-on Rules
│   ├── clean-code.md
│   ├── documents.md          # Dewey Decimal doc structure
│   ├── git-workflow.md
│   ├── nano-banana.md        # Image generation convention
│   ├── research.md
│   ├── skill-loading.md      # Skill activation protocol
│   ├── skill-suggestion.md   # Auto-suggest skills
│   ├── testing.md
│   ├── workflow-advisor.md   # Auto-suggest workflow chains
│   └── workflow-skill-convention.md  # Layer architecture
└── tmp/                      # Temporary files (gitignored)
```

---

## Skills (20 primary + sub-skills)

| Skill | Domain | Version | Sources |
|-------|--------|---------|---------|
| `project-manager` | management | v5.0 | Dean Peters PM frameworks |
| `business-analysis` | analysis | — | — |
| `qa-tester` | qa | v3.0 | Trail of Bits security |
| `code-review` | qa | v2.0 | Trail of Bits differential review |
| `frontend-developer` | web | v4.0 | Vercel React rules |
| `backend-developer` | infra | — | — |
| `mobile-developer` | mobile | — | — |
| `designer` | design | — | — |
| `devops-engineer` | infra | — | — |
| `lead-architect` | infra | — | — |
| `ai-engineer` | ai | — | — |
| `blockchain-engineer` | blockchain | — | — |
| `marketer` | marketing | — | — |
| `prompt-engineer` | ai | — | — |
| `app-builder` | meta | — | — |
| `game-development` | game | — | — |
| `context-engineering` | meta | — | — |
| `debugging` | qa | — | — |
| `research-first` | meta | — | — |
| `modern-python` | tooling | v1.0 | Trail of Bits uv/ruff/ty |

---

## Workflows (15)

### Workflow Chains

```
New Project:    /brainstorm → /documentation → /break-tasks → /implement-feature → /commit
New Feature:    /break-tasks → /implement-feature → /gen-tests → /commit
Bug Fix:        /development → /gen-tests → /commit
Debug:          /debug → /commit
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

## Rules (10)

| Rule | Purpose |
|------|---------|
| `clean-code` | Coding standards |
| `documents` | Dewey Decimal doc structure |
| `git-workflow` | Branch strategy, commit format |
| `nano-banana` | Image generation convention |
| `research` | Deep research protocol |
| `skill-loading` | Skill activation routing |
| `skill-suggestion` | Auto-suggest relevant skills |
| `testing` | Test coverage requirements |
| `workflow-advisor` | Auto-suggest workflow chains |
| `workflow-skill-convention` | 5-layer architecture enforcement |

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

## Statistics

| Metric | Count |
|--------|------:|
| Skills | 20 primary + sub-skills |
| Workflows | 15 |
| Rules | 10 |
| Profiles | 6 |
| Absorbed Sources | Trail of Bits, Vercel, Dean Peters |
