# Changelog

All notable changes to the Antigravity Kit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/2.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-03-26

### Added

- **6 New Skills** (absorbed from @vudovn/ag-kit v2.0):
  - `nextjs-react-expert` — 57 Vercel performance rules across 8 categories
  - `tailwind-patterns` — Tailwind CSS v4 CSS-first configuration & patterns
  - `i18n-localization` — Internationalization, translations, RTL support
  - `mcp-builder` — Model Context Protocol server building principles
  - `app-builder` — Application scaffolding orchestrator with 13 templates
  - `game-development` — Game dev orchestrator with 10 sub-skills
- **3 New Workflows**:
  - `/guide` — Interactive workflow discovery (beginner-friendly)
  - `/absorb` — Study & adapt reference kits
  - `/custom-behavior` — Meta-config for rules and workflows
- **3 New Rules**:
  - `workflow-advisor.md` — Auto-suggest workflow chains
  - `workflow-skill-convention.md` — 5-layer architecture enforcement
  - `research.md` — Deep research protocol
- **Architecture**:
  - `.agent/ARCHITECTURE.md` — Complete kit architecture doc
  - `.agent/mcp_config.json` — Template MCP server configuration
  - `.editorconfig` — Consistent formatting across editors
  - `cli/verify.js` — Kit integrity checker (Node.js, zero-dependency)
  - `game-development-moc` — New Map of Content for game development

### Changed

- **`graph-index.json` v2.0 → v3.0**:
  - 45 → 57 nodes (19 skills + 14 workflows + 9 rules)
  - Added `triggers` per node for smart skill routing
  - Added `workflow_chains` section for `/guide` routing
  - Fixed corrupted MOC arrays from v2
  - Updated all paths from `anti-chaotic/` → `.agent/`
- **`skills-manifest.json` v1.0 → v2.0**:
  - Added `used_by_workflows` per skill
  - Added `workflows` section with `chains_to`
  - Added `triggers` for all skills
  - 5 → 6 profiles (+`blockchain-dapp`)
- **`documents.md` rule**: `050-Research` now uses per-topic subfolders
- **CLI**: Added `verify` command

### Fixed

- Corrupted MOC skill arrays (garbled wiki-link strings) in graph-index.json
- Invalid paths referencing `anti-chaotic/` directory

## [0.1.0] - 2026-03-26

### Added
- 13 expert AI skills (frontend, backend, mobile, AI, blockchain, devops, etc.)
- 10 sub-skills (react-nextjs, threejs, expo modules, remotion)
- 11 automated workflows (brainstorm, development, testing, docs, etc.)
- 5 coding rules and guidelines
- 5 Maps of Content (MOCs) for domain navigation
- Knowledge graph (`graph-index.json`) for intelligent skill routing
- Skills manifest with 5 profiles (web-frontend, fullstack-saas, mobile-app, etc.)
- CLI tool with `init`, `list`, `status` commands
- Profile-based selective installation (`init --profile <name>`)
- Cross-platform compatibility: Claude Code, Cursor, Gemini CLI, GitHub Copilot
- agentskills.io specification compliance

[Unreleased]: https://github.com/jhm1909/antigravity-kit/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/jhm1909/antigravity-kit/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jhm1909/antigravity-kit/releases/tag/v0.1.0
