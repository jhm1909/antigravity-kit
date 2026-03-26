---
name: modern-python
description: >
  Configures Python projects with modern tooling (uv, ruff, ty, pytest).
  Use when creating projects, writing scripts, or migrating from pip/Poetry/mypy/black.
license: MIT
metadata:
  author: Trail of Bits (adapted)
  version: "1.0.0"
  domain: python
  source: trailofbits/skills/modern-python
---

# Modern Python

Guide for modern Python tooling and best practices.

## Knowledge Graph

- **extends**: [[backend-developer]]
- **requires**: []
- **suggests**: [[qa-tester]], [[devops-engineer]]
- **conflicts**: []
- **moc**: [[python-development-moc]]

## Core Toolchain

| Tool | Purpose | Replaces |
|------|---------|----------|
| **uv** | Package/dependency management | pip, virtualenv, pipx, pyenv |
| **ruff** | Linting AND formatting | flake8, black, isort |
| **ty** | Type checking | mypy, pyright |
| **pytest** | Testing with coverage | unittest |

## Anti-Patterns

| Avoid | Use Instead |
|-------|-------------|
| `pip install` | `uv add` + `uv sync` |
| requirements.txt | PEP 723 (scripts) or pyproject.toml (projects) |
| Poetry | uv (faster, simpler) |
| mypy / pyright | ty (faster, Astral team) |
| `[project.optional-dependencies]` for dev | `[dependency-groups]` (PEP 735) |
| Manual venv activation | `uv run <cmd>` |

## Decision Tree

```
What are you doing?
│
├─ Single-file script with deps?
│   └─ PEP 723 inline metadata
│
├─ New multi-file project?
│   └─ uv init → uv add → uv run
│
├─ New reusable package?
│   └─ uv init --package → full pyproject.toml
│
└─ Migrating existing project?
   └─ uv init --bare → uv add from existing deps
```

## Quick Start

```bash
uv init myproject && cd myproject
uv add requests rich
uv add --group dev pytest ruff ty
uv run python src/myproject/main.py
uv run pytest
uv run ruff check .
```

## pyproject.toml Template

```toml
[project]
name = "myproject"
version = "0.1.0"
requires-python = ">=3.11"

[dependency-groups]
dev = [{include-group = "lint"}, {include-group = "test"}]
lint = ["ruff", "ty"]
test = ["pytest", "pytest-cov"]

[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = ["ALL"]
ignore = ["D", "COM812", "ISC001"]

[tool.pytest]
addopts = ["--cov=myproject", "--cov-fail-under=80"]
```

## Key Commands

| Command | Description |
|---------|-------------|
| `uv add <pkg>` | Add dependency |
| `uv add --group dev <pkg>` | Add dev dependency |
| `uv sync --all-groups` | Install all |
| `uv run <cmd>` | Run in venv |
| `uv run --with <pkg> <cmd>` | Run with temp dep |
| `uv build` | Build package |

## Checklist

- [ ] Use `src/` layout
- [ ] `requires-python = ">=3.11"`
- [ ] ruff with `select = ["ALL"]`
- [ ] ty for type checking
- [ ] Test coverage ≥ 80%
- [ ] `uv.lock` in version control

---

*Modern Python setup | Trail of Bits methodology*
