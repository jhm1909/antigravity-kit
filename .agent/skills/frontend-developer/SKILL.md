---
name: frontend-developer
description: >
  Foundation for all frontend development. Use when implementing UI code, optimizing performance, or ensuring accessibility.
license: MIT
compatibility: Claude Code, Cursor, Gemini CLI, GitHub Copilot
metadata:
  author: jhm1909
  version: "3.2.0"
  domain: web
  estimated_tokens: 3500
---

# Frontend Developer

Foundation skill for web frontend development. Framework-agnostic patterns for performance, accessibility, and code quality.

## Knowledge Graph

- **extends**: none (base skill)
- **requires**: []
- **suggests**: []
- **conflicts**: []
- **enhances**: [[designer]] (implementation of designs)
- **moc**: [[web-development-moc]]

## 🛑 THE GOLDEN RULE: "Quote First"

**You must NEVER write code without first citing your source.**

Before implementing:
1. **Locate** authoritative documentation
2. **Quote** the specific section justifying your decision
3. **Implement** strictly according to that quote

_If no source found, PAUSE and `search_web` or ask._

## 🧠 Core Philosophy

1. **Zero-Bundle Budget** — Every kilobyte justifies existence
2. **Hydration is Overhead** — Static when possible
3. **User Waits for Nothing** — Optimistic UI, non-blocking main thread
4. **Accessibility is NOT Optional** — `<div onClick>` is a bug

## Framework Specializations

| Framework | Skill | Relationship |
|-----------|-------|--------------|
| React / Next.js | `react-nextjs/` | **extends** this skill |
| Vue / Nuxt | [[vue-developer]] | **extends** this skill |
| Angular | [[angular-developer]] | **extends** this skill |
| Svelte / Solid / Qwik | [[modern-signals]] | **extends** this skill |

## Capability Add-ons

Add these to any frontend specialization:

| Capability | Location | Use For |
|------------|----------|---------|
| 3D Graphics | `threejs/` | WebGL, 3D product showcases |
| Video Generation | [[remotion-best-practices]] | Programmatic video |
| Animations | [[framer-motion]] | Complex UI animations |
| Styling | [[tailwind-setup]] | Utility-first CSS |

## Dynamic Stack Loading

Load framework-specific guides as needed:

| When User Needs | Load This |
|:----------------|:----------|
| Next.js App Router patterns | `react-nextjs/README.md` |
| 3D graphics, WebGL | `threejs/README.md` |
| Tailwind CSS setup | `tailwind-setup/README.md` |

### Example Workflows

**Next.js Project:**
```
User: "Build a Next.js app with App Router"
→ Load frontend-developer/react-nextjs/README.md
→ Follow Server Components patterns
→ Implement loading.tsx, error.tsx
```

**3D Product Viewer:**
```
User: "Add a 3D model viewer to my React app"
→ Load frontend-developer/threejs/README.md
→ Set up React Three Fiber
→ Configure Canvas, lights, controls
```

## Quick Rules

| Aspect | Rule |
|--------|------|
| Performance | Check Web Vitals after every change |
| Accessibility | All images need `alt`, interactive elements need focus |
| Bundles | Code-split by route, lazy load below fold |
| Images | Use modern formats (WebP, AVIF), provide fallbacks |

## Related Skills

- [[react-nextjs]] — React & Next.js specific
- [[vue-developer]] — Vue & Nuxt specific
- [[backend-developer]] — When building fullstack
- [[designer]] — Design system implementation
- [[qa-tester]] — E2E testing

---

*Part of [[web-development-moc]] | Base skill for all frontend work*
