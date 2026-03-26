---
description: Search, preview, and install external agent skills from GitHub repos or registries
---

# Install Skill — On-Demand Skill Installer

> [!IMPORTANT]
> Philosophy: **Search → Preview → Confirm → Install → Register**
> Combines ALL search methods: Registry → GitHub → Web → context7

---

## Step 0: Parse Request

Determine what user wants:

```
📦 Install a skill:
1. By name:    /install-skill stripe
2. By repo:    /install-skill github.com/stripe/ai
3. By domain:  /install-skill "payment processing"
```

Extract: `<query>` (name, URL, or domain keyword)

---

## Step 1: Multi-Source Search

// turbo

Run **ALL search methods in parallel**, prioritized by reliability:

### 1.1 Registry Lookup (fastest, most reliable)
```
Read .agent/known-registries.json
→ Match <query> against entries
→ If found: return { repo, skill_path, description }
```

### 1.2 GitHub MCP Search
```
mcp_github_search_code: "SKILL.md <query>" 
mcp_github_search_repositories: "<query> agent-skills"
→ Filter: must contain SKILL.md
→ Sort by stars
```

### 1.3 Web Search
```
search_web: "<query> agent skill SKILL.md github 2025 2026"
→ Extract GitHub URLs from results
```

### 1.4 context7 Docs (fallback — not a skill, but useful)
```
mcp_context7_resolve-library-id: "<query>"
→ If found: offer as alternative to skill install
→ "No skill found, but context7 has live docs for <query>"
```

---

## Step 2: Present Results

Merge and deduplicate results. Present top matches:

```
🔍 Found skills for "<query>":

  ⭐ Registry Match:
  1. stripe/stripe-best-practices — Best practices for Stripe integrations
     Source: github.com/stripe/ai (✅ verified registry)

  🔎 GitHub Results:
  2. community/stripe-checkout — Stripe Checkout integration patterns
     Source: github.com/user/repo (⚠️ community, 45⭐)

  📚 context7 Docs (alternative):
  3. Stripe API docs available via context7 (real-time, no install needed)

Which to install? (number, or 'skip')
```

> [!TIP]
> If **only context7 results** found (no SKILL.md), suggest:
> "No installable skill found. But I can use context7 to query live docs for `<query>` anytime. Want to proceed without installing?"

---

## Step 3: Preview & Confirm

// turbo

For the selected skill:

1. **Read SKILL.md** from source (via GitHub MCP or clone)
   ```
   mcp_github_get_file_contents(owner, repo, "skills/<name>/SKILL.md")
   ```

2. **Show preview** to user:
   ```
   📋 Skill Preview: stripe-best-practices
   ├── Name: Stripe Best Practices
   ├── Source: github.com/stripe/ai
   ├── Size: ~120 lines
   ├── Conflicts: None (new skill)
   └── Dependencies: None

   Install? (y/n)
   ```

3. **Check conflicts**: Does `.agent/skills/<name>/` already exist?
   - If yes → offer UPGRADE mode (merge) or SKIP

---

## Step 4: Install

// turbo

### 4.1 Clone source
```bash
git clone --depth 1 <repo-url> .agent/tmp/<repo-name>
```

### 4.2 Copy skill files
```bash
# Copy skill directory to our skills folder
cp -r .agent/tmp/<repo-name>/skills/<skill-name> .agent/skills/<skill-name>/
```

### 4.3 Adapt to our conventions
For each file in the installed skill:
- Ensure SKILL.md has valid frontmatter (name, description)
- Check line count — if > 150 lines, suggest splitting per `skill-loading.md` rule
- Rename directories to match our naming convention (lowercase-kebab)

### 4.4 Register in manifest
Update `.agent/skills-manifest.json`:
```json
{
  "name": "<skill-name>",
  "description": "<from SKILL.md>",
  "path": ".agent/skills/<skill-name>",
  "source": "<repo-url>",
  "installed": "<ISO date>",
  "type": "external"
}
```

Update `.agent/skills-manifest.json` with triggers and workflow refs.

### 4.5 Cleanup
```bash
rm -rf .agent/tmp/<repo-name>
```

---

## Step 5: Confirm & Suggest

```
✅ Installed: stripe-best-practices
   Path: .agent/skills/stripe-best-practices/
   Source: github.com/stripe/ai
   Type: external

💡 Tip: Use /commit to save this change.
```

---

## Error Handling

| Issue | Recovery |
|-------|----------|
| No results found | Suggest broadening query or using context7 |
| SKILL.md missing | Warn: "This repo has no SKILL.md — cannot install as skill" |
| Already installed | Offer upgrade or skip |
| Clone fails | Check URL, suggest manual download |
| Skill > 150 lines | Auto-split per skill-loading.md rule |

---

## Search Priority Order

```
Registry (instant) → GitHub MCP (seconds) → Web (seconds) → context7 (fallback)
     ↓ found?              ↓ found?            ↓ found?          ↓ found?
   Install             Install             Install         Offer live docs
```
