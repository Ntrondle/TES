# Manual Localization Guide

This guide explains how to add multilingual support to your manuals.

## Overview

The manual system supports full internationalization (i18n) with automatic locale detection and fallback to English. Each manual can have localized README files and step files for French and German.

## File Structure

```
public/manuals/at2/
├── README.md              # English (default)
├── README.FR.md           # French translation
├── README.DE.md           # German translation
└── steps/
    ├── 01-overview.md      # English (default)
    ├── 01-overview.FR.md   # French translation
    ├── 01-overview.DE.md   # German translation
    ├── 02-flashing.md
    ├── 02-flashing.FR.md
    ├── 02-flashing.DE.md
    └── ...
```

## Adding a New Language

### 1. Update `lib/manuals.js`

Add the new locale to the `localizedReadmeFiles` object:

```javascript
const localizedReadmeFiles = {
  'fr': 'README.FR.md',
  'de': 'README.DE.md',
  'es': 'README.ES.md',  // Add Spanish
  'it': 'README.IT.md'   // Add Italian
}
```

Also update the `localizedStepFiles` object:

```javascript
const localizedStepFiles = {
  'fr': `${stepSlug}.FR.md`,
  'de': `${stepSlug}.DE.md`,
  'es': `${stepSlug}.ES.md`,  // Add Spanish
  'it': `${stepSlug}.IT.md`   // Add Italian
}
```

### 2. Add Language to Next.js

Update `app/i18n/locales.js`:

```javascript
export const locales = ['en', 'fr', 'de', 'es', 'it']
```

### 3. Create Translation Files

#### Manual README

Create `public/manuals/at2/README.ES.md`:

```markdown
---
title: "Guía de Ensamblaje AT2 LED Bed"
description: "Guía completa de ensamblaje para la placa LED AT2 con instrucciones paso a paso"
date: "2025-01-15"
author: "Nicolas Trondle"
modelFile: "/manuals/at2/model.glb"
---

# Guía de Ensamblaje AT2 LED Bed

Bienvenido a la guía de ensamblaje de la placa LED AT2...
```

#### Step Files

Create `public/manuals/at2/steps/01-overview.ES.md`:

```markdown
---
title: "Visión General"
---

Bienvenido al primer paso del ensamblaje...
```

### 4. Add Dictionary

Create `app/i18n/dictionaries/es.json`:

```json
{
  "locale": "Spanish",
  "manuals": {
    "title": "Manuales",
    "allManuals": "Todos los Manuales",
    "step": "Paso",
    "steps": "Pasos"
  }
}
```

## Localization Logic

### How It Works

1. **Automatic Detection**: The system reads the locale from the URL path (`/fr/manual/at2/flashing`)

2. **Priority Order**:
   - First: Try localized file (e.g., `README.FR.md`)
   - Second: Fall back to English (`README.md`)
   - Third: Return null if neither exists

3. **Manual Metadata** (README):
   ```javascript
   // French user visits /fr/manual/at2
   getManual('at2', 'fr')
   → Reads README.FR.md (title, description in French)
   ```

4. **Step Content**:
   ```javascript
   // French user reads step 1
   getLocalizedManualStep('at2', '01-overview', 'fr')
   → Reads 01-overview.FR.md
   ```

## Best Practices

### 1. Always Provide English Version
English (`README.md`, `step.md`) is the default fallback. Always include it.

### 2. Keep Content Synchronized
When updating English content, update all translations to keep them in sync.

### 3. Use Consistent Naming
- Files: `README.FR.md`, `step-name.FR.md`
- Locale codes: `en`, `fr`, `de`, `es`, `it`
- Capitalization: Uppercase locale code in filename

### 4. Frontmatter Translation
Translate all frontmatter fields:

```markdown
---
title: "Translated Title"           # ✅ Translate
description: "Translated Description" # ✅ Translate
date: "2025-01-15"                 # ✅ Keep same format
author: "Author Name"               # ✅ Translate if needed
modelFile: "/manuals/at2/model.glb" # ❌ Don't translate paths
---
```

### 5. Internal Links
Update internal links with locale prefix:

**English** (`README.md`):
```markdown
Next step: [Flashing Firmware](/en/manual/at2/flashing)
```

**French** (`README.FR.md`):
```markdown
Étape suivante : [Flashing du firmware](/fr/manual/at2/flashing)
```

**German** (`README.DE.md`):
```markdown
Nächster Schritt: [Flashen der Firmware](/de/manual/at2/flashing)
```

## Adding Translations to Existing Manuals

### Step 1: Create Localized README
Copy the English README:

```bash
cp public/manuals/at2/README.md public/manuals/at2/README.FR.md
```

Translate the content while keeping the structure identical.

### Step 2: Translate Steps
For each step file:

```bash
cp public/manuals/at2/steps/01-overview.md public/manuals/at2/steps/01-overview.FR.md
```

Translate the title and content.

### Step 3: Test
Visit the localized URL:
- English: `https://yoursite.com/en/manual/at2/overview`
- French: `https://yoursite.com/fr/manual/at2/overview`
- German: `https://yoursite.com/de/manual/at2/overview`

## Supported Locales

Currently supported:

| Locale | Language | README File | Step Files |
|--------|----------|-------------|-------------|
| `en` | English | `README.md` | `step.md` |
| `fr` | French | `README.FR.md` | `step.FR.md` |
| `de` | German | `README.DE.md` | `step.DE.md` |

## Example File Names

### Correct ✅
```
README.md
README.FR.md
README.DE.md
01-overview.md
01-overview.FR.md
01-overview.DE.md
```

### Incorrect ❌
```
README-fr.md          # Wrong separator
README_fr.md          # Wrong separator
01-overview-fr.md     # Wrong separator
01overview.FR.md       # Missing separator
```

## Testing Localizations

### Test All Locales

```bash
# English (default)
http://localhost:3000/en/manual/at2/overview

# French
http://localhost:3000/fr/manual/at2/overview

# German
http://localhost:3000/de/manual/at2/overview
```

### Test Fallback Behavior

Remove a localized file and verify it falls back to English:

```bash
mv public/manuals/at2/README.FR.md public/manuals/at2/README.FR.md.backup
# Visit /fr/manual/at2 - should show English README
```

### Verify Metadata

Check that manual cards show correct language:

1. Visit `/fr/manual` (French manuals page)
2. Verify AT2 card shows French title and description
3. Click to enter manual
4. Verify step content is in French

## Troubleshooting

### Issue: Manual not showing in locale

**Solution**: Check that the localized README file exists and has proper frontmatter.

### Issue: Step not localized

**Solution**: Verify the step file name format matches:
- `01-overview.FR.md` ✅
- `01overview.FR.md` ❌

### Issue: Internal links broken

**Solution**: Ensure links include locale prefix:
- `/fr/manual/at2/flashing` ✅
- `/manual/at2/flashing` ❌

### Issue: Content not updating

**Solution**: Restart the development server:
```bash
npm run dev
```

## Adding More Content

### Adding New Steps

1. Create English step: `04-new-step.md`
2. Create French translation: `04-new-step.FR.md`
3. Create German translation: `04-new-step.DE.md`

### Adding New Manuals

1. Create manual directory: `public/manuals/new-manual/`
2. Add README files:
   - `README.md` (English)
   - `README.FR.md` (French)
   - `README.DE.md` (German)
3. Add steps with translations
4. Restart server - manual appears automatically!

## Summary

The localization system is designed to be:
- **Simple**: Just add translated files
- **Automatic**: Locale detection and fallbacks
- **Flexible**: Add any language you need
- **Robust**: Falls back to English if translation missing

For questions or issues, refer to the main `MANUAL_SETUP.md` guide.