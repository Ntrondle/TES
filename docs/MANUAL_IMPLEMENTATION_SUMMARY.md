# Manual Infrastructure Implementation Summary

## What Was Built

A complete step-by-step manual system for PCB board flashing and setup guides, compatible with static export.

## Architecture

### Static Export Compatible
Since the project uses `output: 'export'` in next.config.js, API routes don't work. The solution uses:

1. **Pre-generated JSON files** - `scripts/generate-manuals.js` creates `_manuals.json` (and locale-specific variants) at build time
2. **Client-side fetching** - ManualClient fetches JSON files directly from the public directory
3. **Build script integration** - `npm run build` automatically runs the generation script

### Components Created

#### Page Components
- `app/[locale]/manual/page.jsx` - Manual list page
- `app/[locale]/manual/[pcb-name]/page.jsx` - Individual manual overview (starts at step 1)
- `app/[locale]/manual/[pcb-name]/[step]/page.jsx` - Individual step pages

#### UI Components
- `ManualClient.jsx` - Manual grid with fetching logic
- `ManualViewer.jsx` - Main manual display component
- `StepContent.jsx` - Markdown rendering with MDX
- `StepNavigation.jsx` - Previous/Next navigation
- `TerminalBlock.jsx` - Copy-to-clipboard terminal commands
- `3dModelAnnotation.jsx` - Interactive 3D models with annotations

#### Supporting Files
- `lib/manuals.js` - Manual data fetching functions
- `app/api/manuals/route.js` - API route (not used in static export, kept for reference)
- `scripts/generate-manuals.js` - Build-time JSON generation script
- `public/manuals/_manuals.json` - Generated manual data (and _manuals.fr.json, _manuals.de.json)

### Sample Manual Created
`public/manuals/microflip/` - Complete example with 4 steps:
1. Overview
2. Flashing (with terminal commands)
3. Configuration
4. Testing

## Features

### 1. 3D Model Annotations
- Interactive 3D models (.glb files)
- Point-and-click annotations showing component locations
- Adjustable camera positions
- Color-coded labels

### 2. Terminal Commands
- One-click copy to clipboard
- Terminal-style styling
- Syntax highlighting

### 3. Step-by-Step Navigation
- Linear progression through manual steps
- Previous/Next buttons
- Progress indicator (e.g., "2 of 4")
- Completion message at end

### 4. Localization
- English, French, and German support
- Locale-specific manuals data files
- Translated UI components
- Fallback to English if translation missing

## Directory Structure

```
public/manuals/
├── _manuals.json           # Generated English data
├── _manuals.fr.json        # Generated French data
├── _manuals.de.json        # Generated German data
└── microflip/              # Example manual
    ├── README.md            # Metadata (title, description, model file)
    ├── readmeFR.md          # French translation
    ├── readmeDE.md          # German translation
    ├── model.glb            # 3D model
    └── steps/
        ├── 01-overview.md
        ├── 02-flashing.md
        ├── 03-configuration.md
        └── 04-testing.md
```

## Creating New Manuals

### Step 1: Create Directory Structure
```bash
mkdir public/manuals/your-pcb-name/steps
```

### Step 2: Add Metadata (README.md)
```markdown
---
title: "PCB Name Manual"
description: "Description here"
date: 2025-12-24
modelFile: "your-pcb-name/model.glb"
---

# Manual Title

Description...
```

### Step 3: Create Steps
Each step in `steps/` directory (e.g., `01-overview.md`):

```markdown
---
title: "Step Title"
prevStep: "01-overview"
nextStep: "03-configuration"
---

## Step Content

Text content...

<terminal command="your-command" />

<3d-model model="/manuals/your-pcb-name/model.glb" ... />
```

### Step 4: Generate JSON
```bash
node scripts/generate-manuals.js
```

This creates the `_manuals.json` files with all manual data.

## Custom Markdown Components

### `<terminal command="...">`
Displays terminal-style code block with copy button:

```markdown
<terminal command="esptool.py --chip esp32 write_flash 0x1000 firmware.bin" />
```

### `<3d-model>`
Interactive 3D model viewer with annotations:

```markdown
<3d-model 
  model="/manuals/your-pcb-name/model.glb"
  annotations='[{"position": {"x": 0, "y": 5, "z": 2}, "label": "Button", "color": "#FF5733"}]'
  cameraPosition='{"x": 0, "y": 0, "z": 50}'
/>
```

## Development Workflow

### Adding/Modifying Manuals
1. Create or edit markdown files in `public/manuals/your-pcb-name/`
2. Run: `node scripts/generate-manuals.js`
3. Refresh browser

### Building for Production
```bash
npm run build
```
This automatically runs the generation script before building.

## Testing

Test in development:
```bash
npm run dev
```
Navigate to:
- `http://localhost:3000/en/manual` - Manual list
- `http://localhost:3000/en/manual/microflip` - Microflip manual
- `http://localhost:3000/en/manual/microflip/02-flashing` - Flashing step

## Localization Setup

### Manual Metadata Translations
Create `readmeFR.md` and `readmeDE.md` in the manual directory with same frontmatter structure as `README.md`.

### Step Content Translations
Create localized step files:
- `02-flashing.fr.md` (French version)
- `02-flashing.de.md` (German version)

The system will automatically serve the correct language based on user locale.

## Important Notes

1. **Static Export**: API routes don't work with `output: 'export'`. Use pre-generated JSON files instead.
2. **Regenerate JSON**: Always run `node scripts/generate-manuals.js` after adding/modifying manuals.
3. **3D Model Coordinates**: Finding annotation coordinates requires trial and error. Test in browser.
4. **Step Filenames**: Use `XX-name.md` format (e.g., `01-overview.md`) for proper sorting.
5. **Frontmatter**: Ensure frontmatter sections are separated by `---` markers.

## Future Enhancements

Potential improvements:
- Platform-specific terminal commands (Windows/Mac/Linux tabs)
- Multiple models per step with camera presets
- Video embed support
- Search across all manuals
- PDF export option
- User comments/feedback on steps
- Progress tracking with local storage
- Dark mode for terminal blocks

## Files Created/Modified

### Created
- `app/[locale]/manual/page.jsx`
- `app/[locale]/manual/ManualClient.jsx`
- `app/[locale]/manual/[pcb-name]/page.jsx`
- `app/[locale]/manual/[pcb-name]/[step]/page.jsx`
- `app/components/ManualViewer.jsx`
- `app/components/StepContent.jsx`
- `app/components/StepNavigation.jsx`
- `app/components/TerminalBlock.jsx`
- `app/components/3dModelAnnotation.jsx`
- `lib/manuals.js`
- `scripts/generate-manuals.js`
- `public/manuals/_manuals.json`
- `public/manuals/_manuals.fr.json`
- `public/manuals/_manuals.de.json`
- `public/manuals/microflip/` (complete example manual)

### Modified
- `package.json` - Added generation script to build command
- `app/i18n/dictionaries/en.json` - Added manual translations
- `app/i18n/dictionaries/fr.json` - Added manual translations
- `app/i18n/dictionaries/de.json` - Added manual translations

### Documentation
- `docs/MANUAL_SETUP.md` - Setup guide for creating manuals
- `docs/MANUAL_IMPLEMENTATION_SUMMARY.md` - This summary

## Next Steps

To add manuals for your PCBs:

1. **Prepare 3D Models**: Export .glb files with annotations
2. **Create Manual Directories**: Set up structure in `public/manuals/`
3. **Write Content**: Create README.md and step files
4. **Add Translations**: Create readmeFR.md/readmeDE.md if needed
5. **Generate Data**: Run `node scripts/generate-manuals.js`
6. **Test**: Navigate to `/manual` and verify everything works

The system is now ready for you to create manuals for your AT2-LED-Bed, Coaster, and other PCB boards!
