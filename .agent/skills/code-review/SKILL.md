---
name: code-review
description: >
  Code review practices emphasizing technical rigor, verification gates, evidence-based claims,
  and security-focused differential review. Use when receiving feedback, completing tasks,
  reviewing PRs for security regressions, or before making completion/success claims.
metadata:
  version: "2.0.0"
  sources:
    - trailofbits/skills (differential-review, spec-to-code-compliance)
---

# Code Review

Guide proper code review practices: technical rigor, evidence-based claims, security-focused review.

## Three Practices

1. **Receiving feedback** ??Technical evaluation over performative agreement
2. **Requesting reviews** ??Systematic review process
3. **Verification gates** ??Evidence before any completion claims

## Core Principle

**Technical correctness over social comfort.** Verify before implementing. Ask before assuming. Evidence before claims.

## Quick Decision Tree

```
SITUATION?
???œâ? Received feedback
?? ?œâ? Unclear items? ??STOP, ask for clarification first
?? ?œâ? From human partner? ??Understand, then implement
?? ?”â? From external reviewer? ??Verify technically before implementing
???œâ? Security-focused PR review?
?? ?”â? Read: differential-review.md (blast radius, risk classification)
???œâ? Spec-to-code compliance check?
?? ?”â? Read: spec-compliance.md (6-phase audit methodology)
???œâ? Completed work
?? ?”â? Major feature/task? ??Run verification, present evidence
???”â? About to claim status
   ?œâ? Have fresh verification? ??State claim WITH evidence
   ?”â? No fresh verification? ??RUN verification command first
```

## Receiving Feedback Protocol

**Pattern**: READ ??UNDERSTAND ??VERIFY ??EVALUATE ??RESPOND ??IMPLEMENT

**Key Rules**:
- ??No performative agreement: "You're absolutely right!", "Great point!"
- ??No implementation before verification
- ??Restate requirement, ask questions, push back with technical reasoning
- ??If unclear: STOP and ask for clarification on ALL unclear items first
- ??YAGNI check: grep for usage before implementing suggested features

**Full protocol**: [code-review-reception.md](./references/code-review-reception.md)

## Verification Gates Protocol

**The Iron Law**: NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE

| Claim | Requires | Not Sufficient |
|-------|----------|----------------|
| Tests pass | Test output: 0 failures | Previous run, "should pass" |
| Build succeeds | Build command: exit 0 | "Linter passed" |
| Bug fixed | Original symptom passes | "Code changed" |
| Requirements met | Line-by-line checklist | "Tests passing" |

**Red Flags ??STOP**:
- Using "should", "probably", "seems to"
- Expressing satisfaction before verification
- Committing without verification

**Full protocol**: [verification-before-completion.md](./references/verification-before-completion.md)

## Security Review ??Risk Classification

| Risk Level | Triggers |
|------------|----------|
| **HIGH** | Auth, crypto, external calls, value transfer, validation removal |
| **MEDIUM** | Business logic, state changes, new public APIs |
| **LOW** | Comments, tests, UI, logging |

**Red Flags (immediate investigation)**:
- Removed code from "security", "CVE", or "fix" commits
- Access control modifiers removed
- Validation removed without replacement
- High blast radius (50+ callers) + HIGH risk change

**Full methodology**: [differential-review.md](./references/differential-review.md)

## References

| Reference | Purpose |
|:----------|:--------|
| `code-review-reception.md` | Receiving feedback protocol |
| `verification-before-completion.md` | Iron Law verification gates |
| `requesting-code-review.md` | How to request reviews |
| `differential-review.md` | Security PR review (Trail of Bits) |
| `spec-compliance.md` | Spec-to-code audit (Trail of Bits) |

## Bottom Line

1. Technical rigor over social performance ??No performative agreement
2. Evidence before claims ??Verification gates always
3. Security before speed ??Risk-classify every PR change
4. Verify. Question. Then implement. Evidence. Then claim.
