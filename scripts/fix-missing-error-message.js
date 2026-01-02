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
    
    // Check if this line has "error: errorMessage" but no const errorMessage before it
    if (line.includes('error: errorMessage')) {
      // Look backwards in the catch block for const errorMessage
      let foundDeclaration = false;
      let catchLineIndex = -1;
      
      // Find the catch block start
      for (let j = i - 1; j >= Math.max(0, i - 20); j--) {
        if (lines[j].includes('} catch') || lines[j].includes('catch (')) {
          catchLineIndex = j;
          break;
        }
      }
      
      if (catchLineIndex >= 0) {
        // Check if errorMessage is declared between catch and current line
        for (let j = catchLineIndex; j < i; j++) {
          if (lines[j].includes('const errorMessage') || lines[j].includes('let errorMessage')) {
            foundDeclaration = true;
            break;
          }
        }
        
        if (!foundDeclaration) {
          // Find console.error line
          let consoleErrorIndex = -1;
          for (let j = catchLineIndex; j < i; j++) {
            if (lines[j].includes('console.error')) {
              consoleErrorIndex = j;
              break;
            }
          }
          
          if (consoleErrorIndex >= 0) {
            // Extract default message from console.error or use a generic one
            const consoleErrorLine = lines[consoleErrorIndex];
            let defaultMsg = 'Failed';
            
            // Try to extract a meaningful message
            const msgMatch = consoleErrorLine.match(/['"]([^'"]+)['"]/);
            if (msgMatch) {
              const errorText = msgMatch[1].toLowerCase();
              if (errorText.includes('sync')) defaultMsg = 'Failed to sync';
              else if (errorText.includes('fetch')) defaultMsg = 'Failed to fetch';
              else if (errorText.includes('create')) defaultMsg = 'Failed to create';
              else if (errorText.includes('update')) defaultMsg = 'Failed to update';
              else if (errorText.includes('delete')) defaultMsg = 'Failed to delete';
              else if (errorText.includes('get')) defaultMsg = 'Failed to get';
              else if (errorText.includes('verify')) defaultMsg = 'Failed to verify';
              else if (errorText.includes('mint')) defaultMsg = 'Failed to mint';
              else if (errorText.includes('generate')) defaultMsg = 'Failed to generate';
              else if (errorText.includes('apply')) defaultMsg = 'Failed to apply';
              else if (errorText.includes('allocate')) defaultMsg = 'Failed to allocate';
              else if (errorText.includes('submit')) defaultMsg = 'Failed to submit';
              else if (errorText.includes('register')) defaultMsg = 'Failed to register';
              else if (errorText.includes('attest')) defaultMsg = 'Failed to attest';
              else if (errorText.includes('reveal')) defaultMsg = 'Failed to reveal';
              else if (errorText.includes('stake')) defaultMsg = 'Failed to stake';
              else if (errorText.includes('join')) defaultMsg = 'Failed to join';
              else if (errorText.includes('subscribe')) defaultMsg = 'Subscription failed';
              else if (errorText.includes('oauth')) defaultMsg = 'Failed to initiate OAuth';
              else if (errorText.includes('webhook')) defaultMsg = 'Webhook processing failed';
              else if (errorText.includes('read')) defaultMsg = 'Failed to read';
              else defaultMsg = msgMatch[1].replace(/error|Error/g, '').trim() || 'Failed';
            }
            
            // Add the declaration after console.error
            const indent = lines[consoleErrorIndex].match(/^(\s*)/)?.[1] || '      ';
            newLines.push(...lines.slice(0, consoleErrorIndex + 1));
            newLines.push(indent + `const errorMessage = error instanceof Error ? error.message : '${defaultMsg}';`);
            newLines.push(...lines.slice(consoleErrorIndex + 1));
            changed = true;
            break;
          }
        }
      }
    }
    
    if (!changed) {
      newLines.push(line);
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
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
    if (fixFile(file)) {
      fixed++;
      console.log(`Fixed ${path.relative(process.cwd(), file)}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
}

console.log(`\n✅ Fixed ${fixed} files`);


