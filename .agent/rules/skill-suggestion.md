# Skill Suggestion Rule

## When to Apply
Always active. AI should continuously monitor for skill gaps during conversations.

## Rule: Auto-Suggest External Skills

When the AI detects it's working in a **domain not covered by installed skills**, it should:

### 1. Detect Skill Gap
Trigger when:
- User mentions a technology/service not in `skills-manifest.json`
- AI is about to write code for an unfamiliar framework
- User asks about best practices for a specific tool/platform
- Task requires domain expertise beyond general coding

### 2. Check Known Registries
```
Read .agent/known-registries.json
→ Search for matching skill by name or description
```

### 3. Suggest (non-blocking)

Format suggestion as a brief inline note — do NOT interrupt the workflow:

```
💡 Skill suggestion: `stripe-best-practices` is available from the official 
   Stripe registry. Run `/install-skill stripe` to install it.
   (Continuing without it for now...)
```

### 4. Important Constraints

- **Never block** the user's current task to suggest a skill
- **Suggest once** per domain per conversation — don't repeat
- **Prefer context7** for simple docs lookups — only suggest skill install for comprehensive best-practices or methodology content
- **Don't suggest** for domains the user is clearly experienced in
- **Registry-only suggestions** — never suggest unverified community skills without user explicitly searching

### 5. Suggestion Priority

| Situation | Action |
|-----------|--------|
| Registry has matching skill | Suggest `/install-skill <name>` |
| No registry match, but context7 has docs | Say "I can query context7 for `<lib>` docs" |
| No match anywhere | Work with general knowledge, no suggestion |
