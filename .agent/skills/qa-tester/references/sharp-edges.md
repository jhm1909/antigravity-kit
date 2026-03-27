# Sharp Edges: API Footgun Analysis

> Source: Trail of Bits — sharp-edges skill

Evaluates whether APIs, configs, and interfaces are resistant to developer misuse.

## Core Principle
**The pit of success**: Secure usage should be the path of least resistance.

## 6 Categories of Sharp Edges

### 1. Algorithm/Mode Selection Footguns
APIs that let devs choose algorithms invite choosing wrong ones.
- Detection: `algorithm`, `mode`, `cipher`, `hash_type` parameters

### 2. Dangerous Defaults
Defaults that are insecure, or zero/empty values that disable security.
- Ask: What happens with `timeout=0`? `max_attempts=0`? `key=""`?

### 3. Primitive vs. Semantic APIs
APIs exposing raw bytes instead of meaningful types invite confusion.
- Detection: Functions taking `bytes`/`string` for distinct security concepts

### 4. Configuration Cliffs
One wrong setting creates catastrophic failure with no warning.
- Detection: Boolean flags that disable security entirely

### 5. Silent Failures
Errors that don't surface, or success that masks failure.
- Detection: Functions returning booleans instead of throwing on security failures

### 6. Stringly-Typed Security
Security-critical values as plain strings enable injection.
- Detection: Permissions as comma-separated strings instead of enums

## 3 Adversary Types

1. **The Scoundrel** — Actively malicious (can they disable security via config?)
2. **The Lazy Developer** — Copy-pastes examples (is the first example secure?)
3. **The Confused Developer** — Misunderstands API (can parameters be swapped?)

## Severity

| Severity | Criteria |
|----------|----------|
| Critical | Default or obvious usage is insecure |
| High | Easy misconfiguration breaks security |
| Medium | Unusual but possible misconfiguration |
| Low | Requires deliberate misuse |
