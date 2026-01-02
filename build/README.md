# Build Assets

Place your app icons here:

## Required Files

### Windows
- `icon.ico` - Windows icon (256x256 minimum, ICO format)
  - Can be created from PNG using: https://icoconvert.com/

### macOS (optional)
- `icon.icns` - macOS icon bundle
  - Can be created using: `iconutil -c icns icon.iconset`

### Linux (optional)
- `icon.png` - Linux icon (512x512 PNG)

## Creating Icons

1. **Start with a high-resolution image:**
   - Minimum: 512x512 pixels
   - Recommended: 1024x1024 pixels
   - Format: PNG with transparency

2. **Convert to ICO (Windows):**
   - Use online tool: https://icoconvert.com/
   - Or ImageMagick: `convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico`

3. **Place in this folder:**
   - Save as `icon.ico` in the `build/` directory

## Current Setup

The app will use `/public/icon.ico` as fallback if build icons are not found.

