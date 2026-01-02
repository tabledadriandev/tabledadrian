# Fix Any Types Script

A script to automatically identify and fix common `any` type patterns in TypeScript files.

## Usage

### Analyze Only (No Changes)
```bash
npm run fix-any-types:analyze
# or
node scripts/fix-any-types.js --analyze-only
```

### Dry Run (Preview Changes)
```bash
npm run fix-any-types:dry
# or
node scripts/fix-any-types.js --dry-run
```

### Apply Fixes
```bash
npm run fix-any-types
# or
node scripts/fix-any-types.js
```

### Target Specific Directory
```bash
# Analyze API routes only
node scripts/fix-any-types.js --analyze-only api

# Fix all TypeScript files
node scripts/fix-any-types.js .
```

## Patterns Fixed

The script automatically fixes these common patterns:

1. **`catch (error: any)`** → `catch (error)` with proper error handling
   - Automatically adds `instanceof Error` checks
   - Updates error message handling

2. **`(prisma as any)`** → `prisma`
   - Removes unnecessary type assertions on Prisma client

3. **`: any[]`** → `: unknown[]`
   - Replaces array types with unknown arrays

4. **`Record<string, any>`** → `Record<string, unknown>`
   - Updates record types to use unknown

5. **Variable declarations with `: any`** → `: unknown`
   - Replaces variable type annotations

6. **Function parameters with `: any`** → `: unknown`
   - Updates function parameter types

7. **`as any` type assertions** → `as unknown`
   - Replaces type assertions (except for Prisma which is handled separately)

## Example Output

```
🔍 Scanning for "any" types...

Target directory: api
Mode: FIX MODE
Pattern fixing: ENABLED

Found 195 TypeScript files

📊 Results:

Total files with "any" types: 130
Total fixes available: 294
Total errors: 0

📈 Fixes by pattern:
  catch-error-any: 139
  prisma-as-any: 37
  as-any-assertion: 45
  param-any: 37
  variable-any: 23
  record-string-any: 2
  any-array: 11
```

## Important Notes

⚠️ **Always review changes before committing!**

- The script makes safe, common-sense replacements
- Some fixes may need manual adjustment
- Test your code after running the script
- Use `--dry-run` first to preview changes
- Commit your work before running the script

## Manual Review Needed

Some patterns require manual review:

- Complex type assertions that need specific types
- JSON/metadata fields that might need proper interfaces
- Generic functions that might need proper type parameters
- Cases where `unknown` is too restrictive

## Integration with CI/CD

You can add this to your CI pipeline:

```yaml
# .github/workflows/type-check.yml
- name: Check for any types
  run: |
    npm run fix-any-types:analyze
    # Fail if any types found (optional)
    if [ $? -ne 0 ]; then
      echo "Found 'any' types. Please fix them."
      exit 1
    fi
```


