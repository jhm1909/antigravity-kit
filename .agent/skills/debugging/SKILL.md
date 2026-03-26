---
name: debugging
description: Systematic debugging frameworks for finding and fixing bugs. Use when encountering bugs, test failures, unexpected behavior, or needing to validate fixes before claiming completion.
---

# Debugging Skills

Systematic debugging methodologies that ensure thorough investigation before attempting fixes.

## Core Principle

> "NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST"

Systematic approach: 15-30 min to fix. Random fixes: 2-3 hours of thrashing.

## Sub-Skills

| How You're Stuck | Use This | Reference |
|------------------|----------|-----------|
| Bug, test failure, unexpected behavior | Systematic Debugging | [systematic-debugging.md](./references/systematic-debugging.md) |
| Error deep in call stack | Root Cause Tracing | [root-cause-tracing.md](./references/root-cause-tracing.md) |
| Same bug keeps recurring | Defense-in-Depth | [defense-in-depth.md](./references/defense-in-depth.md) |
| About to claim "done" | Verification Before Completion | [verification-before-completion.md](./references/verification-before-completion.md) |

## The Four Phases (Quick Reference)

| Phase | Key Activities | Success Criteria |
|-------|---------------|------------------|
| **1. Root Cause** | Read errors, reproduce, check changes, gather evidence | Understand WHAT and WHY |
| **2. Pattern** | Find working examples, compare | Identify differences |
| **3. Hypothesis** | Form theory, test minimally | Confirmed or new hypothesis |
| **4. Implementation** | Create test, fix, verify | Bug resolved, tests pass |

## Red Flags — STOP and Follow Process

If thinking any of these → return to Phase 1:
- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "I don't fully understand but this might work"
- "One more fix attempt" (when already tried 2+)
- Each fix reveals new problem in different place

## 3+ Fixes Failed → Question Architecture

Pattern: each fix reveals new shared state/coupling/problem → **STOP**.
- Is this pattern fundamentally sound?
- Should we refactor architecture vs. continue fixing symptoms?
- Discuss with user before attempting more fixes.

## Iron Law: Verification Before Completion

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE

1. IDENTIFY: What command proves this claim?
2. RUN: Execute the FULL command (fresh, complete)
3. READ: Full output, check exit code
4. VERIFY: Does output confirm the claim?
5. ONLY THEN: Make the claim
```
