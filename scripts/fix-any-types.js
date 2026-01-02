#!/usr/bin/env node

/**
 * Script to identify and fix common 'any' type patterns in TypeScript files
 * 
 * Common patterns fixed:
 * 1. catch (error: any) -> catch (error) with proper error handling
 * 2. (prisma as any) -> proper Prisma types
 * 3. any[] -> proper typed arrays
 * 4. Record<string, any> -> proper typed records
 * 5. Function parameters with any -> proper types
 * 6. Variables with any type -> proper types
 */

const fs = require('fs');
const path = require('path');

// Simple glob implementation using Node.js built-ins
function findFiles(dir, pattern, ignore = []) {
  const files = [];
  
  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relativePath = path.relative(process.cwd(), fullPath);
      
      // Check ignore patterns
      if (ignore.some(ignorePattern => relativePath.includes(ignorePattern))) {
        continue;
      }
      
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && pattern.test(entry.name)) {
        files.push(relativePath);
      }
    }
  }
  
  walk(dir);
  return files;
}

const patterns = [
  // Pattern 1: catch (error: any)
  {
    name: 'catch-error-any',
    regex: /catch\s*\(\s*(\w+)\s*:\s*any\s*\)/g,
    fix: (match, line) => {
      const varName = match[1];
      return line.replace(match[0], `catch (${varName})`);
    },
    description: 'Replace catch (error: any) with catch (error)',
  },
  
  // Pattern 2: (prisma as any)
  {
    name: 'prisma-as-any',
    regex: /\(prisma\s+as\s+any\)/g,
    fix: (match, line) => {
      return line.replace(match[0], 'prisma');
    },
    description: 'Replace (prisma as any) with prisma',
  },
  
  // Pattern 3: error: any in catch blocks (alternative format)
  {
    name: 'catch-error-any-alt',
    regex: /}\s+catch\s*\(\s*(\w+)\s*:\s*any\s*\)/g,
    fix: (match, line) => {
      const varName = match[1];
      return line.replace(match[0], `} catch (${varName})`);
    },
    description: 'Replace catch (error: any) with catch (error)',
  },
  
  // Pattern 4: : any[] arrays
  {
    name: 'any-array',
    regex: /:\s*any\[\]/g,
    fix: (match, line) => {
      // Try to infer type from context - if it's a Prisma result, use unknown[]
      if (line.includes('prisma.') || line.includes('findMany') || line.includes('findFirst')) {
        return line.replace(match[0], ': unknown[]');
      }
      return line.replace(match[0], ': unknown[]');
    },
    description: 'Replace : any[] with : unknown[]',
  },
  
  // Pattern 5: Record<string, any>
  {
    name: 'record-string-any',
    regex: /Record<string,\s*any>/g,
    fix: (match, line) => {
      return line.replace(match[0], 'Record<string, unknown>');
    },
    description: 'Replace Record<string, any> with Record<string, unknown>',
  },
  
  // Pattern 6: Variable declarations with : any
  {
    name: 'variable-any',
    regex: /(const|let|var)\s+(\w+)\s*:\s*any(\s*[=;])/g,
    fix: (match, line) => {
      const varType = match[1];
      const varName = match[2];
      const suffix = match[3];
      // Don't fix if it's in a catch block (already handled)
      if (line.includes('catch')) {
        return null;
      }
      return line.replace(match[0], `${varType} ${varName}: unknown${suffix}`);
    },
    description: 'Replace variable: any with variable: unknown',
  },
  
  // Pattern 7: Function parameters with : any
  {
    name: 'param-any',
    regex: /\((\w+)\s*:\s*any\)/g,
    fix: (match, line) => {
      const paramName = match[1];
      // Don't fix if it's in a catch block (already handled)
      if (line.includes('catch')) {
        return null;
      }
      return line.replace(match[0], `(${paramName}: unknown)`);
    },
    description: 'Replace function parameter: any with parameter: unknown',
  },
  
  // Pattern 8: as any type assertions
  {
    name: 'as-any-assertion',
    regex: /\s+as\s+any\b/g,
    fix: (match, line) => {
      // Don't fix (prisma as any) - already handled
      if (line.includes('prisma') && line.includes('as any')) {
        return null;
      }
      // Check if it's a metadata or JSON field - these might need special handling
      if (line.includes('metadata') || line.includes('Json')) {
        return line.replace(match[0], ' as unknown');
      }
      return line.replace(match[0], ' as unknown');
    },
    description: 'Replace as any with as unknown',
  },
];

function findAnyTypes(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const fixes = [];
  const errors = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let modifiedLine = line;
    
    for (const pattern of patterns) {
      const matches = Array.from(line.matchAll(pattern.regex));
      
      for (const match of matches) {
        try {
          const fixed = pattern.fix(match, modifiedLine, i + 1);
          
          if (fixed && fixed !== modifiedLine) {
            fixes.push({
              line: i + 1,
              original: line.trim(),
              fixed: fixed.trim(),
              pattern: pattern.name,
            });
            modifiedLine = fixed;
          }
        } catch (error) {
          errors.push(`Error fixing line ${i + 1} in ${filePath}: ${error.message}`);
        }
      }
    }
  }
  
  return {
    file: filePath,
    fixes,
    errors,
  };
}

function applyFixes(filePath, result) {
  if (result.fixes.length === 0) return false;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  // Apply fixes in reverse order to maintain line numbers
  const fixesByLine = new Map();
  for (const fix of result.fixes) {
    fixesByLine.set(fix.line - 1, fix.fixed);
  }
  
  const newLines = lines.map((line, index) => {
    const fixed = fixesByLine.get(index);
    if (fixed) {
      // Preserve indentation
      const indent = line.match(/^(\s*)/)?.[1] || '';
      const fixedContent = fixed.trim();
      return indent + fixedContent;
    }
    return line;
  });
  
  let updatedContent = newLines.join('\n');
  
  // Fix error.message patterns in catch blocks
  // Look for: catch (error) { ... return NextResponse.json({ error: error.message || '...' })
  updatedContent = updatedContent.replace(
    /catch\s*\(\s*(\w+)\s*\)\s*\{([\s\S]*?)return\s+NextResponse\.json\([\s\S]*?error:\s*\1\.message\s*\|\|\s*['"]([^'"]+)['"]/g,
    (match, varName, blockContent, defaultMsg) => {
      // Check if already has instanceof check
      if (blockContent.includes('instanceof Error')) {
        return match;
      }
      
      // Replace error.message || '...' with proper error handling
      return match.replace(
        new RegExp(`error:\\s*${varName}\\.message\\s*\\|\\|\\s*['"]${defaultMsg}['"]`),
        `const errorMessage = ${varName} instanceof Error ? ${varName}.message : '${defaultMsg}';\n      error: errorMessage`
      );
    }
  );
  
  // More specific pattern for common error handling
  updatedContent = updatedContent.replace(
    /(\s+)console\.error\([^)]+\);\s*\n(\s+)return\s+NextResponse\.json\(\s*\n(\s+)\{\s*error:\s*(\w+)\.message\s*\|\|\s*['"]([^'"]+)['"]\s*\}/g,
    (match, indent1, indent2, indent3, varName, defaultMsg) => {
      return `${indent1}console.error('Error:', ${varName});\n${indent2}const errorMessage = ${varName} instanceof Error ? ${varName}.message : '${defaultMsg}';\n${indent2}return NextResponse.json(\n${indent3}{ error: errorMessage }`;
    }
  );
  
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  return true;
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const analyzeOnly = args.includes('--analyze-only');
  const targetDir = args.find(arg => !arg.startsWith('-')) || 'api';
  const fixPatterns = !analyzeOnly;
  
  console.log('🔍 Scanning for "any" types...\n');
  console.log(`Target directory: ${targetDir}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN (no changes will be made)' : 'FIX MODE'}`);
  console.log(`Pattern fixing: ${fixPatterns ? 'ENABLED' : 'DISABLED'}\n`);
  
  // Find all TypeScript files
  const targetPath = path.join(process.cwd(), targetDir);
  if (!fs.existsSync(targetPath)) {
    console.error(`Error: Directory ${targetPath} does not exist`);
    process.exit(1);
  }
  
  const files = findFiles(targetPath, /\.ts$/, [
    'node_modules',
    '.next',
    'dist',
    '.test.ts',
    '.spec.ts',
  ]);
  
  console.log(`Found ${files.length} TypeScript files\n`);
  
  const results = [];
  let totalFixes = 0;
  let totalErrors = 0;
  
  for (const file of files) {
    const filePath = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
    
    try {
      const result = findAnyTypes(filePath);
      
      if (result.fixes.length > 0 || result.errors.length > 0) {
        results.push(result);
        totalFixes += result.fixes.length;
        totalErrors += result.errors.length;
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  // Print results
  console.log('📊 Results:\n');
  console.log(`Total files with "any" types: ${results.length}`);
  console.log(`Total fixes available: ${totalFixes}`);
  console.log(`Total errors: ${totalErrors}\n`);
  
  if (results.length === 0) {
    console.log('✅ No "any" types found!');
    return;
  }
  
  // Group fixes by pattern
  const fixesByPattern = {};
  for (const result of results) {
    for (const fix of result.fixes) {
      fixesByPattern[fix.pattern] = (fixesByPattern[fix.pattern] || 0) + 1;
    }
  }
  
  console.log('📈 Fixes by pattern:');
  for (const [pattern, count] of Object.entries(fixesByPattern)) {
    const patternInfo = patterns.find(p => p.name === pattern);
    console.log(`  ${pattern}: ${count} (${patternInfo?.description || 'unknown'})`);
  }
  console.log('');
  
  // Show detailed results for first 10 files
  console.log('📝 Sample fixes (first 10 files):\n');
  for (const result of results.slice(0, 10)) {
    const relativePath = path.relative(process.cwd(), result.file);
    console.log(`\n${relativePath}:`);
    for (const fix of result.fixes.slice(0, 3)) {
      console.log(`  Line ${fix.line}:`);
      console.log(`    ❌ ${fix.original}`);
      console.log(`    ✅ ${fix.fixed}`);
    }
    if (result.fixes.length > 3) {
      console.log(`  ... and ${result.fixes.length - 3} more fixes`);
    }
  }
  
  if (results.length > 10) {
    console.log(`\n... and ${results.length - 10} more files with fixes`);
  }
  
  // Apply fixes if not dry run
  if (!dryRun && fixPatterns && totalFixes > 0) {
    console.log('\n🔧 Applying fixes...\n');
    
    let filesFixed = 0;
    for (const result of results) {
      if (result.fixes.length === 0) continue;
      
      const filePath = result.file;
      if (applyFixes(filePath, result)) {
        filesFixed++;
        const relativePath = path.relative(process.cwd(), filePath);
        console.log(`✅ Fixed ${result.fixes.length} issues in ${relativePath}`);
      }
    }
    
    console.log(`\n✅ Applied ${totalFixes} fixes across ${filesFixed} files`);
    console.log('\n⚠️  Please review the changes and test your code!');
    console.log('   Some fixes may need manual adjustment.');
  } else if (dryRun) {
    console.log('\n💡 Run without --dry-run to apply fixes');
  }
}

// Run the script
try {
  main();
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}

