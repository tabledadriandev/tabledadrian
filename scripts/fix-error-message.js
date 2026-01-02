const fs = require('fs');
const path = require('path');

function findFiles(dir, pattern) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...findFiles(fullPath, pattern));
    } else if (entry.isFile() && pattern.test(entry.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const newLines = [];
  let changed = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
    
    // Look for pattern: } catch (error) { ... return NextResponse.json({ error: errorMessage })
    // where errorMessage is not defined
    if (line.includes('} catch (error) {') || line.includes('catch (error) {')) {
      // Check if errorMessage is used but not defined in the next few lines
      let foundErrorMessage = false;
      let foundDefinition = false;
      
      for (let j = i; j < Math.min(i + 10, lines.length); j++) {
        if (lines[j].includes('error: errorMessage') && !foundDefinition) {
          foundErrorMessage = true;
          // Check if errorMessage was defined before this
          for (let k = i; k < j; k++) {
            if (lines[k].includes('const errorMessage') || lines[k].includes('let errorMessage')) {
              foundDefinition = true;
              break;
            }
          }
          if (!foundDefinition) {
            // Need to add the definition
            const errorLine = lines[j];
            const indent = errorLine.match(/^(\s*)/)?.[1] || '';
            const defaultMsg = errorLine.match(/['"]([^'"]+)['"]/)?.[1] || 'Failed';
            
            // Find the console.error line
            let consoleErrorLine = -1;
            for (let k = i; k < j; k++) {
              if (lines[k].includes('console.error')) {
                consoleErrorLine = k;
                break;
              }
            }
            
            if (consoleErrorLine >= 0) {
              // Insert errorMessage definition after console.error
              newLines.push(...lines.slice(i, consoleErrorLine + 1));
              newLines.push(indent + `const errorMessage = error instanceof Error ? error.message : '${defaultMsg}';`);
              newLines.push(...lines.slice(consoleErrorLine + 1, j));
              newLines.push(...lines.slice(j));
              changed = true;
              i = lines.length; // Skip rest
              break;
            }
          }
        }
      }
    }
    
    if (!changed || i < newLines.length) {
      newLines.push(line);
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
    return true;
  }
  
  // Simpler fix: if we see { error: errorMessage } without definition before it
  const simpleFix = content.replace(
    /(\s+)(console\.error\([^)]+\);\s*\n)(\s+)(return\s+NextResponse\.json\(\s*\n\s+\{\s*error:\s*)errorMessage(\s*\})/g,
    (match, indent1, consoleError, indent2, beforeError, afterError) => {
      // Extract default message from context if possible
      const defaultMsg = 'Failed';
      return `${indent1}${consoleError.trim()}\n${indent2}const errorMessage = error instanceof Error ? error.message : '${defaultMsg}';\n${indent2}${beforeError.trim()}errorMessage${afterError}`;
    }
  );
  
  if (simpleFix !== content) {
    fs.writeFileSync(filePath, simpleFix, 'utf-8');
    return true;
  }
  
  return false;
}

// Main
const apiDir = path.join(__dirname, '..', 'api');
const files = findFiles(apiDir, /\.ts$/);

let fixed = 0;
for (const file of files) {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    // Simple pattern: if file has "error: errorMessage" but no "const errorMessage" before it in catch block
    if (content.includes('error: errorMessage')) {
      const lines = content.split('\n');
      let needsFix = false;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('error: errorMessage')) {
          // Check backwards for const errorMessage
          let found = false;
          for (let j = i - 1; j >= Math.max(0, i - 15); j--) {
            if (lines[j].includes('const errorMessage') || lines[j].includes('let errorMessage')) {
              found = true;
              break;
            }
            if (lines[j].includes('} catch') || lines[j].includes('catch (')) {
              break; // Went past catch block
            }
          }
          if (!found && lines[i - 1] && lines[i - 1].includes('console.error')) {
            needsFix = true;
            // Insert after console.error
            const indent = lines[i - 1].match(/^(\s*)/)?.[1] || '      ';
            const defaultMsg = lines[i].match(/['"]([^'"]+)['"]/)?.[1] || 'Failed';
            lines.splice(i, 0, indent + `const errorMessage = error instanceof Error ? error.message : '${defaultMsg}';`);
            break;
          }
        }
      }
      
      if (needsFix) {
        fs.writeFileSync(file, lines.join('\n'), 'utf-8');
        fixed++;
        console.log(`Fixed ${path.relative(process.cwd(), file)}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
}

console.log(`\nFixed ${fixed} files`);

