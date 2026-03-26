---
description: Analyze a reference project/kit, compare with ours, and generate an action plan for what to copy, adapt, or skip
---

# Absorb — Study & Adapt Reference Kit

> [!IMPORTANT]
> Philosophy: **Study → Compare → Copy Best → Upgrade → Ship**
> Reads a reference project, produces a structured action plan.

---

## Step 0: Identify Source

**Invoke `[project-manager]` skill** to clarify scope.

Ask user:

```
📂 Which reference project/kit to analyze?
1. A local directory (paste path)
2. A GitHub repo (paste URL)
3. An npm package (paste package name)
```

If **GitHub URL** → clone to `.agent/tmp/<repo-name>/`
If **npm package** → `npm pack <name> && tar -xf *.tgz -C .agent/tmp/`
If **local path** → use directly

---

## Step 1: Deep Scan

// turbo

**Invoke `[lead-architect]` skill** to analyze the reference project structure.

```bash
find <source-path> -type f -not -path '*node_modules*' -not -path '*.git/*' | head -200
```

Build an **inventory table**:

| Category | Count | Examples |
|----------|------:|---------|
| Agents | ? | orchestrator.md, debugger.md... |
| Skills | ? | react-patterns/, api-design/... |
| Workflows | ? | deploy.md, test.md... |
| Rules | ? | GEMINI.md, eslint-config... |
| Scripts | ? | verify_all.py, checklist.py... |
| Config | ? | mcp_config.json, .editorconfig... |
| Docs | ? | ARCHITECTURE.md, AGENT_FLOW.md... |

---

## Step 2: Compare With Our Kit

// turbo

**Invoke `[business-analysis]` skill** to create a comparison matrix.

For each item, classify action:

| Action | Meaning | When to Use |
|--------|---------|-------------|
| `COPY` | Take as-is | Doesn't exist in our kit |
| `ADAPT` | Copy + modify for our conventions | Different format |
| `UPGRADE` | Merge best parts into existing | Both have it, theirs is better |
| `SKIP` | Don't take | We have equal/better |
| `INSPIRE` | Study idea, write our own | Good idea, bad implementation |

---

## Step 3: Read Key Files

**Invoke `[lead-architect]` skill** to evaluate quality and compatibility.

For each `COPY` or `ADAPT` item:

1. Read first 50-80 lines to understand structure
2. Note format differences vs our conventions:
   - Frontmatter format (our agentskills.io spec vs theirs)
   - Skill invocation pattern (`Invoke [skill]`)
   - Knowledge graph integration needed?
3. Assess quality: keep, improve, or rewrite?

---

## Step 4: Generate Action Plan

**Invoke `[project-manager]` skill** to structure the plan.

Create `docs/050-Research/Absorb-<source-name>.md`:

```markdown
# Absorb Plan: <Source Name>

## Summary
| Action | Count |
|--------|------:|
| COPY | X |
| ADAPT | X |
| UPGRADE | X |
| SKIP | X |
| INSPIRE | X |

## COPY Items
### <filename>
- **Source**: <path> → **Target**: <our-path>
- **Changes needed**: None

## ADAPT Items
### <filename>
- **Source**: <path> → **Target**: <our-path>
- **Changes**:
  - [ ] Update frontmatter to agentskills.io format
  - [ ] Add skill invocations
  - [ ] Integrate with knowledge graph

## UPGRADE Items
### <filename>
- **Take from theirs**: Section X (better)
- **Keep ours**: Section A (our format)

## SKIP / INSPIRE Items
(table format)
```

---

## Step 5: User Review

Present the action plan:

```
📋 Absorb Plan ready!
COPY: X | ADAPT: X | UPGRADE: X | SKIP: X | INSPIRE: X

1. Execute all (recommended)
2. Let me pick specific items
3. Skip for now
```

---

## Step 6: Execute Plan

**Invoke `[lead-architect]` skill** for structural changes.
**Invoke relevant domain skill** for content adaptation.

Process in order:
1. **COPY items** → direct file copies
2. **ADAPT items** → copy + apply our conventions
3. **UPGRADE items** → careful merge

For each:
```
✅ [1/12] COPIED: agents/orchestrator.md
✅ [2/12] ADAPTED: mcp_config.json (updated for our format)
✅ [3/12] UPGRADED: frontend skill (merged 5 new sections)
```

After all items:
- **Invoke `[project-manager]` skill** to update `skills-manifest.json`
- Update `skills-manifest.json` if new entries needed
- Suggest `/commit`

---

## Error Handling

| Issue | Recovery |
|-------|----------|
| Source not found | Ask user to verify path |
| Format incompatible | Flag as INSPIRE instead |
| Conflict with existing | Show diff, ask user |
