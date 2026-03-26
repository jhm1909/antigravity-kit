# Differential Security Review

> Source: Trail of Bits — differential-review skill

Security-focused code review for PRs, commits, and diffs.

## Core Principles

1. **Risk-First**: Focus on auth, crypto, value transfer, external calls
2. **Evidence-Based**: Every finding backed by git history, line numbers, attack scenarios
3. **Adaptive**: Scale to codebase size (SMALL/MEDIUM/LARGE)
4. **Honest**: Explicitly state coverage limits and confidence level

## Codebase Size Strategy

| Size | Strategy | Approach |
|------|----------|----------|
| SMALL (<20 files) | DEEP | Read all deps, full git blame |
| MEDIUM (20-200) | FOCUSED | 1-hop deps, priority files |
| LARGE (200+) | SURGICAL | Critical paths only |

## Workflow

### Pre-Analysis → Triage → Code Analysis → Test Coverage → Blast Radius → Deep Context → Adversarial → Report

### Phase 0: Triage
Classify risk per file: HIGH / MEDIUM / LOW

### Phase 1: Code Analysis
For HIGH risk files: git blame removed code, check for regression patterns

### Phase 2: Test Coverage
Missing tests on security code = elevated severity

### Phase 3: Blast Radius
Count transitive callers. High blast radius + HIGH risk = critical priority.

### Phase 4: Adversarial Modeling (HIGH risk only)
- Attacker model: What can they exploit?
- Exploit scenario: Concrete steps
- Exploitability rating: trivial / moderate / complex

### Phase 5: Report
Generate markdown report with all findings, evidence, and recommendations.

## Red Flags (Stop and Investigate)

- Removed code from "security", "CVE", or "fix" commits
- Access control modifiers removed
- Validation removed without replacement
- External calls added without checks
- High blast radius (50+ callers) + HIGH risk change

## Rationalizations to Reject

- "Small PR, quick review" → Heartbleed was 2 lines
- "I know this codebase" → Familiarity breeds blind spots
- "Just a refactor" → Refactors break invariants; analyze as HIGH until proven LOW
- "No tests = not my problem" → Missing tests = elevated risk rating
