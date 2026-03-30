# Root Cause Analysis for Agent Failures

> Adapted from [sentient-agi/EvoSkill](https://github.com/sentient-agi/EvoSkill) (Apache 2.0)
> Original: `src/agent_profiles/proposer/prompt.py` + `prompt_proposer/prompt.py`

## Overview

A structured methodology for analyzing agent failures, identifying root causes, and determining the correct fix type (skill vs prompt vs code).

---

## Analysis Process

### Step 1: Trace Review

Examine the agent's execution step-by-step:

- **What actions did the agent take?** Map the sequence of tool calls, reasoning steps, and decisions.
- **Where did it succeed?** Note what worked correctly — keep these patterns.
- **Where did it struggle?** Mark decision points where behavior diverged from expected.
- **What information was available?** List tools, context, and data the agent had access to.
- **What was missing?** Identify gaps in available capabilities.

### Step 2: Gap Analysis

Compare actual output to expected output:

- **What specific information is incorrect?** Factual errors, wrong values, missing data.
- **What is missing?** Expected sections, details, or considerations not addressed.
- **What reasoning errors occurred?** Wrong assumptions, incorrect deductions, skipped steps.
- **What capabilities would have prevented these issues?** Map each error to a capability gap.

### Step 3: Root Cause Classification

| Root Cause Type | Indicators | Fix Type |
|:----------------|:-----------|:---------|
| Missing tool/API access | Agent tried but lacked capability | **Skill** — add new tool |
| Procedural gap (>3 steps) | Agent wandered without strategy | **Skill** — add workflow |
| Output format issues | Correct content, wrong structure | **Skill** — add template |
| Existing skill insufficient | Skill exists but missed edge case | **Skill** — edit existing |
| Reasoning approach wrong | Has tools, used them incorrectly | **Prompt** — improve guidance |
| Verification skipped | Answer without cross-checking | **Prompt** — add verification rule |
| Precision issue | Vague when specific was needed | **Prompt** — set precision expectation |
| Comparison bias | Analyzed one option more than others | **Prompt** — add balanced analysis rule |

### Decision Framework

```
Is the issue about WHAT steps to take?  ──→  SKILL change
Is the issue about HOW to think?        ──→  PROMPT change
Is the issue a code bug?                ──→  CODE fix
```

---

## Prompt Fix Patterns

When the root cause is a **reasoning/guidance issue**, apply these patterns:

### Pattern 1: Tool Delegation
**When**: Agent performs manual work despite having tools available.

```markdown
## Core Rule: Always Use Tools
When any task involves [capability]—even simple cases—use [tool] rather
than manual work. This prevents error accumulation.
```

### Pattern 2: Verification Before Submit
**When**: Agent provides answers without cross-checking.

```markdown
## Verification Process
Before providing a final answer:
1. State your preliminary answer
2. Identify ways to verify or cross-check
3. Perform verification using available tools
4. Only then provide the final answer
```

### Pattern 3: Balanced Comparison
**When**: Agent analyzes one option more deeply than others.

```markdown
## Comparative Analysis
When comparing options:
1. Explicitly list ALL options being compared
2. Analyze each option using the SAME criteria
3. Create a structured comparison (table or pros/cons)
4. Only then make a recommendation
```

### Pattern 4: Precision Default
**When**: Agent is vague when specifics are needed.

```markdown
## Precision Standards
- Quantities: provide exact numbers, not ranges
- Timing: provide specific dates/times, not "soon" or "recently"
- Uncertainty: explicitly state uncertainty rather than being vague
- Default to being specific unless ambiguity is explicitly acceptable
```

---

## Integration with Code Review

Apply this methodology during code review by asking:

1. **Does the change address the root cause or a symptom?**
2. **Is the fix at the right level of abstraction?** (See the Abstraction Ladder in prompt-optimization.md)
3. **Could this fix cause regressions elsewhere?** Check for unintended side effects.
4. **Is there adequate verification?** The fix should include tests or validation.

---

## Checklist

- [ ] Traced the full execution path
- [ ] Identified ALL points of failure (not just the first)
- [ ] Compared actual vs expected output
- [ ] Classified root cause as skill vs prompt vs code
- [ ] Checked if a similar fix was tried before (and what happened)
- [ ] Verified the fix generalizes beyond this specific case
- [ ] Considered potential regressions from the fix
