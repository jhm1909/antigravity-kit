<p align="center">
  <img src="https://img.shields.io/badge/Antigravity_Kit-v0.1.0-8B5CF6?style=for-the-badge&labelColor=1a1a2e" alt="Antigravity Kit" />
</p>

<h1 align="center">Antigravity Kit</h1>

<p align="center">
  <strong>Modular AI Agent Capability Kit</strong><br/>
  <em>21 skills · 15 workflows · 10 rules — plug into any AI coding assistant</em>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@jhm1909/ag-kit"><img src="https://img.shields.io/npm/v/@jhm1909/ag-kit?style=flat-square&color=CB3837&label=npm" alt="npm" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" /></a>
  <a href="https://agentskills.io"><img src="https://img.shields.io/badge/spec-agentskills.io-7c3aed?style=flat-square" alt="Agent Skills Spec" /></a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="#skills">Skills</a> ·
  <a href="#workflows">Workflows</a> ·
  <a href="#profiles">Profiles</a> ·
  <a href="#architecture">Architecture</a>
</p>

---

## Why Antigravity Kit?

Most AI coding assistants have **zero memory** between sessions. They forget your stack, your conventions, your patterns. You end up re-explaining everything, every time.

**Antigravity Kit** solves this by giving your AI assistant a persistent, structured brain:

- **Skills** — Domain expertise (frontend, backend, AI, security...) loaded on-demand
- **Workflows** — Step-by-step process chains for common tasks (brainstorm → implement → test → commit)
- **Rules** — Always-on guardrails (coding standards, git conventions, research protocols)
- **Manifest routing** — The right skill gets loaded at the right time, automatically

> Think of it as a USB drive of expertise you plug into any AI assistant.

---

## Quick Start

```bash
# Install everything
npx @jhm1909/ag-kit init

# Or pick a profile
npx @jhm1909/ag-kit init --profile fullstack-saas
```

That's it. Your `.agent/` directory is now populated with skills, workflows, and rules.

---

## Skills

21 production-grade skills across 8 domains. Each skill includes expert knowledge, reference materials, and executable patterns.

### Core Engineering

| Skill | Size | Key Features |
|-------|------|--------------|
| **frontend-developer** | 292K | React/Vue/Angular, performance optimization, accessibility. *Includes Vercel React rules (65 patterns)* |
| `react-nextjs` | 180K | Server Components, App Router, Next.js 16 |
| `threejs` | 520K | WebGL, 3D scenes, camera systems |
| **backend-developer** | 36K | API design, system architecture, security (Node/Python/Go/Java) |
| **mobile-developer** | 236K | React Native, Expo, native features, 9 sub-skills |
| **devops-engineer** | 40K | CI/CD, Docker, Kubernetes, Terraform, AWS/GCP |

### Design & UX

| Skill | Size | Key Features |
|-------|------|--------------|
| **designer** | 640K | BM25 searchable database: 50+ styles, 161 palettes, 57 fonts, 99 UX rules. *Anti-AI-slop aesthetic guide (Anthropic)* |
| **app-builder** | 80K | Full-stack scaffolding orchestrator, 13 project templates |

### Quality & Security

| Skill | Size | Key Features |
|-------|------|--------------|
| **qa-tester** | 72K | Unit/E2E/Security/Performance testing. *Trail of Bits security audit methodology* |
| **code-review** | 32K | Verification gates, differential review. *Trail of Bits blast-radius analysis* |
| **debugging** | 28K | Scientific debugging: root cause analysis, 4 sub-methodologies |
| **modern-python** | 16K | uv + ruff + ty + pytest. *Trail of Bits standard toolchain* |

### AI & Integrations

| Skill | Size | Key Features |
|-------|------|--------------|
| **ai-engineer** | 24K | GenAI, RAG, agentic systems, evaluation pipelines |
| **mcp-builder** | 92K | MCP server development (TS/Python). *Anthropic official guide + eval framework* |
| **prompt-engineer** | 12K | System prompts, few-shot, chain-of-thought |
| **context-engineering** | 36K | Token optimization, progressive disclosure, multi-agent coordination |

### Planning & Management

| Skill | Size | Key Features |
|-------|------|--------------|
| **project-manager** | 96K | PRDs, roadmaps, RICE/Kano prioritization. *Dean Peters PM frameworks (discovery, JTBD)* |
| **business-analysis** | 80K | Requirements analysis, specs, agile documentation |
| **lead-architect** | 48K | System design, ADRs, RFCs, scalability decisions |

### Specialized

| Skill | Size | Key Features |
|-------|------|--------------|
| **blockchain-engineer** | 20K | Smart contracts, DeFi, tokenomics, EVM/Solana |
| **game-development** | 48K | Game dev orchestrator, 10 platform sub-skills |
| **marketer** | 80K | SEO, content strategy, video production (Remotion) |
| **research-first** | 4K | Meta-skill: always check docs via context7 MCP before coding |

---

## Workflows

15 chainable workflows that guide you from idea to deployment:

```
New Project    /brainstorm -> /documentation -> /break-tasks -> /implement-feature -> /commit
New Feature    /break-tasks -> /implement-feature -> /gen-tests -> /commit
Bug Fix        /development -> /gen-tests -> /commit
Deep Debug     /debug -> /commit
UI/UX          /ui-ux-design -> /break-tasks -> /implement-feature -> /commit
Study Kit      /absorb -> /break-tasks -> /implement-feature -> /commit
MVP Sprint     /brainstorm -> /documentation -> [/break-tasks -> /implement -> /commit] x N
```

| Workflow | Purpose |
|----------|---------|
| `/guide` | Interactive discovery — finds the right workflow for your task |
| `/brainstorm` | Idea analysis, high-level roadmap + PRD |
| `/documentation` | Architecture docs, API specs, technical specs |
| `/break-tasks` | Requirements to actionable task breakdown |
| `/implement-feature` | Spec-to-code implementation |
| `/development` | Quick fixes and minor changes |
| `/debug` | Scientific debugging with hypothesis testing |
| `/ui-ux-design` | Requirements to comprehensive UI/UX deliverables |
| `/qa` | Test plans and test case documents |
| `/gen-tests` | Auto-generate unit, E2E, security, and perf tests |
| `/absorb` | Study reference projects and extract best practices |
| `/commit` | 3-mode git workflow (Quick / Safe / Custom) |
| `/bootstrap` | Project scaffolding from architectural specs |
| `/install-skill` | Install skills from GitHub repos or registries |
| `/custom-behavior` | Modify agent rules and workflows |

---

## Profiles

Install only what you need:

```bash
npx @jhm1909/ag-kit init --profile <name>
```

| Profile | Included Skills | Optional |
|---------|----------------|----------|
| **web-frontend** | frontend-developer, designer | react-nextjs, threejs |
| **fullstack-saas** | frontend, backend, devops, PM, QA | react-nextjs, ai-engineer, lead-architect |
| **mobile-app** | mobile-developer, designer, QA | backend, devops |
| **ai-powered-app** | ai-engineer, frontend, backend | lead-architect, prompt-engineer |
| **video-content** | marketer, frontend, remotion | threejs, designer |
| **blockchain-dapp** | blockchain, frontend, backend | devops, lead-architect |

---

## Architecture

```
USER -> /guide (Discovery)
  -> Workflow Chain (Orchestration)
    -> Invoke [skill] (Expertise)
      -> skills-manifest.json (Routing)
        -> Rules (Guardrails)
```

### Project Structure

```
.agent/
├── skills-manifest.json      <- Single source of truth
├── ARCHITECTURE.md            <- Detailed architecture docs
├── skills/                    <- 21 expert skills
│   ├── frontend-developer/
│   │   ├── SKILL.md
│   │   ├── react-nextjs/      <- Sub-skill
│   │   ├── threejs/           <- Sub-skill
│   │   └── references/        <- Vercel React performance rules
│   ├── mcp-builder/
│   │   ├── SKILL.md
│   │   └── references/        <- Anthropic MCP guides (TS, Python, eval)
│   ├── designer/
│   │   ├── SKILL.md
│   │   ├── scripts/           <- BM25 search engine
│   │   └── references/        <- Anti-AI-slop aesthetics guide
│   └── ...
├── workflows/                 <- 15 chainable workflows
├── rules/                     <- 10 always-on rules
└── known-registries.json      <- External skill sources
```

---

## Absorbed Methodologies

This kit integrates production-grade methodologies from industry leaders:

| Source | License | Skills Enhanced |
|--------|---------|----------------|
| [Trail of Bits](https://www.trailofbits.com/) | — | `qa-tester` v3 (security audit), `code-review` v2 (differential review), `modern-python` (uv/ruff/ty) |
| [Vercel](https://vercel.com/) | — | `frontend-developer` v4 (65 React performance patterns, composition rules) |
| [Dean Peters](https://deanpeters.net/) | — | `project-manager` v5 (discovery process, PRD framework, Jobs-to-be-Done) |
| [Anthropic](https://github.com/anthropics/skills) | Apache 2.0 | `mcp-builder` (MCP server guide + eval), `designer` v4 (anti-AI-slop aesthetics) |

---

## Compatibility

Works with any AI coding assistant that reads `.agent/` directories:

| Platform | Status |
|----------|--------|
| Claude Code (Anthropic) | Supported |
| Gemini CLI (Google) | Supported |
| Cursor (Anysphere) | Supported |
| GitHub Copilot (Microsoft) | Supported |

Skills follow the [agentskills.io](https://agentskills.io) specification.

---

## CLI Reference

```bash
ag-kit init                       # Install full kit
ag-kit init --profile <name>      # Install specific profile
ag-kit init --force               # Overwrite existing installation
ag-kit list                       # Show available profiles and skills
ag-kit status                     # Check installed version
ag-kit help                       # Show all commands
```

---

## Stats

```
21 skills · 15 workflows · 10 rules · 6 profiles
4 absorbed sources · 2,600K+ knowledge base
```

---

## License

MIT — [jhm1909](https://github.com/jhm1909)
