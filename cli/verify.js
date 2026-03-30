#!/usr/bin/env node

/**
 * ag-kit verify — Kit Integrity Checker
 * 
 * Validates the .agent/ directory structure and reports issues.
 * Adapted from @vudovn/ag-kit verify_all.py (328 lines) → zero-dependency Node.js
 * 
 * Usage:
 *   node cli/verify.js [path]
 *   npx ag-kit verify
 */

const fs = require('fs');
const path = require('path');

// Colors
const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m',
};

const pass = (msg) => console.log(`  ${c.green}✅${c.reset} ${msg}`);
const warn = (msg) => console.log(`  ${c.yellow}⚠️${c.reset}  ${msg}`);
const fail = (msg) => console.log(`  ${c.red}❌${c.reset} ${msg}`);
const header = (msg) => console.log(`\n${c.bold}${c.cyan}─── ${msg} ───${c.reset}`);

// ─── Checks ──────────────────────────────────────────────────────

function checkSkills(agentDir) {
  header('Skills');
  const skillsDir = path.join(agentDir, 'skills');
  let passed = 0, failed = 0;

  if (!fs.existsSync(skillsDir)) {
    fail('skills/ directory not found');
    return { passed: 0, failed: 1, warned: 0 };
  }

  const skills = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(d => d.isDirectory());

  let warned = 0;
  for (const skill of skills) {
    const skillMd = path.join(skillsDir, skill.name, 'SKILL.md');
    if (fs.existsSync(skillMd)) {
      // Check frontmatter
      const content = fs.readFileSync(skillMd, 'utf-8');
      const hasFrontmatter = content.startsWith('---');
      const hasName = /^name:/m.test(content);
      const hasDesc = /^description:/m.test(content);

      if (hasFrontmatter && hasName && hasDesc) {
        // Token economy check: warn if SKILL.md is too verbose
        const lineCount = content.split('\n').length;
        if (lineCount > 300) {
          warn(`${skill.name}/SKILL.md — valid but verbose (${lineCount} lines). Consider splitting into references/`);
          warned++;
        } else {
          pass(`${skill.name}/SKILL.md — valid`);
        }
        passed++;
      } else {
        warn(`${skill.name}/SKILL.md — missing frontmatter fields (name/description)`);
        warned++;
      }
    } else {
      fail(`${skill.name}/ — missing SKILL.md`);
      failed++;
    }
  }

  console.log(`  ${c.dim}${skills.length} skill directories found${c.reset}`);
  return { passed, failed, warned };
}

function checkWorkflows(agentDir) {
  header('Workflows');
  const workflowsDir = path.join(agentDir, 'workflows');
  let passed = 0, failed = 0, warned = 0;

  if (!fs.existsSync(workflowsDir)) {
    fail('workflows/ directory not found');
    return { passed: 0, failed: 1, warned: 0 };
  }

  const workflows = fs.readdirSync(workflowsDir)
    .filter(f => f.endsWith('.md'));

  for (const wf of workflows) {
    const content = fs.readFileSync(path.join(workflowsDir, wf), 'utf-8');
    const hasFrontmatter = content.startsWith('---');
    const hasDescription = /^description:/m.test(content);
    const hasSteps = /^## Step/m.test(content) || /^## \d+/m.test(content) || content.includes('Step ');

    if (hasFrontmatter && hasDescription) {
      pass(`${wf} — valid frontmatter`);
      passed++;
    } else if (hasSteps) {
      // Some workflows use headers instead of frontmatter
      pass(`${wf} — valid (step-based)`);
      passed++;
    } else {
      warn(`${wf} — no frontmatter or step structure`);
      warned++;
    }
  }

  console.log(`  ${c.dim}${workflows.length} workflow files found${c.reset}`);
  return { passed, failed, warned };
}

function checkRules(agentDir) {
  header('Rules');
  const rulesDir = path.join(agentDir, 'rules');
  let passed = 0, failed = 0;

  if (!fs.existsSync(rulesDir)) {
    fail('rules/ directory not found');
    return { passed: 0, failed: 1, warned: 0 };
  }

  const rules = fs.readdirSync(rulesDir).filter(f => f.endsWith('.md'));

  for (const rule of rules) {
    const content = fs.readFileSync(path.join(rulesDir, rule), 'utf-8');
    if (content.trim().length > 50) {
      pass(`${rule} — valid (${content.length} chars)`);
      passed++;
    } else {
      fail(`${rule} — too short or empty`);
      failed++;
    }
  }

  console.log(`  ${c.dim}${rules.length} rule files found${c.reset}`);
  return { passed, failed, warned: 0 };
}

function checkGraph(agentDir) {
  header('Knowledge Graph');
  let passed = 0, failed = 0, warned = 0;

  const graphPath = path.join(agentDir, 'graph-index.json');
  if (!fs.existsSync(graphPath)) {
    fail('graph-index.json not found');
    return { passed: 0, failed: 1, warned: 0 };
  }

  try {
    const graph = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));

    // Check version
    if (graph.version) {
      pass(`Version: ${graph.version}`);
      passed++;
    } else {
      warn('Missing version field');
      warned++;
    }

    // Check nodes
    if (graph.nodes) {
      const nodeCount = Object.keys(graph.nodes).length;
      const skills = Object.entries(graph.nodes).filter(([, v]) => v.type === 'skill').length;
      const workflows = Object.entries(graph.nodes).filter(([, v]) => v.type === 'workflow').length;
      const rules = Object.entries(graph.nodes).filter(([, v]) => v.type === 'rule').length;

      pass(`Nodes: ${nodeCount} total (${skills} skills, ${workflows} workflows, ${rules} rules)`);
      passed++;

      // Verify paths exist
      let missingPaths = 0;
      for (const [name, node] of Object.entries(graph.nodes)) {
        if (node.path) {
          const fullPath = path.join(path.dirname(agentDir), node.path);
          if (!fs.existsSync(fullPath)) {
            warn(`Node "${name}" → path not found: ${node.path}`);
            missingPaths++;
            warned++;
          }
        }
      }
      if (missingPaths === 0) {
        pass('All node paths verified');
        passed++;
      }
    } else {
      fail('Missing nodes section');
      failed++;
    }

    // Check MOCs
    if (graph.mocs) {
      pass(`MOCs: ${Object.keys(graph.mocs).length}`);
      passed++;
    }

    // Check workflow chains
    if (graph.workflow_chains) {
      pass(`Workflow chains: ${Object.keys(graph.workflow_chains).length}`);
      passed++;
    }
  } catch (e) {
    fail(`Invalid JSON: ${e.message}`);
    failed++;
  }

  return { passed, failed, warned };
}

function checkManifest(agentDir) {
  header('Skills Manifest');
  let passed = 0, failed = 0, warned = 0;

  const manifestPath = path.join(agentDir, 'skills-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    fail('skills-manifest.json not found');
    return { passed: 0, failed: 1, warned: 0 };
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    if (manifest.skills) {
      pass(`Skills: ${Object.keys(manifest.skills).length}`);
      passed++;
    }
    if (manifest.workflows) {
      pass(`Workflows: ${Object.keys(manifest.workflows).length}`);
      passed++;
    }
    if (manifest.profiles) {
      pass(`Profiles: ${Object.keys(manifest.profiles).length}`);
      passed++;

      // Verify profile skills exist in manifest
      for (const [name, profile] of Object.entries(manifest.profiles)) {
        for (const skill of profile.skills) {
          if (!manifest.skills[skill]) {
            warn(`Profile "${name}" references unknown skill: ${skill}`);
            warned++;
          }
        }
      }
    }
  } catch (e) {
    fail(`Invalid JSON: ${e.message}`);
    failed++;
  }

  return { passed, failed, warned };
}

// ─── Main ──────────────────────────────────────────────────────────

function main() {
  const targetDir = process.argv[2] || process.cwd();
  const agentDir = path.join(targetDir, '.agent');

  console.log(`\n${c.bold}⚡ Antigravity Kit — Integrity Check${c.reset}`);
  console.log(`${c.dim}   Path: ${agentDir}${c.reset}`);

  if (!fs.existsSync(agentDir)) {
    fail('.agent/ directory not found');
    console.log(`\n  Run ${c.bold}npx @jhm1909/ag-kit init${c.reset} to install.\n`);
    process.exit(1);
  }

  const results = [];
  results.push(checkSkills(agentDir));
  results.push(checkWorkflows(agentDir));
  results.push(checkRules(agentDir));
  results.push(checkGraph(agentDir));
  results.push(checkManifest(agentDir));

  // Summary
  const totals = results.reduce((acc, r) => ({
    passed: acc.passed + r.passed,
    failed: acc.failed + r.failed,
    warned: acc.warned + r.warned,
  }), { passed: 0, failed: 0, warned: 0 });

  header('Summary');
  console.log(`  ${c.green}✅ Passed:${c.reset}  ${totals.passed}`);
  if (totals.warned > 0) console.log(`  ${c.yellow}⚠️  Warned:${c.reset}  ${totals.warned}`);
  if (totals.failed > 0) console.log(`  ${c.red}❌ Failed:${c.reset}  ${totals.failed}`);
  console.log();

  if (totals.failed === 0) {
    console.log(`  ${c.green}${c.bold}Kit is healthy! ✨${c.reset}\n`);
  } else {
    console.log(`  ${c.red}${c.bold}Kit has issues. Fix the failures above.${c.reset}\n`);
    process.exit(1);
  }
}

main();
