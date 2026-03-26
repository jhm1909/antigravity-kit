/**
 * Migrate SKILL.md frontmatter from custom format → agentskills.io spec
 * 
 * Before: name, type, domain, status, version, estimated_tokens, description
 * After:  name, description, license, compatibility, metadata { author, version, domain, estimated_tokens }
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', '.agent', 'skills');

const COMPATIBILITY = 'Claude Code, Cursor, Gemini CLI, GitHub Copilot';
const LICENSE = 'MIT';
const AUTHOR = 'jhm1909';

function findSkillFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...findSkillFiles(fullPath));
    } else if (item.name === 'SKILL.md') {
      results.push(fullPath);
    }
  }
  return results;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  
  const yaml = match[1];
  const body = content.slice(match[0].length);
  const fields = {};
  
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^(\w[\w_-]*)\s*:\s*(.+)$/);
    if (m) {
      let value = m[2].trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      fields[m[1]] = value;
    }
  }
  
  return { fields, body, rawYaml: yaml };
}

function buildNewFrontmatter(fields) {
  const name = fields.name || 'unknown';
  const description = fields.description || `${name} skill for AI-powered development.`;
  const version = fields.version || '2.0.0';
  const domain = fields.domain || 'general';
  const estimatedTokens = fields.estimated_tokens || fields['estimated_tokens'] || '5000';
  
  let fm = '---\n';
  fm += `name: ${name}\n`;
  fm += `description: >\n`;
  fm += `  ${description}\n`;
  fm += `license: ${LICENSE}\n`;
  fm += `compatibility: ${COMPATIBILITY}\n`;
  fm += `metadata:\n`;
  fm += `  author: ${AUTHOR}\n`;
  fm += `  version: "${version}"\n`;
  fm += `  domain: ${domain}\n`;
  fm += `  estimated_tokens: ${estimatedTokens}\n`;
  fm += '---';
  
  return fm;
}

// Main
const skillFiles = findSkillFiles(SKILLS_DIR);
console.log(`Found ${skillFiles.length} SKILL.md files\n`);

let migrated = 0;
let skipped = 0;

for (const filePath of skillFiles) {
  const relativePath = path.relative(SKILLS_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const parsed = parseFrontmatter(content);
  if (!parsed) {
    console.log(`⚠️  SKIP (no frontmatter): ${relativePath}`);
    skipped++;
    continue;
  }
  
  // Check if already migrated (has 'compatibility' field)
  if (parsed.fields.compatibility) {
    console.log(`⏭️  SKIP (already migrated): ${relativePath}`);
    skipped++;
    continue;
  }
  
  const newFrontmatter = buildNewFrontmatter(parsed.fields);
  const newContent = newFrontmatter + parsed.body;
  
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✅ MIGRATED: ${relativePath}`);
  console.log(`   name: ${parsed.fields.name}, domain: ${parsed.fields.domain}, version: ${parsed.fields.version}`);
  migrated++;
}

console.log(`\n📊 Results: ${migrated} migrated, ${skipped} skipped, ${skillFiles.length} total`);
