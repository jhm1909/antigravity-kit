# Static Analysis with Semgrep

> Source: Trail of Bits — static-analysis/semgrep skill

Run Semgrep scan with language detection and parallel execution.

## Essential Principles

1. **Always use `--metrics=off`** — prevent telemetry data leakage
2. **User must approve scan plan** — present rulesets before scanning
3. **Third-party rulesets required** — Trail of Bits, 0xdea, Decurity rules catch vendor-missing vulns
4. **Check for Semgrep Pro** — cross-file taint tracking catches ~250% more true positives

## Scan Modes

| Mode | Coverage | Findings |
|------|----------|----------|
| **Run all** | All rulesets, all severity | Everything |
| **Important only** | Pre/post-filtered | Security vulns, medium-high confidence |

## Quick Workflow

### 1. Detect languages + check Pro
```bash
semgrep --version
semgrep --pro --validate --config p/default 2>/dev/null && echo "Pro" || echo "OSS"
```

### 2. Select rulesets per language
Include official + third-party rules for each detected language.

### 3. Get user approval (HARD GATE)
Present exact rulesets, target, engine, and mode — wait for "yes".

### 4. Run parallel scans
One scan per language/ruleset combination. All in parallel.

### 5. Merge & report
Merge SARIF outputs, summarize by severity and category.

## Key Commands

```bash
# Basic scan
semgrep --config p/security-audit --metrics=off --sarif -o results.sarif .

# Important only
semgrep --config p/security-audit --metrics=off --severity MEDIUM --severity HIGH --severity CRITICAL .

# With third-party rules
semgrep --config p/security-audit --config "https://semgrep.dev/p/trailofbits" --metrics=off .
```
