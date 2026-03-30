---
name: self-improvement
description: >
  Self-improving agent patterns: evolutionary skill discovery, feedback descent optimization, and automated capability gap analysis. Use for agent tuning, skill evolution, and prompt optimization loops.
license: MIT
compatibility: Claude Code, Cursor, Gemini CLI, GitHub Copilot
metadata:
  author: jhm1909
  version: "1.0.0"
  domain: ai
  estimated_tokens: 8000
  source: "Adapted from sentient-agi/EvoSkill (Apache 2.0)"
---

# Self-Improvement

Patterns for automated agent improvement through evolutionary optimization and structured feedback.

## Knowledge Graph

- **extends**: [[ai-engineer]]
- **requires**: []
- **suggests**: [[prompt-engineer]], [[code-review]]
- **conflicts**: []
- **enhances**: [[debugging]] (failure pattern analysis), [[qa-tester]] (evaluation loops)
- **moc**: [[ai-development-moc]]

---

## 1. Core Concept: Agent Programs

An **agent program** = system prompt + skills + tools. Self-improvement treats this configuration as an artifact that can be optimized automatically.

```
Program v1 (prompt + skills)
    ↓ evaluate on benchmark
Failures identified
    ↓ analyze failures
Propose improvement (new skill or prompt change)
    ↓ implement change
Program v2 (mutated prompt or new skill)
    ↓ evaluate again
Keep if better, discard if worse
```

---

## 2. Feedback Descent

Implementation of the optimization algorithm from [arxiv:2511.07919](https://arxiv.org/abs/2511.07919). Optimizes text artifacts through **pairwise comparison** rather than scalar rewards.

### Algorithm

```
1. Initialize: best ← initial_candidate, feedback_history ← []
2. For t = 1 to max_iterations:
   a. Propose: candidate ← proposer(best, feedback_history)
   b. Compare: preference, rationale ← evaluator(best, candidate)
   c. Record: feedback_history.append(rationale)
   d. Update: if candidate wins → best ← candidate, feedback_history ← []
   e. Early stop: if no improvement for k iterations → break
3. Return best
```

### Key Interfaces

| Component | Role | Input → Output |
|:----------|:-----|:---------------|
| **Proposer** | Generate candidates | (current_best, feedback_history) → candidate |
| **Evaluator** | Pairwise comparison | (best, candidate) → preference + rationale |

### When to Use

- Optimizing system prompts for specific tasks
- Refining skill instructions iteratively
- A/B testing agent configurations systematically
- Prompt regression testing

> See `references/feedback-descent.md` for the full implementation.

---

## 3. Evolutionary Skill Discovery

An evolutionary loop that **discovers high-performance skills** for agents automatically.

### The Loop

```
┌─────────────┐     ┌───────────┐     ┌───────────┐
│ Base Agent   │────→│ Proposer  │────→│ Generator │
│ (attempt     │     │ (analyze  │     │ (implement│
│  questions)  │     │  failures)│     │  changes) │
└──────────────┘     └───────────┘     └─────┬─────┘
       ↑                                      │
       │         ┌───────────┐                │
       └─────────│ Frontier  │←───────────────┘
                 │ (top-N    │   ┌───────────┐
                 │  programs)│←──│ Evaluator │
                 └───────────┘   │ (score on │
                                 │  val set) │
                                 └───────────┘
```

### Two Evolution Modes

| Mode | What Changes | Best For |
|:-----|:-------------|:---------|
| `skill_only` | Discovers new reusable skills | Adding capabilities |
| `prompt_only` | Optimizes system prompt | Improving reasoning |

### Frontier Management

- Keep **top-N** best-performing configurations
- Each "program" is a versioned combination of prompt + skills
- Select parent from frontier → mutate → evaluate → keep if better

---

## 4. Failure Analysis Framework

Before proposing improvements, analyze failures systematically:

### Step 1: Trace Review
- What actions did the agent take?
- Where did it succeed or struggle?
- What information was available vs. missing?

### Step 2: Gap Analysis
- What specific information is incorrect or missing?
- What reasoning errors occurred?
- What capabilities would have prevented these issues?

### Step 3: Root Cause Classification

| Root Cause | Fix Type | Decision |
|:-----------|:---------|:---------|
| Missing capabilities/tools | Skill | CREATE new skill |
| Multi-step procedure needed (>3 steps) | Skill | CREATE new skill |
| Output structuring/formatting | Skill | CREATE new skill |
| Existing skill should have helped | Skill | EDIT existing skill |
| General guidance/reasoning approach | Prompt | Modify prompt |
| Mindset or judgment issue | Prompt | Modify prompt |

**The Test**: "Is this about WHAT steps to take (→ skill) or HOW to think (→ prompt)?"

### Anti-Patterns

- ❌ Creating narrow skills that only fix one failure → ensure broad applicability
- ❌ Proposing new skills when existing ones overlap → consolidate or EDIT
- ❌ Overfitting prompts to specific failure cases → use abstraction ladder
- ❌ Ignoring feedback history → check what was tried before

---

## 5. The Abstraction Ladder

When tempted to add specific instructions, climb the abstraction ladder:

```
BAD:  "Use np.std(data, ddof=1) for standard deviation"
       ↓ too specific, won't generalize
BETTER: "Use sample standard deviation (n-1) for inferential statistics"
       ↓ still somewhat specific
BEST:  "Choose statistical methods appropriate for your sample type and inference goals"
       ↓ generalizes across many tasks
```

**Rule**: Prompts guide HOW to think, not WHAT to calculate. Ask: "Would this instruction help with 10+ different unrelated tasks?"

---

## 6. Dynamic Stack Loading

| When User Needs | Load This |
|:----------------|:----------|
| Feedback Descent implementation | `references/feedback-descent.md` |
| Skill evolution patterns | This SKILL.md |
| Prompt optimization | [[prompt-engineer]] |
| Failure debugging | [[debugging]] |

---

*Part of [[ai-development-moc]] | Source: Adapted from [EvoSkill](https://github.com/sentient-agi/EvoSkill) (Apache 2.0)*
