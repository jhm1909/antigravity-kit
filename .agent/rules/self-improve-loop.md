---
trigger: model_decision
description: Auto-detect repeated failures during development and propose skill/prompt improvements
---

# Self-Improvement Loop

## When This Rule Activates

This rule fires **automatically** when ANY of these conditions are met during a task:

1. **Repeated failure**: Same error or wrong output occurs ≥ 2 times
2. **Excessive retries**: You fix/retry the same step > 3 times
3. **Tool misuse**: You call a tool incorrectly ≥ 2 times in a row
4. **Pattern mismatch**: Output consistently doesn't match user expectations after corrections

## What To Do

### Step 1: STOP and Diagnose (do NOT keep retrying)

```
🔄 Self-improvement triggered: [describe what failed repeatedly]
```

### Step 2: Root Cause Analysis

Classify the failure using this decision tree:

| Question | If Yes → |
|----------|----------|
| Am I missing a tool or capability? | **Skill gap** → propose CREATE skill |
| Does an existing skill cover this but I used it wrong? | **Skill gap** → propose EDIT skill |
| Do I have the tools but used the wrong approach? | **Prompt gap** → note for improvement |
| Is this a one-off code bug? | **Code fix** → just fix it, no skill change needed |

### Step 3: Propose (NEVER auto-apply)

**For skill gaps**, present to user:

```
🧠 Self-improvement suggestion:
- Root cause: [what went wrong and why]
- Proposed fix: CREATE/EDIT skill `<name>`
- What it would add: [specific capability]
- Apply? (y/n)
```

**For prompt gaps**, log internally but do NOT create files:

```
📝 Noted: [pattern] — will improve approach for future tasks
```

**For code fixes**, just fix and move on.

## Rules

1. **NEVER** auto-create or auto-modify skills without user approval
2. **NEVER** spend more than 2 tool calls on diagnosis — keep it fast
3. **DO** continue the original task after proposing (don't block on approval)
4. **DO** check `references/skill-evolution.md` in ai-engineer for CREATE vs EDIT guidance
5. **DO** apply the Abstraction Ladder (from prompt-engineer) — ensure proposals generalize beyond the single failure
6. **SKIP** this rule for trivial errors like typos or wrong file paths
