# Manual Infrastructure Setup Guide

This document describes the manual infrastructure system implemented for PCB board flashing and setup guides.

## Overview

The manual system provides a step-by-step guide infrastructure similar to the AT-Documentation, with:

- **3D Model Integration**: Interactive 3D models with annotations pointing to specific components
- **Terminal Commands**: Copy-to-clipboard terminal blocks with syntax highlighting
- **Step-by-Step Navigation**: Linear progression through manual steps
- **Localization Support**: English, French, and German translations
- **Markdown-Based Content**: Easy to write and maintain

## Directory Structure

```
public/manuals/
  ├── microflip/
  │   ├── README.md              # Manual metadata (title, description, etc.)
  │   ├── model.glb              # 3D model for annotations
  │   ├── steps/
  │   │   ├── 01-overview.md
  │   │   ├── 02-flashing.md
  │   │   ├── 03-configuration.md
  │   │   └── 04-testing.md
  │   ├── readmeFR.md            # French overview
  │   └── readmeDE.md            # German overview
  ├── at2-led-bed/
  │   └── (same structure)
  └── coaster/
      └── (same structure)
```

## Creating a New Manual

### 1. Create Manual Directory

```bash
mkdir public/manuals/your-pcb-name/steps
```

### 2. Create README.md

```markdown
---
title: "Your PCB Name Manual"
description: "Complete guide to flash and setup your PCB"
date: 2025-12-24
modelFile: "your-pcb-name/model.glb"
---

# Manual Title

Brief description of what this manual covers.

## What You'll Need

List of requirements.

## Manual Contents

1. **Overview** - Introduction and prerequisites
2. **Flashing** - How to flash the firmware
3. **Configuration** - Setup configuration
4. **Testing** - Verification steps
```

### 3. Create Step Files

Each step file follows this format:

```markdown
---
title: "Step Title"
prevStep: "previous-step-slug"
nextStep: "next-step-slug"
---

## Step Title

Your step content here.

### Regular Markdown

You can use standard markdown: **bold**, *italic*, lists, etc.

### Terminal Commands

Use the `<terminal>` component for commands:

<terminal command="your-command-here" />

### 3D Models

Use the `<3d-model>` component to display annotated 3D models:

<3d-model 
  model="/manuals/your-pcb-name/model.glb"
  annotations='[{"position": {"x": 0, "y": 5, "z": 2}, "label": "Button", "color": "#FF5733"}]'
  cameraPosition='{"x": 0, "y": 0, "z": 50}'
/>
```

## Custom Components

### `<terminal>` Component

Displays a terminal-style code block with copy functionality:

```markdown
<terminal command="esptool.py --chip esp32 write_flash 0x1000 firmware.bin" />
```

### `<3d-model>` Component

Displays an interactive 3D model with annotations:

- **model**: Path to the .glb file
- **annotations**: JSON array of annotation objects
  - `position`: {x, y, z} coordinates
  - `label`: Text to display
  - `color`: Hex color code for the annotation
- **cameraPosition**: Initial camera position {x, y, z}

## Annotation Coordinates

Finding the right coordinates for annotations requires some trial and error. Start with approximate values and adjust:

```json
{
  "position": {
    "x": 0,    // Left/right
    "y": 5,    // Up/down
    "z": 2     // Forward/backward
  },
  "label": "Flash Button",
  "color": "#FF5733"
}
```

## Step Navigation

Steps automatically link to each other using the `prevStep` and `nextStep` frontmatter:

```markdown
---
prevStep: "01-overview"
nextStep: "03-configuration"
---
```

## Localization

### Manual Overview Translations

Create `readmeFR.md` and `readmeDE.md` for translated overviews:

```markdown
---
title: "Titre du Manuel"
description: "Guide complet pour flasher et configurer votre PCB"
date: 2025-12-24
modelFile: "your-pcb-name/model.glb"
---

# Titre du Manuel

Contenu en français...
```

### Step Content Translations

Create localized step files:
- `01-overview.fr.md` (French)
- `01-overview.de.md` (German)

The system will automatically use the appropriate language based on the user's locale.

## URL Structure

- **Manual List**: `/{locale}/manual`
- **Manual Overview**: `/{locale}/manual/{pcb-name}`
- **Specific Step**: `/{locale}/manual/{pcb-name}/{step-slug}`

Example:
- `/en/manual/microflip` - Microflip manual (starts at step 1)
- `/en/manual/microflip/02-flashing` - Flashing step

## Adding 3D Models

1. Place your .glb model in the manual directory:
   ```
   public/manuals/your-pcb-name/model.glb
   ```

2. Reference it in step files using the `<3d-model>` component
3. Adjust annotation coordinates until they point to the correct locations
4. Set appropriate camera position for optimal viewing

## Testing

To test your manual:

1. Generate manuals data: `node scripts/generate-manuals.js`
2. Start the dev server: `npm run dev`
3. Navigate to `http://localhost:3000/{locale}/manual`
4. Find your manual in the list
5. Click through each step
6. Test all terminal commands copy functionality
7. Verify 3D model annotations are correct

**Note:** When adding or modifying manuals, you must run `node scripts/generate-manuals.js` to regenerate the JSON data files. The build script does this automatically (`npm run build`), but for development you may need to run it manually.

## Best Practices

1. **Step Organization**: Keep steps focused on single tasks
2. **Terminal Commands**: Always provide copyable commands
3. **3D Annotations**: Use clear, descriptive labels
4. **Visuals**: Include 3D models where helpful, not everywhere
5. **Testing**: Test each step's commands and links
6. **Localization**: Translate at least the overview and key steps

## Example Manual

A complete example manual is included at `public/manuals/microflip/` with:
- 4 steps covering overview, flashing, configuration, and testing
- Terminal commands with copy functionality
- 3D model with annotations for flashing button
- Complete markdown content

## Troubleshooting

### 3D Model Not Loading

- Check the model path is correct
- Verify the .glb file exists in the public/manuals directory
- Check browser console for errors

### Terminal Commands Not Copying

- Ensure you're using the `<terminal>` component, not regular code blocks
- Check browser console for clipboard API errors

### Steps Not Linking

- Verify `prevStep` and `nextStep` values match step filenames (without .md)
- Check that step files are named correctly (e.g., `01-overview.md`)

## Future Enhancements

Potential improvements:
- Platform-specific terminal commands (Windows/Mac/Linux tabs)
- Multiple models per step with camera presets
- Video embed support
- Search functionality across all manuals
- PDF export option
- User comments/feedback on steps
