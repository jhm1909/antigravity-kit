---
name: mcp-builder
description: Guide for creating production-grade MCP (Model Context Protocol) servers. Use when building MCP servers to integrate external APIs, databases, or services ??whether in TypeScript (MCP SDK) or Python (FastMCP). Covers architecture, tool design, security, evaluation, and best practices.
---

# MCP Server Development Guide

> Source: Adapted from [Anthropic Official Skills](https://github.com/anthropics/skills) (Apache 2.0)

## Overview

Create MCP servers that enable LLMs to interact with external services through well-designed tools. Quality is measured by how well it enables LLMs to accomplish real-world tasks.

## ?? High-Level Workflow

### Phase 1: Deep Research and Planning

1. **Understand Modern MCP Design**
   - Balance API coverage with workflow tools
   - Use clear, action-oriented tool naming (e.g., `github_create_issue`)
   - Design concise tool descriptions for agent discoverability
   - Return actionable error messages with specific suggestions

2. **Study Framework Documentation**
   - **Recommended stack**: TypeScript (best SDK support + AI compatibility)
   - **Transport**: Streamable HTTP for remote, stdio for local
   - Load: [?ìã MCP Best Practices](./references/mcp_best-practices.md)
   - Load: [??TypeScript Guide](./references/node-mcp-server.md)
   - Load: [?êç Python Guide](./references/python-mcp-server.md)

3. **Plan Implementation**
   - Review the service's API documentation
   - Prioritize comprehensive API coverage
   - List endpoints, starting with most common operations

### Phase 2: Implementation

1. **Project Structure** ??see language-specific guides
2. **Core Infrastructure** ??API client, error handling, pagination, response formatting
3. **Tool Implementation**:
   - Input Schema: Zod (TS) or Pydantic (Python) with constraints
   - Output Schema: Define `outputSchema` where possible
   - Annotations: `readOnlyHint`, `destructiveHint`, `idempotentHint`

### Phase 3: Review and Test

- No duplicated code (DRY)
- Consistent error handling
- Full type coverage
- Test with MCP Inspector: `npx @modelcontextprotocol/inspector`

### Phase 4: Create Evaluations

Load [??Evaluation Guide](./references/evaluation.md) for complete guidelines.

Create 10 evaluation questions that are:
- **Independent** ??not dependent on other questions
- **Read-only** ??non-destructive operations only
- **Complex** ??requiring multiple tool calls
- **Realistic** ??based on real use cases
- **Verifiable** ??single, clear answer
- **Stable** ??answer won't change over time

## Reference Files

| File | When to Load |
|------|-------------|
| [mcp_best-practices.md](./references/mcp_best-practices.md) | Always ??naming, security, pagination, transport |
| [node-mcp-server.md](./references/node-mcp-server.md) | TypeScript/Node implementation |
| [python-mcp-server.md](./references/python-mcp-server.md) | Python/FastMCP implementation |
| [evaluation.md](./references/evaluation.md) | Phase 4 ??creating quality evaluations |

## Knowledge Graph

- **extends**: `backend-developer`, `lead-architect`
- **complements**: `devops-engineer` (deployment), `qa-tester` (testing)
