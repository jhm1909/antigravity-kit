#!/usr/bin/env node

/**
 * @jhm1909/ag-kit — AI Agent Kit CLI
 * 
 * Commands:
 *   init [--profile <name>] [--force]  Install the agent kit
 *   list                               Show available profiles
 *   status                             Check installed kit version
 *   verify                             Run kit integrity checks
 */

const fs = require('fs');
const path = require('path');

// ─── Constants ───────────────────────────────────────────────────────
const VERSION = '0.2.1';
const KIT_NAME = '@jhm1909/ag-kit';
const AGENT_DIR = '.agent';

// Package root (where this CLI lives)
const PACKAGE_ROOT = path.join(__dirname, '..');
const SOURCE_AGENT_DIR = path.join(PACKAGE_ROOT, AGENT_DIR);

// Colors for terminal output
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  white: '\x1b[37m',
  bgBlue: '\x1b[44m',
};

// ─── Utilities ───────────────────────────────────────────────────────

function log(msg = '') { console.log(msg); }
function info(msg) { console.log(`${c.cyan}ℹ${c.reset} ${msg}`); }
function success(msg) { console.log(`${c.green}✓${c.reset} ${msg}`); }
function warn(msg) { console.log(`${c.yellow}⚠${c.reset} ${msg}`); }
function error(msg) { console.error(`${c.red}✗${c.reset} ${msg}`); }

function banner() {
  log();
  log(`${c.bold}${c.magenta}  ⚡ Antigravity Kit${c.reset} ${c.dim}v${VERSION}${c.reset}`);
  log(`${c.dim}  AI Agent Skills, Workflows & Knowledge Graph${c.reset}`);
  log();
}

/**
 * Recursively copy directory, optionally filtering by allowed dirs
 */
function copyDir(src, dest, allowedDirs = null, depth = 0) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  let fileCount = 0;

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip tmp/ and templates/ directories always
    if (entry.name === 'tmp' || entry.name === 'templates') continue;

    // At skills level (depth 1, parent is "skills"), filter by allowed dirs
    if (depth === 1 && allowedDirs && entry.isDirectory()) {
      if (!allowedDirs.includes(entry.name)) continue;
    }

    if (entry.isDirectory()) {
      const isSkillsDir = entry.name === 'skills';
      fileCount += copyDir(srcPath, destPath, allowedDirs, isSkillsDir ? 1 : depth);
    } else {
      fs.copyFileSync(srcPath, destPath);
      fileCount++;
    }
  }

  return fileCount;
}

/**
 * Load skills-manifest.json from package
 */
function loadManifest() {
  const manifestPath = path.join(SOURCE_AGENT_DIR, 'skills-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    error('skills-manifest.json not found in package');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
}

/**
 * Get all skill names needed for a profile (including sub-skills)
 */
function getProfileSkills(manifest, profileName) {
  const profile = manifest.profiles[profileName];
  if (!profile) return null;

  const skillNames = [...profile.skills];
  if (profile.optional) {
    skillNames.push(...profile.optional);
  }

  // Add core skills always
  if (manifest.core) {
    for (const core of manifest.core) {
      if (!skillNames.includes(core)) {
        skillNames.push(core);
      }
    }
  }

  // Resolve sub-skills: for each skill, include its directory (which contains sub-skills)
  // No extra resolution needed since we copy entire skill directories
  return skillNames;
}

// ─── Commands ────────────────────────────────────────────────────────

function cmdInit(args) {
  const targetDir = process.cwd();
  const targetAgentDir = path.join(targetDir, AGENT_DIR);
  const profile = args.profile;
  const force = args.force;

  // Check if .agent/ already exists
  if (fs.existsSync(targetAgentDir) && !force) {
    error(`${AGENT_DIR}/ already exists in this directory.`);
    log(`  Use ${c.bold}ag-kit init --force${c.reset} to overwrite.`);
    process.exit(1);
  }

  // Check source exists
  if (!fs.existsSync(SOURCE_AGENT_DIR)) {
    error('Agent kit source not found. Package may be corrupted.');
    process.exit(1);
  }

  // Profile-based install
  let allowedSkills = null;
  if (profile) {
    const manifest = loadManifest();
    allowedSkills = getProfileSkills(manifest, profile);
    if (!allowedSkills) {
      error(`Profile "${profile}" not found.`);
      log(`  Run ${c.bold}ag-kit list${c.reset} to see available profiles.`);
      process.exit(1);
    }
    info(`Installing profile: ${c.bold}${profile}${c.reset}`);
    info(`Skills: ${allowedSkills.join(', ')}`);
  } else {
    info('Installing full agent kit...');
  }

  // Remove existing if force
  if (force && fs.existsSync(targetAgentDir)) {
    fs.rmSync(targetAgentDir, { recursive: true, force: true });
    warn('Removed existing .agent/ directory');
  }

  // Copy .agent/ directory
  const fileCount = copyDir(SOURCE_AGENT_DIR, targetAgentDir, allowedSkills);
  
  log();
  success(`${c.bold}Agent kit installed!${c.reset} (${fileCount} files)`);
  log();
  log(`${c.dim}  Installed to: ${targetAgentDir}${c.reset}`);
  log();
  log(`${c.bold}  What's included:${c.reset}`);
  log(`  ${c.cyan}|${c.reset} Skills      ${c.dim}Expert AI skill definitions${c.reset}`);
  log(`  ${c.cyan}|${c.reset} Workflows   ${c.dim}Chainable task automations${c.reset}`);
  log(`  ${c.cyan}|${c.reset} Rules       ${c.dim}Coding standards & guardrails${c.reset}`);
  log(`  ${c.cyan}|${c.reset} Manifest    ${c.dim}Skill routing & profiles${c.reset}`);
  // Copy AGENTS.md to project root for cross-platform discovery
  const agentsMdSrc = path.join(SOURCE_AGENT_DIR, 'templates', 'AGENTS.md');
  const agentsMdDest = path.join(targetDir, 'AGENTS.md');
  if (fs.existsSync(agentsMdSrc) && (!fs.existsSync(agentsMdDest) || force)) {
    fs.copyFileSync(agentsMdSrc, agentsMdDest);
    success('Created AGENTS.md (cross-platform agent config)');
  }

  log();
  log(`${c.dim}  Works with: Claude Code, Cursor, Gemini CLI, GitHub Copilot${c.reset}`);
  log();
}

function cmdList() {
  const manifest = loadManifest();
  const profiles = manifest.profiles;

  log(`${c.bold}Available Profiles${c.reset}`);
  log(`${c.dim}${'─'.repeat(64)}${c.reset}`);
  log();

  for (const [key, profile] of Object.entries(profiles)) {
    const skills = profile.skills.join(', ');
    const optional = profile.optional ? ` ${c.dim}+ optional: ${profile.optional.join(', ')}${c.reset}` : '';
    
    log(`  ${c.bold}${c.cyan}${key}${c.reset}`);
    log(`  ${profile.description}`);
    log(`  ${c.dim}Skills: ${skills}${optional}${c.reset}`);
    log();
  }

  log(`${c.dim}Usage: ag-kit init --profile <name>${c.reset}`);
  log();

  // Also show all skills
  log(`${c.bold}All Skills (${Object.keys(manifest.skills).length})${c.reset}`);
  log(`${c.dim}${'─'.repeat(64)}${c.reset}`);
  log();

  for (const [key, skill] of Object.entries(manifest.skills)) {
    const parent = skill.parent ? ` ${c.dim}(sub of ${skill.parent})${c.reset}` : '';
    log(`  ${c.green}●${c.reset} ${c.bold}${key}${c.reset}${parent} — ${skill.description}`);
  }
  log();
}

function cmdStatus() {
  const targetDir = process.cwd();
  const targetAgentDir = path.join(targetDir, AGENT_DIR);
  const manifestPath = path.join(targetAgentDir, 'skills-manifest.json');

  if (!fs.existsSync(targetAgentDir)) {
    warn('Agent kit is ${c.bold}not installed${c.reset} in this directory.');
    log(`  Run ${c.bold}ag-kit init${c.reset} to install.`);
    return;
  }

  // Count installed items
  const skillsDir = path.join(targetAgentDir, 'skills');
  const workflowsDir = path.join(targetAgentDir, 'workflows');
  const rulesDir = path.join(targetAgentDir, 'rules');

  const skillCount = fs.existsSync(skillsDir) 
    ? fs.readdirSync(skillsDir, { withFileTypes: true }).filter(d => d.isDirectory()).length 
    : 0;
  const workflowCount = fs.existsSync(workflowsDir) 
    ? fs.readdirSync(workflowsDir).filter(f => f.endsWith('.md')).length 
    : 0;
  const ruleCount = fs.existsSync(rulesDir) 
    ? fs.readdirSync(rulesDir).filter(f => f.endsWith('.md')).length 
    : 0;

  const hasManifest = fs.existsSync(manifestPath);

  log(`${c.bold}Agent Kit Status${c.reset}`);
  log(`${c.dim}${'─'.repeat(40)}${c.reset}`);
  log(`  ${c.cyan}Version:${c.reset}    ${VERSION}`);
  log(`  ${c.cyan}Location:${c.reset}   ${targetAgentDir}`);
  log(`  ${c.cyan}Skills:${c.reset}     ${skillCount}`);
  log(`  ${c.cyan}Workflows:${c.reset}  ${workflowCount}`);
  log(`  ${c.cyan}Rules:${c.reset}      ${ruleCount}`);
  log(`  ${c.cyan}Manifest:${c.reset}   ${hasManifest ? 'yes' : 'no'}`);
  log();
}

function cmdVerify() {
  // Delegate to verify.js
  const verifyPath = path.join(__dirname, 'verify.js');
  require(verifyPath);
}


function cmdHelp() {
  banner();
  log(`${c.bold}Usage:${c.reset} ag-kit <command> [options]`);
  log();
  log(`${c.bold}Commands:${c.reset}`);
  log(`  ${c.cyan}init${c.reset}                    Install the agent kit in current directory`);
  log(`  ${c.cyan}init --profile <name>${c.reset}   Install specific profile (e.g., web-frontend)`);
  log(`  ${c.cyan}init --force${c.reset}             Overwrite existing installation`);
  log(`  ${c.cyan}list${c.reset}                     Show available profiles and skills`);
  log(`  ${c.cyan}status${c.reset}                   Check installed kit version and stats`);
  log(`  ${c.cyan}verify${c.reset}                   Run kit integrity checks`);
  log(`  ${c.cyan}help${c.reset}                     Show this help message`);
  log();
  log(`${c.bold}Examples:${c.reset}`);
  log(`  ${c.dim}$ npx ${KIT_NAME} init${c.reset}`);
  log(`  ${c.dim}$ npx ${KIT_NAME} init --profile fullstack-saas${c.reset}`);
  log(`  ${c.dim}$ npx ${KIT_NAME} list${c.reset}`);
  log();
}

// ─── Argument Parser ─────────────────────────────────────────────────

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = { command: null, profile: null, force: false };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      result.command = 'help';
    } else if (arg === '--version' || arg === '-v') {
      console.log(VERSION);
      process.exit(0);
    } else if (arg === '--force' || arg === '-f') {
      result.force = true;
    } else if (arg === '--profile' || arg === '-p') {
      result.profile = args[++i];
    } else if (!arg.startsWith('-')) {
      result.command = arg;
    }
  }

  return result;
}

// ─── Main ────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv);

  banner();

  switch (args.command) {
    case 'init':
      cmdInit(args);
      break;
    case 'list':
      cmdList();
      break;
    case 'status':
      cmdStatus();
      break;
    case 'verify':
      cmdVerify();
      break;
    case 'help':
    case null:
      cmdHelp();
      break;
    default:
      error(`Unknown command: ${args.command}`);
      log(`  Run ${c.bold}ag-kit help${c.reset} for usage.`);
      process.exit(1);
  }
}

main();
