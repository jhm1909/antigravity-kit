---
name: research-first
description: Meta-skill that teaches AI to research before coding. Always check latest docs via context7 MCP, verify versions, and validate assumptions before writing code. Use this skill for ANY coding task.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Research-First — Always Verify Before You Code

> **Philosophy**: AI training data goes stale. Libraries update. APIs change.
> **Always research first, code second.**

---

## The Research-First Protocol

Before writing ANY code that uses a library, framework, or API:

```
1. IDENTIFY  → What libraries/frameworks am I about to use?
2. RESEARCH  → Query context7 MCP for latest docs
3. VERIFY    → Check version compatibility
4. CODE      → Write code based on verified information
5. VALIDATE  → Test that it actually works
```

---

## When to Research (MANDATORY)

| Trigger | Action |
|---------|--------|
| Using any npm/pip/cargo package | Query context7 for latest API |
| Framework-specific patterns (Next.js, React, Vue) | Check current version docs |
| Deployment configs (Docker, CI/CD) | Verify current best practices |
| Security implementations (auth, crypto) | Always check latest recommendations |
| Any error you're unsure about | Search docs before guessing |

## When NOT to Research

| Scenario | Why |
|----------|-----|
| Pure logic/algorithms | Math doesn't change |
| Language fundamentals (JS, Python, Go) | Core syntax is stable |
| Git operations | Well-established, stable |
| File I/O, string manipulation | Standard library, stable |

---

## How to Research — Tool Usage

### Primary: context7 MCP (Real-time Docs)

```
Step 1: Resolve library ID
→ mcp_context7_resolve-library-id({ libraryName: "next.js", query: "app router setup" })

Step 2: Query specific docs
→ mcp_context7_query-docs({ libraryId: "/vercel/next.js", query: "server components data fetching" })
```

### Secondary: Web Search (When context7 lacks coverage)

```
→ search_web({ query: "React 19 use() hook examples 2026" })
```

### Tertiary: GitHub (Implementation examples)

```
→ mcp_github_search_code({ q: "useFormStatus react-dom language:typescript" })
```

---

## Research Depth by Task Complexity

| Task | Research Depth |
|------|----------------|
| **Simple** (add a button, style a div) | None needed |
| **Medium** (integrate a library, add auth) | 1 context7 query |
| **Complex** (new architecture, unfamiliar framework) | 2-3 queries + verify |
| **Critical** (security, payments, data migration) | Full research + cross-reference |

---

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Assume you know the latest API | Query context7 first |
| Copy patterns from training data | Verify they're current |
| Use deprecated methods | Check migration guides |
| Guess at config options | Read actual docs |
| Write 500 lines then test | Research → small test → build |

---

## Decision Framework

```
User asks: "Add Stripe payments to my Next.js app"

❌ BAD: Start coding from memory
  → Might use old Stripe.js API
  → Might use deprecated Next.js patterns

✅ GOOD: Research first
  1. context7: "next.js server actions" → get current patterns
  2. context7: "stripe" → get latest Stripe.js API
  3. Verify: Next.js version in package.json
  4. Code: Using verified, current patterns
  5. Test: Verify integration works
```

---

> **Remember**: Your training data is a starting point, not ground truth.
> When in doubt, **look it up**. The 30 seconds spent researching saves 30 minutes debugging outdated code.
