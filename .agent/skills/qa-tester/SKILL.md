---
name: qa-tester
description: >
  Test planning, test cases, bug reporting, automation, and security auditing.
  Use for Unit/E2E/Security/Performance/Property-Based testing and supply chain audits.
  Upgraded with Trail of Bits security methodology.
license: MIT
compatibility: Claude Code, Cursor, Gemini CLI, GitHub Copilot
metadata:
  author: jhm1909
  version: "3.0.0"
  domain: qa
  estimated_tokens: 12000
  sources:
    - trailofbits/skills (insecure-defaults, sharp-edges, property-based-testing, supply-chain-risk-auditor, semgrep)
---

# QA Tester

Comprehensive testing + security auditing for high-quality software delivery.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[frontend-developer]], [[backend-developer]], [[devops-engineer]], [[mobile-developer]]
- **conflicts**: []
- **enhances**: [[project-manager]] (quality metrics), [[business-analysis]] (acceptance criteria), [[code-review]] (verification gates)
- **moc**: [[quality-assurance-moc]]

## Core Philosophy

1. **Docs First** — Base all testing on `docs/` folder requirements
2. **No Assumptions** — Missing docs? STOP and CONFIRM with user
3. **Verify Everything** — Happy path, negative path, boundaries, edges
4. **Trust No Input** — Every input is a potential attack vector
5. **Pit of Success** — Secure usage should be the path of least resistance

## Decision Tree

```
What testing is needed?
│
├─ Functional testing?
│  └─ Read: test_case_standards.md, unit_testing.md, e2e_testing.md
│
├─ Security audit?
│  ├─ Insecure defaults/hardcoded secrets? → Read: security_audit.md
│  ├─ API footgun analysis? → Read: sharp_edges.md
│  ├─ Dependency risk? → Read: supply_chain_audit.md
│  └─ Static analysis scan? → Read: static_analysis.md
│
├─ Property-based testing?
│  └─ Read: property_based_testing.md
│
└─ Performance testing?
   └─ Read: performance_testing.md
```

## Test Types

| Type | Focus | Tool Examples |
|:-----|:------|:-------------|
| **Unit** | Logic verification | Jest, Vitest |
| **Integration** | Module handshake | Supertest, MSW |
| **E2E** | User flows | Playwright, Cypress |
| **Security** | Vulnerabilities | Semgrep, OWASP ZAP |
| **Performance** | Load, responsiveness | k6, Lighthouse |
| **Property-Based** | Invariants, roundtrips | Hypothesis, fast-check |
| **Supply Chain** | Dependency risk | gh CLI, npm audit |
| **Visual** | UI regression | Chromatic, Percy |
| **Accessibility** | WCAG compliance | axe, Pa11y |

## Test Design Techniques

### Noun-Verb Extraction
Scan docs for **Nouns** (User, Order) and **Verbs** (Register, Checkout)
→ Each Action = At least 1 Test Case

### Keyword Permutations
Look for "MUST", "CANNOT", "ONLY IF"
→ Test constraint met AND violated

### State Transition Mapping
Entity states (Pending → Paid → Shipped)
→ Test valid AND invalid transitions

### Property Detection (PBT)
| Pattern | Property | Priority |
|---------|----------|----------|
| encode/decode pair | Roundtrip | HIGH |
| Normalization | Idempotence | MEDIUM |
| Sorting/ordering | Idempotence + ordering | MEDIUM |
| Pure function | Multiple | HIGH |

## Security Audit Quick Checklist

When auditing code security, check:

- [ ] **Insecure defaults**: `env.get(X) or 'fallback'` — fail-open patterns
- [ ] **Hardcoded secrets**: `password = "..."`, `API_KEY = "..."`
- [ ] **Weak crypto**: MD5, SHA1, DES, RC4, ECB in security contexts
- [ ] **Permissive CORS**: `Access-Control-Allow-Origin: *`
- [ ] **Debug in prod**: `DEBUG = True`, stack traces exposed
- [ ] **Sharp edges**: APIs where easy path leads to insecurity
- [ ] **Supply chain**: Single-maintainer deps, stale packages, CVE history

## Coverage Requirements

- ✅ **Happy Path** — Golden flow
- ✅ **Negative Path** — Error handling
- ✅ **Boundary** — Off-by-one (0, 1, Max)
- ✅ **Edge Cases** — Timeouts, failures, concurrency
- ✅ **Integration** — Cross-module flows
- ✅ **Security** — Injection, auth bypass, data leaks

## References

| Reference | Purpose |
|:----------|:--------|
| `test_case_standards.md` | "No Ambiguity" philosophy |
| `unit_testing.md` | "Test Behavior, Not Implementation" |
| `integration_testing.md` | "Verify the Handshake" |
| `e2e_testing.md` | "Simulate the Real User" |
| `security_testing.md` | "Trust No Input" |
| `performance_testing.md` | "Performance is a Feature" |
| `security_audit.md` | Insecure defaults detection (Trail of Bits) |
| `sharp_edges.md` | API footgun analysis (Trail of Bits) |
| `property_based_testing.md` | PBT methodology (Trail of Bits) |
| `supply_chain_audit.md` | Dependency risk scoring (Trail of Bits) |
| `static_analysis.md` | Semgrep scanning workflow (Trail of Bits) |

## Related Skills

- [[frontend-developer]] — Component testing
- [[backend-developer]] — API testing
- [[code-review]] — Security-focused PR review
- [[project-manager]] — Quality metrics, UAT

---

*Quality assurance + Security auditing | Trail of Bits methodology integrated*
