# Supply Chain Risk Audit

> Source: Trail of Bits — supply-chain-risk-auditor skill

Systematically evaluate all dependencies to identify risk of exploitation or takeover.

## Risk Criteria

A dependency is high-risk if:

| Factor | Description |
|--------|-------------|
| **Single maintainer** | Solo individual, not org-backed. Anonymous = higher risk |
| **Unmaintained** | No updates for long period, archived, or seeking new maintainers |
| **Low popularity** | Few GitHub stars/downloads relative to other deps |
| **High-risk features** | FFI, deserialization, third-party code execution |
| **Past CVEs** | High/critical severity CVEs, especially many relative to size |
| **No security contact** | No SECURITY.md, no security email listed |

## Workflow

### 1. Initial Setup
```bash
# List all direct dependencies
cat package.json | jq '.dependencies' # Node.js
# or: pip list --format=json | jq '.[].name' # Python
```

### 2. For Each Dependency
Use `gh` CLI to check:
- Stars count, last commit date
- Number of contributors
- Open security issues
- SECURITY.md presence

### 3. Report
For each high-risk dep:
- Risk factors identified
- Suggested alternatives (more popular, better maintained)
- Short justification

### 4. Summary
- Total deps scanned
- Count by risk factor
- Executive summary of security posture
- Top recommendations

## Example Output
```markdown
| Dependency | Risk Factors | Alternative |
|-----------|-------------|-------------|
| tiny-parser | Single maintainer, 12⭐, no SECURITY.md | safer-parser (org-backed, 5k⭐) |
| old-crypto | Unmaintained (2yr), 3 CVEs | node:crypto (built-in) |
```
