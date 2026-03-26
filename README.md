# ⚡ Antigravity Kit

> **AI Agent Kit** — Skills, Workflows, Knowledge Graph & intelligent routing for AI-powered coding.

[![npm](https://img.shields.io/npm/v/@jhm1909/ag-kit)](https://www.npmjs.com/package/@jhm1909/ag-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🚀 Quick Start

```bash
# Install full kit in your project
npx @jhm1909/ag-kit init

# Or install a specific profile
npx @jhm1909/ag-kit init --profile fullstack-saas
```

## ✨ What's Inside

| Component | Count | Description |
|-----------|-------|-------------|
| **Skills** | 13 | Expert AI skill definitions (frontend, backend, AI, blockchain...) |
| **Sub-skills** | 10 | Specialized child skills (React/Next.js, Expo, Remotion...) |
| **Workflows** | 11 | Reusable task automation (brainstorm, dev, testing, docs...) |
| **Rules** | 5 | Coding standards and guidelines |
| **Knowledge Graph** | 1 | Smart routing between skills via `graph-index.json` |
| **MOCs** | 5 | Maps of Content for domain navigation |

## 🎯 Skills

| Skill | Domain | Description |
|-------|--------|-------------|
| `frontend-developer` | Web | React, Vue, Angular, performance, accessibility |
| `backend-developer` | Infra | API design, system architecture, security |
| `mobile-developer` | Mobile | React Native, Expo (9 sub-skills) |
| `designer` | Design | UI/UX, branding, design systems |
| `ai-engineer` | AI | GenAI, RAG, agentic systems, evaluation |
| `blockchain-engineer` | Blockchain | Smart contracts, DeFi, security auditing |
| `devops-engineer` | Infra | CI/CD, Docker, Kubernetes, observability |
| `lead-architect` | Architecture | System design, ADRs, RFCs, scalability |
| `project-manager` | Management | PRDs, roadmaps, task decomposition |
| `business-analysis` | Analysis | Requirements, specs, agile docs |
| `qa-tester` | Quality | Unit/E2E/Security/Performance testing |
| `marketer` | Marketing | SEO, content strategy, video (Remotion) |
| `prompt-engineer` | AI | Prompt design, skill authoring |

## 📦 Profiles

Install only what you need:

```bash
npx @jhm1909/ag-kit init --profile web-frontend
npx @jhm1909/ag-kit init --profile fullstack-saas
npx @jhm1909/ag-kit init --profile mobile-app
npx @jhm1909/ag-kit init --profile ai-powered-app
npx @jhm1909/ag-kit init --profile video-content
```

| Profile | Skills Included |
|---------|----------------|
| `web-frontend` | frontend-developer, designer + optional react-nextjs, threejs |
| `fullstack-saas` | frontend, backend, devops, PM, QA + optional react-nextjs, ai-engineer |
| `mobile-app` | mobile-developer, designer, QA + optional backend |
| `ai-powered-app` | ai-engineer, frontend, backend + optional lead-architect |
| `video-content` | marketer, frontend, remotion + optional threejs |

## 🧠 Knowledge Graph

Unlike flat skill collections, Antigravity Kit uses a **knowledge graph** (`graph-index.json`) for intelligent routing:

```
┌──────────────────────────────────────────────────┐
│           Knowledge Graph Router                  │
│                                                  │
│  User Request → Match Triggers → Load Skills     │
│       ↓                                          │
│  Check extends/requires/suggests → Load Chain    │
│       ↓                                          │
│  Apply MOC Context → Route to Expert Skill       │
└──────────────────────────────────────────────────┘
```

**Relationships:**
- `extends` — Skill inherits patterns from parent
- `requires` — Hard dependency (must be loaded)
- `suggests` — Optional enhancement
- `conflicts` — Mutual exclusion
- `enhances` — Add-on capability

## 🔧 CLI Commands

```bash
ag-kit init                    # Install full kit
ag-kit init --profile <name>   # Install specific profile
ag-kit init --force            # Overwrite existing
ag-kit list                    # Show profiles & skills
ag-kit status                  # Check installed version
ag-kit help                    # Show help
```

## 🏗️ Project Structure

```
your-project/
└── .agent/
    ├── skills/              # 13 expert skills + 10 sub-skills
    │   ├── frontend-developer/
    │   ├── backend-developer/
    │   ├── mobile-developer/
    │   │   ├── SKILL.md
    │   │   ├── api-routes/
    │   │   ├── building-ui/
    │   │   └── ...9 sub-skills
    │   └── ...
    ├── workflows/           # 11 task automations
    │   ├── brainstorm.md
    │   ├── development.md
    │   └── ...
    ├── rules/               # 5 coding standards
    ├── mocs/                # 5 Maps of Content
    ├── graph-index.json     # Knowledge graph
    └── skills-manifest.json # Skill metadata & profiles
```

## 🌐 Compatibility

Works with any AI coding assistant that reads `.agent/` directory:

- ✅ **Claude Code** (Anthropic)
- ✅ **Cursor** (Anysphere)
- ✅ **Gemini CLI** (Google)
- ✅ **GitHub Copilot** (Microsoft)

Skills follow the [agentskills.io](https://agentskills.io) specification for maximum cross-platform compatibility.

## 📄 License

MIT © [jhm1909](https://github.com/jhm1909)
