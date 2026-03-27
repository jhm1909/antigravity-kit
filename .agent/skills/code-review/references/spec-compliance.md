# Spec-to-Code Compliance Check

> Source: Trail of Bits — spec-to-code-compliance skill

Verifies code implements exactly what documentation specifies.

## 6-Phase Methodology

### Phase 0: Documentation Discovery
Find ALL docs: whitepaper, README, design notes, Notion, transcripts.

### Phase 1: Normalize
Convert all docs to clean canonical text corpus.

### Phase 2: Spec → Intent IR
Extract all intended behavior with evidence:
- Invariants, preconditions, postconditions
- Math formulas, state transitions
- Security requirements ("must/never/always")

### Phase 3: Code → Behavior IR
Line-by-line semantic analysis:
- State reads/writes, conditional branches
- Revert conditions, external calls
- Authorization graph, hidden assumptions

### Phase 4: Alignment (Spec ↔ Code)
Match types: full_match | partial_match | mismatch | missing_in_code | code_stronger | code_weaker

### Phase 5: Classification
| Severity | Criteria |
|----------|----------|
| CRITICAL | Spec says X, code does Y |
| HIGH | Partial/incorrect implementation |
| MEDIUM | Ambiguity with security implications |
| LOW | Documentation drift |

## Anti-Hallucination Rules

- If spec is silent → classify as **UNDOCUMENTED**
- If code adds behavior → classify as **UNDOCUMENTED CODE PATH**
- Every claim must quote original text or line numbers
- Zero speculation
