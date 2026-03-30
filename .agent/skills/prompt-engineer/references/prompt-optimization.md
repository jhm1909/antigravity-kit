# Prompt Optimization Methodology

> Adapted from [sentient-agi/EvoSkill](https://github.com/sentient-agi/EvoSkill) (Apache 2.0)
> Original: `src/agent_profiles/prompt_generator/prompt.py`

## Overview

A structured methodology for optimizing prompts that avoids overfitting to specific failures while producing generalizable improvements.

---

## Analysis Process

Before writing an improved prompt, work through this analysis:

### 1. Understand the Original Intent
- What is this prompt trying to accomplish?
- What role is the model expected to play?
- What inputs does it receive and what outputs should it produce?

### 2. Interpret the Proposal
- What specific behavioral change is being requested?
- What root cause does the justification identify?
- How should this translate into concrete prompt modifications?

### 3. Plan the Implementation
- What exact wording will achieve the proposed change?
- Where in the prompt should modifications be placed?
- Are there prompt engineering techniques that would help?
- What unintended side effects might the changes introduce?

---

## Prompt Engineering Principles

### Clarity and Specificity
- Be explicit about desired behaviors — models follow instructions precisely
- Provide context or motivation for instructions to help understand the goal
- Specify output format, length, and style when relevant

### Structure and Organization
- Use XML tags to separate distinct sections (e.g., `<instructions>`, `<examples>`, `<context>`)
- Place the most important instructions prominently
- For long contexts, put reference material at the top and queries at the bottom

### Positive Framing
- Tell the model what to do, not just what to avoid
- Instead of "Don't use jargon" → "Use clear, accessible language suitable for a general audience"
- Provide the reasoning behind constraints

### Examples and Demonstrations
- Include 2-3 diverse examples for complex or nuanced tasks
- Show both inputs and expected outputs
- Examples reduce ambiguity more effectively than lengthy explanations

### Reasoning and Thinking
- For complex tasks, instruct to think step-by-step
- Use structured thinking tags when intermediate reasoning improves output quality
- Balance reasoning depth with latency requirements

---

## Generalization Rules

The optimized prompt must remain general and transferable. Avoid overfitting to specific failure cases.

### DO: General Guidance
- Principles that apply across many different tasks
- Reasoning strategies and decision frameworks
- Tool usage guidelines that generalize
- Output quality standards

### DON'T: Task-Specific Instructions
- Library-specific function calls (e.g., "use `np.std(ddof=1)`")
- Exact calculation procedures for specific problem types
- Step-by-step instructions for narrow scenarios
- References to specific data sources or formats

### The Test
> "Would this instruction help with 10 different unrelated tasks, or just this one failure case?"

If just one, make it more general.

---

## The Abstraction Ladder

When tempted to add specific instructions, climb the abstraction ladder:

| Level | Example | Quality |
|:------|:--------|:--------|
| Too Specific | "Use `np.std(data, ddof=1)` for standard deviation" | ❌ BAD |
| Better | "Use sample standard deviation (n-1) for inferential statistics" | ⚠️ BETTER |
| Generalizable | "Choose statistical methods appropriate for your sample type and inference goals" | ✅ BEST |

**Rule**: Prompts guide HOW to think, not WHAT to calculate.

---

## Quality Checklist

Before finalizing an optimized prompt, verify:

- [ ] The proposed change is addressed at the right level of abstraction
- [ ] Instructions are general enough to apply to 10+ different tasks
- [ ] No library-specific function calls or exact procedures
- [ ] The prompt guides HOW to think, not WHAT to calculate
- [ ] The justification's root cause is addressed through principles, not rules
- [ ] Instructions use positive framing where possible
- [ ] The prompt is as concise as possible while remaining clear
- [ ] Would NOT overfit if the agent encounters a similar but different problem

---

## Examples

### Example 1: Tool Usage (Good Optimization)

**Original**: "You are a helpful assistant. Answer the user's questions."

**Proposed Change**: Agent needs instructions to always delegate numerical computations to available tools.

**Optimized**:
```
You are a helpful assistant that provides accurate, well-reasoned answers.

## Core Rules

### Always Use Tools for Calculations
When any task involves numerical computation—even simple arithmetic—use the
calculator tool rather than performing mental math.

Why this matters: Manual calculations introduce rounding errors that compound
across steps. The calculator tool ensures precision and consistency.

Rule: If you see numbers that need to be combined, compared, or transformed,
use a computational tool.
```

**Why this works**: Dedicated section for the behavioral rule, positive framing ("use the tool" not "don't do math"), includes reasoning ("why this matters").

### Example 2: Avoiding Overfitting (BAD vs GOOD)

**Proposed Change**: "Use sample standard deviation with ddof=1 when computing z-scores from sample data."

❌ **BAD (Overfitted)**:
```
When computing z-scores, always use sample standard deviation.
In Python, use np.std(data, ddof=1) or statistics.stdev().
```

✅ **GOOD (General)**:
```
## Statistical Analysis Guidelines

When performing statistical calculations:
- Identify whether you're working with a sample or a full population
- Select formulas and methods appropriate for your data type
- For inferential statistics, use sample-based estimators
- Document your methodological choices and why they're appropriate

Before finalizing calculations, verify your methodology matches
the statistical context of the problem.
```
