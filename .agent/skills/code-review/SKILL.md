---
name: code-review
description: Code review practices emphasizing technical rigor, verification gates, and evidence-based claims. Use when receiving feedback, completing tasks, or before making completion/success claims.
---

# Code Review

Guide proper code review practices emphasizing technical rigor, evidence-based claims, and verification over performative responses.

## Three Practices

1. **Receiving feedback** — Technical evaluation over performative agreement
2. **Requesting reviews** — Systematic review process
3. **Verification gates** — Evidence before any completion claims

## Core Principle

**Technical correctness over social comfort.** Verify before implementing. Ask before assuming. Evidence before claims.

## Quick Decision Tree

```
SITUATION?
│
├─ Received feedback
│  ├─ Unclear items? → STOP, ask for clarification first
│  ├─ From human partner? → Understand, then implement
│  └─ From external reviewer? → Verify technically before implementing
│
├─ Completed work
│  └─ Major feature/task? → Run verification, present evidence
│
└─ About to claim status
   ├─ Have fresh verification? → State claim WITH evidence
   └─ No fresh verification? → RUN verification command first
```

## Receiving Feedback Protocol

**Pattern**: READ → UNDERSTAND → VERIFY → EVALUATE → RESPOND → IMPLEMENT

**Key Rules**:
- ❌ No performative agreement: "You're absolutely right!", "Great point!"
- ❌ No implementation before verification
- ✅ Restate requirement, ask questions, push back with technical reasoning
- ✅ If unclear: STOP and ask for clarification on ALL unclear items first
- ✅ YAGNI check: grep for usage before implementing suggested features

**Full protocol**: [code-review-reception.md](./references/code-review-reception.md)

## Verification Gates Protocol

**The Iron Law**: NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE

| Claim | Requires | Not Sufficient |
|-------|----------|----------------|
| Tests pass | Test output: 0 failures | Previous run, "should pass" |
| Build succeeds | Build command: exit 0 | "Linter passed" |
| Bug fixed | Original symptom passes | "Code changed" |
| Requirements met | Line-by-line checklist | "Tests passing" |

**Red Flags — STOP**:
- Using "should", "probably", "seems to"
- Expressing satisfaction before verification
- Committing without verification
- ANY wording implying success without running verification

**Full protocol**: [verification-before-completion.md](./references/verification-before-completion.md)

## Requesting Review Protocol

**Full protocol**: [requesting-code-review.md](./references/requesting-code-review.md)

## Bottom Line

1. Technical rigor over social performance — No performative agreement
2. Evidence before claims — Verification gates always
3. Verify. Question. Then implement. Evidence. Then claim.
