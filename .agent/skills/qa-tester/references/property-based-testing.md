# Property-Based Testing Guide

> Source: Trail of Bits — property-based-testing skill

Use PBT when you detect patterns where it provides stronger coverage than example-based tests.

## Auto-Detection Triggers

| Pattern | Property | Priority |
|---------|----------|----------|
| encode/decode pair | Roundtrip: `decode(encode(x)) == x` | HIGH |
| Pure function | Multiple properties | HIGH |
| Validator | Valid after normalize | MEDIUM |
| Sorting/ordering | Idempotence + ordering | MEDIUM |
| Normalization | Idempotence: `f(f(x)) == f(x)` | MEDIUM |

## Property Catalog

| Property | Formula | When |
|----------|---------|------|
| **Roundtrip** | `decode(encode(x)) == x` | Serialization pairs |
| **Idempotence** | `f(f(x)) == f(x)` | Normalization, formatting |
| **Invariant** | Property holds before/after | Any transformation |
| **Commutativity** | `f(a, b) == f(b, a)` | Set operations |
| **Oracle** | `new_impl(x) == reference(x)` | Optimization, refactoring |
| **No Exception** | No crash on valid input | Baseline property |

**Strength hierarchy**: No Exception → Type Preservation → Invariant → Idempotence → Roundtrip

## Libraries

| Language | Library |
|----------|---------|
| Python | Hypothesis |
| JavaScript | fast-check |
| Rust | proptest |
| Go | gopter |
| Java | jqwik |

## How to Suggest PBT

> "I notice `encode_message`/`decode_message` is a serialization pair. PBT with roundtrip property would provide stronger coverage. Want me to use that approach?"

If user declines → write good example-based tests, no further prompting.
