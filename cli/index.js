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
const VERSION = '0.3.2';
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
 * Get a simple hash of file content for comparison
 */
function fileHash(filePath) {
  const content = fs.readFileSync(filePath);
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash + content[i]) | 0;
  }
  return hash;
}

/**
 * Recursively diff source vs target, returning lists of new/changed/same files
 */
function diffDir(src, dest, prefix = '') {
  const result = { added: [], updated: [], unchanged: [], skipped: [] };
  if (!fs.existsSync(src)) return result;

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === 'tmp' || entry.name === 'templates') continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      const sub = diffDir(srcPath, destPath, relPath);
      result.added.push(...sub.added);
      result.updated.push(...sub.updated);
      result.unchanged.push(...sub.unchanged);
      result.skipped.push(...sub.skipped);
    } else {
      if (!fs.existsSync(destPath)) {
        result.added.push(relPath);
      } else {
        const srcHash = fileHash(srcPath);
        const destHash = fileHash(destPath);
        if (srcHash !== destHash) {
          result.updated.push(relPath);
        } else {
          result.unchanged.push(relPath);
        }
      }
    }
  }

  return result;
}

/**
 * Copy a single file, creating parent dirs as needed
 */
function copyFile(src, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

/**
 * Collect hashes of all files in a directory (for tracking)
 */
function collectHashes(dir, prefix = '') {
  const hashes = {};
  if (!fs.existsSync(dir)) return hashes;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'tmp' || entry.name === 'templates' || entry.name === '.kit-hashes.json') continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      Object.assign(hashes, collectHashes(fullPath, relPath));
    } else {
      hashes[relPath] = fileHash(fullPath);
    }
  }
  return hashes;
}

/**
 * Save hashes to .kit-hashes.json in the target .agent/ dir
 */
function saveHashes(targetAgentDir, hashes) {
  const hashFile = path.join(targetAgentDir, '.kit-hashes.json');
  fs.writeFileSync(hashFile, JSON.stringify({ version: VERSION, hashes }, null, 2));
}

/**
 * Load saved hashes from .kit-hashes.json
 */
function loadHashes(targetAgentDir) {
  const hashFile = path.join(targetAgentDir, '.kit-hashes.json');
  if (!fs.existsSync(hashFile)) return null;
  try {
    return JSON.parse(fs.readFileSync(hashFile, 'utf-8'));
  } catch (e) { return null; }
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

  // Save hashes for future updates
  const hashes = collectHashes(targetAgentDir);
  saveHashes(targetAgentDir, hashes);

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

function cmdUpdate(args) {
  const targetDir = process.cwd();
  const targetAgentDir = path.join(targetDir, AGENT_DIR);
  const force = args.force;

  // Check if kit is installed
  if (!fs.existsSync(targetAgentDir)) {
    error('Agent kit is not installed in this directory.');
    log(`  Run ${c.bold}ag-kit init${c.reset} to install first.`);
    process.exit(1);
  }

  // Check source
  if (!fs.existsSync(SOURCE_AGENT_DIR)) {
    error('Agent kit source not found. Package may be corrupted.');
    process.exit(1);
  }

  // Check installed version from manifest
  const installedManifest = path.join(targetAgentDir, 'skills-manifest.json');
  let installedVersion = 'unknown';
  if (fs.existsSync(installedManifest)) {
    try {
      const m = JSON.parse(fs.readFileSync(installedManifest, 'utf-8'));
      installedVersion = m.version || 'unknown';
    } catch (e) { /* ignore */ }
  }

  info(`Installed version: ${c.bold}${installedVersion}${c.reset}`);
  info(`Available version: ${c.bold}${VERSION}${c.reset}`);
  log();

  // Diff using 3-way comparison
  const savedData = loadHashes(targetAgentDir);
  const sourceHashes = collectHashes(SOURCE_AGENT_DIR);
  const installedHashes = collectHashes(targetAgentDir);
  const savedHashes = savedData ? savedData.hashes : {};

  const added = [];       // New files not in installed
  const safeUpdate = [];  // Changed upstream, user hasn't modified
  const conflict = [];    // Changed upstream AND user modified
  const unchanged = [];   // Same everywhere

  for (const [file, srcHash] of Object.entries(sourceHashes)) {
    const instHash = installedHashes[file];
    const origHash = savedHashes[file];

    if (instHash === undefined) {
      // File doesn't exist in installed → new file
      added.push(file);
    } else if (srcHash === instHash) {
      // Source and installed are the same → no change needed
      unchanged.push(file);
    } else if (origHash !== undefined && instHash === origHash) {
      // User hasn't modified (installed == original), but upstream changed → safe to update
      safeUpdate.push(file);
    } else {
      // User modified AND upstream changed → conflict
      conflict.push(file);
    }
  }

  if (added.length === 0 && safeUpdate.length === 0 && conflict.length === 0) {
    success('Already up to date! No changes needed.');
    log();
    return;
  }

  // Show what will change
  if (added.length > 0) {
    log(`${c.bold}${c.green}  New files (${added.length}):${c.reset}`);
    for (const f of added) log(`    ${c.green}+${c.reset} ${f}`);
    log();
  }

  if (safeUpdate.length > 0) {
    log(`${c.bold}${c.cyan}  Upstream updates (${safeUpdate.length}):${c.reset}`);
    for (const f of safeUpdate) log(`    ${c.cyan}↑${c.reset} ${f}`);
    log();
  }

  if (conflict.length > 0) {
    log(`${c.bold}${c.yellow}  Conflicts — you modified, upstream also changed (${conflict.length}):${c.reset}`);
    for (const f of conflict) log(`    ${c.yellow}⚠${c.reset} ${f}`);
    log();
  }

  // Apply updates
  let copied = 0;

  // Always copy new files and safe updates
  for (const f of [...added, ...safeUpdate]) {
    const srcPath = path.join(SOURCE_AGENT_DIR, f);
    const destPath = path.join(targetAgentDir, f);
    copyFile(srcPath, destPath);
    copied++;
  }

  // Handle conflicts
  if (conflict.length > 0) {
    if (force) {
      for (const f of conflict) {
        const srcPath = path.join(SOURCE_AGENT_DIR, f);
        const destPath = path.join(targetAgentDir, f);
        // Backup before overwrite
        const backupPath = destPath + '.backup';
        fs.copyFileSync(destPath, backupPath);
        copyFile(srcPath, destPath);
        copied++;
      }
      warn(`Overwrote ${conflict.length} conflicted files (backups saved as .backup)`);
    } else {
      warn(`Skipped ${conflict.length} conflicted files (use --force to overwrite with backups).`);
    }
  }

  if (copied > 0) {
    success(`Updated ${c.bold}${copied}${c.reset} files (${added.length} new, ${safeUpdate.length} upstream, ${force ? conflict.length + ' conflicts overwritten' : '0 conflicts'}).`);
  }

  // Save new hashes
  const newHashes = collectHashes(targetAgentDir);
  saveHashes(targetAgentDir, newHashes);

  log();
  log(`${c.dim}  ${unchanged.length} files unchanged${c.reset}`);
  log();
}

function cmdHelp() {
  banner();
  log(`${c.bold}Usage:${c.reset} ag-kit <command> [options]`);
  log();
  log(`${c.bold}Commands:${c.reset}`);
  log(`  ${c.cyan}init${c.reset}                    Install the agent kit in current directory`);
  log(`  ${c.cyan}init --profile <name>${c.reset}   Install specific profile (e.g., web-frontend)`);
  log(`  ${c.cyan}init --force${c.reset}             Overwrite existing installation`);
  log(`  ${c.cyan}update${c.reset}                   Smart update — add new files, preserve customizations`);
  log(`  ${c.cyan}update --force${c.reset}            Update all files including changed ones`);
  log(`  ${c.cyan}list${c.reset}                     Show available profiles and skills`);
  log(`  ${c.cyan}status${c.reset}                   Check installed kit version and stats`);
  log(`  ${c.cyan}verify${c.reset}                   Run kit integrity checks`);
  log(`  ${c.cyan}help${c.reset}                     Show this help message`);
  log();
  log(`${c.bold}Examples:${c.reset}`);
  log(`  ${c.dim}$ npx ${KIT_NAME} init${c.reset}`);
  log(`  ${c.dim}$ npx ${KIT_NAME} update${c.reset}`);
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
    case 'update':
      cmdUpdate(args);
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
