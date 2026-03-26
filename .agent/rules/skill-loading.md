---
trigger: model_decision
description: Always apply when loading, routing, or recommending skills from the agent kit
---

# Skill Loading Rule

## Critical Rules (MUST Follow)

1. **MUST** check `skills-manifest.json` before loading any skill — verify skill exists and read its triggers
2. **MUST** follow the Knowledge Graph relationships in `SKILL.md` — load `extends` parents first, then the skill itself
3. **MUST** respect `conflicts` — never load two conflicting skills simultaneously
4. **MUST** load `requires` dependencies automatically (hard requirements)
5. **MUST** suggest `suggests` skills to user (soft recommendations, don't auto-load)
6. **MUST** consider `estimated_tokens` — avoid loading more skills than the context window allows
7. **MUST NOT** load a skill's full content unless it's needed — use trigger matching first

## Decision Flow

```
┌─────────────────────────────────────────────────────────────┐
│ WHEN user request comes in:                                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Match request against skill triggers                      │
│    → Check skills-manifest.json "triggers" arrays            │
│    → Also check file patterns (e.g., app/_layout.tsx → mobile)│
│    Found match? → Load that skill's SKILL.md                 │
│    No match?   → Use project-manager as default router       │
├─────────────────────────────────────────────────────────────┤
│ 2. Check Knowledge Graph section of loaded skill             │
│    Has "extends"?  → Load parent skill FIRST                 │
│    Has "requires"? → Load required skills automatically      │
│    Has "suggests"? → Mention to user: "Consider also..."     │
│    Has "conflicts"?→ Check if conflicting skill is active    │
├─────────────────────────────────────────────────────────────┤
│ 3. Estimate token budget                                     │
│    Sum estimated_tokens of all loaded skills                  │
│    > 50% of context? → Warn user, suggest unloading          │
│    > 80% of context? → STOP, ask user which to prioritize    │
├─────────────────────────────────────────────────────────────┤
│ 4. Load sub-skills on demand                                 │
│    Don't preload all sub-skills                               │
│    Load only when task requires specific sub-capability       │
└─────────────────────────────────────────────────────────────┘
```

## Trigger Matching Priority

| Priority | Match Type | Example |
|----------|-----------|---------|
| 1 (highest) | File pattern detected | `app/_layout.tsx` → `mobile-developer` |
| 2 | Explicit keyword in request | "deploy to AWS" → `devops-engineer` |
| 3 | Domain context | Working in `.sol` files → `blockchain-engineer` |
| 4 | Suggested by active skill | `frontend-developer` suggests `designer` |

## Token Budget Guidelines

| Skill Load | Tokens | Context Usage |
|-----------|--------|---------------|
| 1 base skill | 3-10K | ✅ Light |
| 1 base + 1 sub-skill | 10-20K | ✅ Normal |
| 2 base + extends chain | 20-40K | ⚠️ Monitor |
| 3+ skills loaded | 40K+ | 🚨 Review & trim |

## Skill Chain Examples

**React Next.js project:**
```
frontend-developer (3.5K)
  └─ extends: none (base)
  └─ load sub: react-nextjs/ (additional)
  └─ suggests: designer, tailwind-setup
Total: ~8K tokens
```

**Mobile Expo project:**
```
mobile-developer (8K)
  └─ extends: frontend-developer (3.5K)
  └─ load sub: building-ui/ (on demand)
  └─ suggests: backend-developer, designer
Total: ~12K tokens
```

## Progressive Disclosure (from Anthropic's skill-creator)

Skills should follow a **3-level loading** strategy to minimize token usage:

| Level | What | When |
|-------|------|------|
| **L1: Metadata** | `skills-manifest.json` entry (name, triggers, size) | Always loaded — routing decisions |
| **L2: SKILL.md** | Main instruction file — **≤ 150 lines** | Loaded when skill is activated |
| **L3: references/** | Deep docs, examples, sub-skills | Loaded on-demand when specific topic needed |

**Key rules:**
- SKILL.md **MUST** stay under 150 lines — force progressive disclosure
- Description in manifest **MUST** be < 200 chars — for efficient discovery
- Put detailed content in `references/` folder, link from SKILL.md
- Never front-load everything — load deep context only when task requires it

