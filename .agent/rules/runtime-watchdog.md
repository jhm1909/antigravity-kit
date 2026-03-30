---
trigger: always_on
description: Prevent agent hangs, infinite loops, and runaway execution
---

# Runtime Watchdog

> Prevent the agent from hanging, looping, or wasting resources.

## Loop Prevention

1. **Tool call repetition**: Do NOT call the same tool with the same arguments more than 3 times if the result hasn't changed. Change strategy instead — try different arguments, a different tool, or ask the user.

2. **Recursive depth**: Limit directory traversal and file searches to 5 levels deep. If you need deeper, explain why in your plan first.

3. **Heavy commands**: Run long-running commands (`npm install`, `find /`, builds) in background mode. Always set a timeout — never run a command that waits indefinitely.

## Execution Limits

1. **Step budget**: If a single task takes more than 20 tool calls without meaningful progress, STOP and re-plan. Present the user with what you've tried and ask for direction.

2. **Stuck detection**: If a CLI prompt hangs (no output change after 2 input attempts), treat it as stuck — kill the process and use non-interactive flags (`--yes`, `--force`, `--skip-prompts`).

3. **File size guard**: Before reading a file, check its size. Do NOT load files >100KB into context without user confirmation. Summarize large files instead of reading them whole.

## Recovery Protocol

When you detect you're stuck:

1. **Stop** the current action immediately
2. **Diagnose** by checking the last 3 tool outputs for error patterns
3. **Clean up** any temp files or zombie processes
4. **Report** to the user: what happened, why, and 2 options to proceed
