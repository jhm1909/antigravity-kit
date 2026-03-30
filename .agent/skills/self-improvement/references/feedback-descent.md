# Feedback Descent: Text Optimization via Pairwise Comparison

> Source: [arxiv:2511.07919](https://arxiv.org/abs/2511.07919)
> Adapted from: [sentient-agi/EvoSkill](https://github.com/sentient-agi/EvoSkill) (Apache 2.0)

## Overview

Feedback Descent optimizes text artifacts (prompts, skills, instructions) through **structured textual feedback** rather than scalar rewards. It uses pairwise comparisons to guide improvements.

## Algorithm

```python
from typing import TypeVar, Generic, Protocol, List
from dataclasses import dataclass

T = TypeVar("T")


@dataclass
class EvaluationResult:
    """Result of comparing a candidate against the current best."""
    preference_for_candidate: bool
    rationale: str
    score_best: float | None = None
    score_candidate: float | None = None


@dataclass
class FeedbackEntry(Generic[T]):
    """A single feedback entry containing a candidate and its evaluation rationale."""
    candidate: T
    rationale: str


@dataclass
class FeedbackDescentResult(Generic[T]):
    """Final result of the optimization loop."""
    best: T
    feedback_history: List[FeedbackEntry[T]]
    iterations: int
    improved: bool


class Proposer(Protocol[T]):
    """Protocol for generating candidates."""

    def generate_initial(self, problem: str) -> T:
        """Generate an initial candidate from the problem description."""
        ...

    def propose(self, current_best: T, feedback_history: List[FeedbackEntry[T]]) -> T:
        """Propose a new candidate based on current best and accumulated feedback."""
        ...


class Evaluator(Protocol[T]):
    """Protocol for evaluating candidates via pairwise comparison."""

    def evaluate(self, current_best: T, candidate: T) -> EvaluationResult:
        """Compare candidate against current best, returning preference and rationale."""
        ...


class FeedbackDescent(Generic[T]):
    """
    Core Feedback Descent optimization loop.

    Algorithm:
        1. Initialize: x* <- x0, feedback_history <- []
        2. For t = 1 to max_iterations:
            a. Propose: candidate <- proposer(x*, feedback_history)
            b. Compare: preference, rationale <- evaluator(x*, candidate)
            c. Record: feedback_history.append(rationale)
            d. Update: if preference favors candidate: x* <- candidate, feedback_history <- []
            e. Early stop: if no improvement for k iterations, break
        3. Return x*
    """

    def __init__(
        self,
        proposer: Proposer[T],
        evaluator: Evaluator[T],
        max_iterations: int = 10,
        no_improvement_limit: int = 3,
    ):
        self.proposer = proposer
        self.evaluator = evaluator
        self.max_iterations = max_iterations
        self.no_improvement_limit = no_improvement_limit

    def run(self, problem: str) -> FeedbackDescentResult[T]:
        best = self.proposer.generate_initial(problem)
        feedback_history: List[FeedbackEntry[T]] = []
        no_improvement_count = 0
        iterations = 0

        for iteration in range(self.max_iterations):
            iterations = iteration + 1

            # Propose a new candidate
            candidate = self.proposer.propose(best, feedback_history)

            # Evaluate candidate vs current best
            result = self.evaluator.evaluate(best, candidate)

            # Record feedback regardless of outcome
            feedback_history.append(FeedbackEntry(candidate, result.rationale))

            if result.preference_for_candidate:
                # Candidate wins: update best and reset feedback history
                best = candidate
                feedback_history = []
                no_improvement_count = 0
            else:
                # No improvement: increment counter and check for early stop
                no_improvement_count += 1
                if no_improvement_count >= self.no_improvement_limit:
                    break

        return FeedbackDescentResult(
            best=best,
            feedback_history=feedback_history,
            iterations=iterations,
            improved=(no_improvement_count == 0),
        )
```

## Key Design Decisions

1. **Pairwise over Scalar**: Text feedback ("why A is better than B") gives richer signal than scores
2. **Feedback History Reset**: When a new best is found, history resets — past failures of the old best are irrelevant to the new best
3. **Early Stopping**: `no_improvement_limit` prevents wasting iterations on a local optimum
4. **Protocol-based**: `Proposer` and `Evaluator` are Protocols — implement with LLMs, heuristics, or human judges

## Usage Patterns

### Prompt Optimization

```python
class LLMProposer:
    def generate_initial(self, problem: str) -> str:
        return llm.complete(f"Write a system prompt for: {problem}")

    def propose(self, current_best: str, feedback_history):
        context = "\n".join(f"- {f.rationale}" for f in feedback_history)
        return llm.complete(
            f"Improve this prompt based on feedback:\n"
            f"Current: {current_best}\n"
            f"Feedback: {context}"
        )

class LLMEvaluator:
    def evaluate(self, current_best: str, candidate: str) -> EvaluationResult:
        result = llm.complete(
            f"Compare these two prompts. Which is better?\n"
            f"A: {current_best}\nB: {candidate}"
        )
        return EvaluationResult(
            preference_for_candidate="B" in result,
            rationale=result
        )

# Run
fd = FeedbackDescent(LLMProposer(), LLMEvaluator(), max_iterations=5)
result = fd.run("Customer support agent for an e-commerce platform")
print(result.best)  # Optimized prompt
```

### Skill Instruction Refinement

```python
# Same pattern, but T = SkillDocument instead of str
fd = FeedbackDescent(SkillProposer(), SkillEvaluator(), max_iterations=10)
result = fd.run("Debugging skill for Python applications")
```
