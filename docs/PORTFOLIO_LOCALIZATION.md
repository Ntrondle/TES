# Portfolio README Localization Guide

## Overview

The portfolio system now supports localized README files for each project, allowing you to display content in English, French, and German based on the user's selected language. Both the **content** and **metadata** (title, description) can be localized.

## File Naming Convention

Each portfolio project can have localized README files with the following naming:

```
public/portfolio/project-name/
├── README.md      # English (default/fallback)
├── readmeFR.md    # French version
├── readmeDE.md    # German version
├── icon.svg
├── thumbnail.png
└── images/
    └── project-image.png
```

## How It Works

1. **Automatic Locale Detection**: When a user visits a portfolio project, the system checks the current locale (en/fr/de)

2. **Localized File Loading**: 
   - French locale (`/fr/portfolio/project`): Tries `readmeFR.md` first, falls back to `README.md`
   - German locale (`/de/portfolio/project`): Tries `readmeDE.md` first, falls back to `README.md`
   - English locale (`/en/portfolio/project`): Uses `README.md`

3. **Metadata Support**: The frontmatter (title, description, date, etc.) can be included in localized READMEs. If localized metadata doesn't exist, it falls back to `README.md`

## Creating Localized READMEs

### Step 1: Start with English README.md

```markdown
---
title: "My Project"
description: "A brief description of project"
date: "2024-01-15"
modelFile: "project-model.glb"
githubLink: "https://github.com/user/project"
shopLink: "https://tes-shop.ch/project"
---

# My Project

This is the English version of project documentation.

## Features

- Feature 1
- Feature 2
- Feature 3
```

### Step 2: Create readmeFR.md (French) - WITH LOCALIZED METADATA

```markdown
---
title: "Mon Projet"
description: "Une brève description du projet"
---

# Mon Projet

Ceci est la version française de la documentation du projet.

## Fonctionnalités

- Fonctionnalité 1
- Fonctionnalité 2
- Fonctionnalité 3
```

### Step 3: Create readmeDE.md (German) - WITH LOCALIZED METADATA

```markdown
---
title: "Mein Projekt"
description: "Eine kurze Beschreibung des Projekts"
---

# Mein Projekt

Dies ist die deutsche Version der Projektdokumentation.

## Funktionen

- Funktion 1
- Funktion 2
- Funktion 3
```

## Important Notes

### Metadata (Frontmatter)

**Localized READMEs CAN include their own metadata**: You can translate the title, description, and other metadata in your localized README files.

✅ **RECOMMENDED**: Include localized metadata for better UX:
```markdown
---
title: "Mon Projet"
description: "Description en français"
---

# Mon Projet

Contenu du projet...
```

❌ **OPTIONAL**: Content only (metadata will fall back to English):
```markdown
# Mon Projet

Contenu du projet...
```

### What Metadata Can Be Localized?

You can include any of the following in your localized READMEs:
- `title`: Project title (appears on portfolio cards and project page)
- `description`: Project description (appears on portfolio cards and project page)
- Other metadata fields will fall back to README.md

**Note**: Files like `modelFile`, `githubLink`, `shopLink`, `date` should typically stay in README.md as they're language-independent.

### Fallback Behavior

The system uses a smart fallback:
1. Tries to read localized README (e.g., `readmeFR.md`)
2. If not found, falls back to `README.md`
3. Same for metadata - tries localized, falls back to English

This ensures:
- Projects without translations still work (shows English)
- Partial translations are okay (e.g., only French title, English content)

## Example: Full Project Structure

```
public/portfolio/at2-led-bed/
├── README.md              # English with metadata
├── readmeFR.md           # French with localized metadata
├── readmeDE.md           # German with localized metadata
├── icon.svg
├── thumbnail.png
├── at2.glb
└── images/
    ├── screenshot.png
    └── diagram.jpg
```

### README.md (English)
```markdown
---
title: "AT2 LED Bed"
description: "High-density LED matrix controller with ESP32-S3"
date: "2024-03-15"
modelFile: "at2.glb"
githubLink: "https://github.com/Trondle-Embedded-Systems/at2-led-bed"
---

# AT2 LED Bed

A high-density LED matrix controller featuring...

## Specifications

- ESP32-S3 microcontroller
- 64x64 RGB LED matrix support
- USB-C power delivery up to 24V
```

### readmeFR.md (French)
```markdown
---
title: "AT2 LED Bed"
description: "Contrôleur de matrice LED haute densité avec ESP32-S3"
---

# AT2 LED Bed

Un contrôleur de matrice LED haute densité avec...

## Spécifications

- Microcontrôleur ESP32-S3
- Support matrice RVB 64x64
- Alimentation USB-C jusqu'à 24V
```

### readmeDE.md (German)
```markdown
---
title: "AT2 LED Bed"
description: "Controller für hochdichte LED-Matrizen mit ESP32-S3"
---

# AT2 LED Bed

Ein Controller für hochdichte LED-Matrizen mit...

## Spezifikationen

- ESP32-S3 Mikrocontroller
- Unterstützung für 64x64 RGB-LED-Matrix
- USB-C Stromversorgung bis zu 24V
```

## Testing Localized READMEs

1. **Create the localized files** in your project directory
2. **Restart the dev server**: `npm run dev`
3. **Test each language**:
   - English: `http://localhost:3000/TES/en/portfolio/project-name`
   - French: `http://localhost:3000/TES/fr/portfolio/project-name`
   - German: `http://localhost:3000/TES/de/portfolio/project-name`

4. **Check**:
   - ✅ Portfolio cards show localized title and description
   - ✅ Project page shows localized title and description
   - ✅ README content is in the correct language

## Troubleshooting

### Localized content not showing?
- Check that the filename is exactly `readmeFR.md` or `readmeDE.md` (case-sensitive)
- Verify the file is in the correct project directory
- Restart the dev server after adding new files

### Metadata (title/description) still in English?
- Make sure the localized README file includes frontmatter with `title` and `description`
- Check that the frontmatter is correctly formatted (YAML between `---` lines)
- Ensure the file has been saved and the dev server restarted

### Fallback to English working?
- This is expected behavior when localized files don't exist
- It ensures all projects are accessible even without translations

### Portfolio cards showing English but project page shows correct language?
- Make sure the locale is being passed to `getPortfolioProjects(locale)` in the portfolio page
- The system reads metadata differently for cards vs. project detail pages

## Benefits

✅ **Better UX**: Users see both titles and content in their preferred language  
✅ **Easy Implementation**: No code changes needed, just add files  
✅ **Flexible**: You can localize one, two, or all three languages  
✅ **Backward Compatible**: Projects without localized files still work  
✅ **Smart Fallback**: Partial translations are supported  
✅ **SEO Friendly**: Metadata is localized for each language
