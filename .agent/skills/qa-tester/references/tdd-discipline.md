---
name: TDD Discipline
description: Red-Green-Refactor cycle enforcement. Use when implementing features to ensure test-first development.
when_to_use: before writing any production code for new features or bug fixes
version: 1.0.0
languages: all
---

# TDD Discipline: Red-Green-Refactor

## The Iron Law

```
NO CODE BEFORE FAILING TEST
```

**Violating the letter of this rule IS violating the spirit of this rule.**

## The Cycle

```
RED:    Write test → Run → MUST FAIL → Confirms test works
GREEN:  Write MINIMAL code → Run → MUST PASS → Nothing more
REFACTOR: Clean up → Run → STILL PASSES → Improve structure
```

### RED Phase — Write Failing Test First
1. Write a test that describes the desired behavior
2. Run it — it MUST fail
3. If it passes → your test is wrong (testing existing behavior)
4. Verify the failure message matches what you expect

### GREEN Phase — Write Minimal Code
1. Write the SMALLEST amount of production code to make test pass
2. Run test — it MUST pass now
3. Don't add "while I'm here" improvements
4. Don't optimize or refactor yet

### REFACTOR Phase — Clean Up
1. Improve code structure while keeping tests green
2. Run tests after EVERY change
3. If tests break during refactor → revert immediately

## Red Flags — STOP and Start Over

- Code written before test
- "I already manually tested it"
- "Tests after achieve the same purpose"
- "It's about spirit not ritual"
- "This is different because..."
- Test passes on first run (test is wrong)
- Multiple production changes between test runs

**All of these mean: Delete code. Start over with TDD.**

## Rationalization Prevention

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll write tests after" | Tests-after = "what does this do?" Tests-first = "what should this do?" |
| "I just need to try something first" | Try it IN a test. Same effort, permanent verification. |
| "Tests slow me down" | Systematic: 15-30 min. Random: 2-3 hours thrashing. |
| "I'll test if problems emerge" | Problems = users find bugs. Test BEFORE shipping. |
| "Tests after achieve same goals" | Only if you time-travel. Tests-first PREVENT bugs, tests-after FIND bugs. |
| "This is obvious code" | Obvious code with edge cases = subtle bugs. Test it. |
| "Just this once" | No exceptions. The habit IS the discipline. |

## Regression Tests (Existing Bugs)

When fixing a bug in existing code:

```
1. Write test reproducing the bug → Run → MUST FAIL (proves bug exists)
2. Fix the bug → Run → MUST PASS
3. Revert fix → Run → MUST FAIL AGAIN (proves test catches the bug)
4. Restore fix → Run → MUST PASS (confirms fix works)
```

The revert-and-restore step (step 3) is critical — without it, you don't know if your test actually catches the bug.

## Quick Reference

| Situation | Action |
|-----------|--------|
| New feature | RED → GREEN → REFACTOR |
| Bug fix | Write regression test → Fix → Verify red-green |
| Refactoring | Ensure tests exist → Refactor → Tests still green |
| "Too simple" | Test anyway. 30 seconds now vs. hours later. |
| Test passes first run | Test is wrong. Fix the test first. |
| 3+ test failures | Question approach, not just fix symptoms |

## The Bottom Line

**Write the test. Watch it fail. THEN write the code.**

This is non-negotiable. The cycle IS the methodology.
