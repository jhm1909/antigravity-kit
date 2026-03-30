# Skill Evolution: Automated Capability Gap Analysis

> Adapted from [sentient-agi/EvoSkill](https://github.com/sentient-agi/EvoSkill) (Apache 2.0)
> Original: `src/agent_profiles/skill_proposer/prompt.py`

## Overview

A systematic framework for identifying capability gaps in AI agents and proposing targeted skill improvements. The key insight: analyze agent failures to decide whether to **create** a new skill, **edit** an existing one, or **modify** the prompt.

---

## Pre-Analysis Steps (Mandatory)

Before proposing any skill change:

### 1. Brainstorm Alternatives
- Propose 2-3 different approaches to address the failures
- For each approach: describe the core idea, trade-offs, and complexity
- Apply **YAGNI** — choose the simplest solution that addresses the root cause

### 2. Inventory Existing Skills
- Review the full list of existing skills
- Understand what capabilities are already available
- Check if any existing skill covers similar ground

### 3. Analyze Feedback History
- Check for DISCARDED proposals similar to what you're considering
- Look for patterns in what works vs what causes regressions
- Note which skills were active during failures

### 4. Determine Action Type

| If... | Then... |
|:------|:--------|
| An existing skill SHOULD have prevented this failure but didn't | → **EDIT** the existing skill |
| No existing skill covers this capability | → **CREATE** a new skill |
| A DISCARDED proposal was on the right track | → Explain how yours differs |

---

## CREATE vs EDIT Decision Matrix

### Propose CREATE when ANY apply:
- Agent lacks access to information, APIs, or computational capabilities
- The fix requires a multi-step procedure (>3 sequential steps)
- The fix involves output structuring, formatting, or templates
- The improvement would be reusable across different tasks
- The issue is about WHAT steps to take, not HOW to think

### Propose EDIT when ALL apply:
- An existing skill covers similar ground
- The existing skill SHOULD have prevented the failure
- The fix extends rather than replaces existing capability

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Do This Instead |
|:-------------|:-------------|:----------------|
| New skill for every failure | Creates narrow, overlapping skills | Check if existing skill can be extended |
| Ignoring DISCARDED proposals | Wastes effort repeating mistakes | Explain how yours is different |
| Creating narrow skills | Only fixes one case, won't generalize | Ensure broad applicability |
| Overlapping capabilities | Confuses skill selection, wastes tokens | Consolidate into existing skill |

---

## Skill Proposal Template

```markdown
### Action: CREATE | EDIT

**Target Skill**: (for EDIT: skill name to modify)

**Proposed Skill/Change**:
- Capability: What it does
- Inputs: What it accepts
- Outputs: What it produces
- Problem it solves: What failure pattern it addresses

**Justification**:
- Trace reference: "At step X, the agent..."
- Existing skills checked: "Skill Y covers Z but not W..."
- Past iterations: "Iter-4 was DISCARDED because..."
- How this differs: "Unlike iter-4, this approach..."

**Related Iterations**: [iter-4, iter-9]
```

---

## Examples

### Example: EDIT Existing Skill

**Situation**: Agent failed to calculate Expected Shortfall correctly. The `financial-methodology-guide` skill exists but didn't cover multi-period ES calculations.

**Proposal**:
- **Action**: EDIT
- **Target**: `financial-methodology-guide`
- **Change**: Extend the ES/CVaR section to include multi-period calculations. Add rolling window ES computation, confidence interval adjustment for different time horizons.
- **Justification**: The existing skill covers basic ES but doesn't address the multi-period case. Iter-3 was DISCARDED for proposing a separate 'multi-period-risk' skill — this adds to the existing skill instead.

### Example: CREATE New Skill

**Situation**: Agent failed to parse Treasury bond prices in 32nds notation. No existing skill covers notation parsing.

**Proposal**:
- **Action**: CREATE
- **Skill**: `bond-notation-parser` — handles Treasury price notation, recognizes 32nds format (e.g., 99.16 = 99 + 16/32), handles '+' suffix, validates ranges.
- **Justification**: No existing skill covers notation parsing. The agent interpreted '99.16' as decimal instead of 99.5. This is a distinct capability not covered by existing methodology skills.

---

## Integration with Task Registry

For automated evaluation, tasks can be registered declaratively:

```python
from dataclasses import dataclass
from typing import Callable, Optional

@dataclass
class TaskConfig:
    name: str
    make_agent_options: Callable  # Factory for agent configuration
    scorer: Callable[[str, str, str], float]  # (question, predicted, ground_truth) → score
    column_renames: dict[str, str] | None = None  # Map dataset columns
    default_dataset: str | None = None  # Path to default benchmark data

# Register and use
register_task(TaskConfig(
    name="my_task",
    make_agent_options=make_my_agent,
    scorer=my_scorer,
    default_dataset=".dataset/my_data.csv",
))
```

This pattern enables pluggable evaluation with custom scorers, datasets, and column mappings.
