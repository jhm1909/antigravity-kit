# Security Audit: Insecure Defaults Detection

> Source: Trail of Bits — insecure-defaults skill

Finds **fail-open** vulnerabilities where apps run insecurely with missing configuration.

## Key Distinction
- **Fail-open (CRITICAL):** `SECRET = env.get('KEY') or 'default'` → App runs with weak secret
- **Fail-secure (SAFE):** `SECRET = env['KEY']` → App crashes if missing

## Search Patterns

**Fallback secrets:**
- `getenv.*\) or ['"]` | `process\.env\.[A-Z_]+ \|\| ['"]` | `ENV\.fetch.*default:`

**Hardcoded credentials:**
- `password.*=.*['"][^'"]{8,}['"]` | `api[_-]?key.*=.*['"][^'"]+['"]`

**Weak defaults:**
- `DEBUG.*=.*true` | `AUTH.*=.*false` | `CORS.*=.*\*`

**Weak crypto:**
- `MD5|SHA1|DES|RC4|ECB` in security contexts

## Workflow

### 1. SEARCH — Find insecure defaults
Focus on `**/config/`, `**/auth/`, `**/database/`, and env files.

### 2. VERIFY — Check actual behavior
- When is this code executed?
- What happens if config variable is missing?
- Is there validation enforcing secure configuration?

### 3. CONFIRM — Production impact
- Production config provides the variable → Lower severity
- Production config missing → CRITICAL

### 4. REPORT — With evidence
```
Finding: Hardcoded JWT Secret Fallback
Location: src/auth/jwt.ts:15
Pattern: const secret = process.env.JWT_SECRET || 'default';
Verification: App starts without JWT_SECRET set
Exploitation: Attacker forges JWTs using 'default'
```

## Rationalizations to Reject

- "It's just a development default" → If it reaches production code, it's a finding
- "The production config overrides it" → Verify prod config exists
- "This would never run without proper config" → Prove it with code trace
- "We'll fix it before release" → Document now; "later" rarely comes
