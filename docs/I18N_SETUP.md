# Internationalization (i18n) Setup Guide

This document explains how internationalization works in the TES website and how to add translations.

## Architecture Overview

Your website uses a Next.js App Router with a custom i18n implementation based on locale-prefixed routes.

### Key Components

1. **Locale Routing** (`app/[locale]/`)
   - All pages are wrapped in a `[locale]` dynamic segment
   - Routes are like `/en/about`, `/fr/about`, `/de/about`

2. **Dictionary Files** (`app/i18n/dictionaries/`)
   - `en.json` - English translations
   - `fr.json` - French translations
   - `de.json` - German translations

3. **Translation Loading** (`app/i18n/getDictionary.js`)
   - Dynamically imports the appropriate dictionary based on locale
   - Falls back to English if the locale is not found

4. **Middleware** (`middleware.js`)
   - Automatically detects user's preferred language from browser
   - Redirects root URL (`/`) to locale-prefixed URL (`/en`, `/fr`, or `/de`)

5. **Language Switcher** (`app/components/LangSwitcher.jsx`)
   - UI component for users to manually switch languages

## How to Use Translations

### In Server Components

Server components (files directly in `app/[locale]/`) should fetch translations and pass them to client components:

```javascript
// app/[locale]/about/page.jsx
import { getDictionary } from '../../i18n/getDictionary'
import AboutClient from './AboutClient'

export default async function AboutPage({ params: { locale } }) {
  const t = await getDictionary(locale)
  return <AboutClient key={locale} t={t} locale={locale} />
}
```

### In Client Components

Client components receive translations as props:

```javascript
// app/[locale]/about/AboutClient.jsx
'use client'

export default function AboutClient({ t, locale }) {
  return (
    <div>
      <h1>{t?.about?.title}</h1>
      <p>{t?.about?.intro?.p1}</p>
    </div>
  )
}
```

### Accessing Translations

Use optional chaining (`?.`) to safely access nested keys:

```javascript
// Safe access with fallback
{t?.nav?.home ?? 'Home'}
```

## Adding New Translations

### Step 1: Add to Dictionary Files

Add the new key to all three dictionary files (en.json, fr.json, de.json):

**en.json:**
```json
{
  "newSection": {
    "title": "New Title",
    "description": "New description in English"
  }
}
```

**fr.json:**
```json
{
  "newSection": {
    "title": "Nouveau titre",
    "description": "Nouvelle description en français"
  }
}
```

**de.json:**
```json
{
  "newSection": {
    "title": "Neuer Titel",
    "description": "Neue Beschreibung auf Deutsch"
  }
}
```

### Step 2: Use in Components

```javascript
// Server component
const t = await getDictionary(locale)

// Client component
<NewComponent t={t} locale={locale} />

// In the component
<h1>{t?.newSection?.title}</h1>
<p>{t?.newSection?.description}</p>
```

## Current Dictionary Structure

Your dictionaries are organized into these main sections:

- `nav` - Navigation items (Home, About, Portfolio, Contact, etc.)
- `hero` - Homepage hero section
- `buttons` - Button labels
- `sections` - Section headings
- `about` - About page content
- `portfolio` - Portfolio page content
- `services` - Service descriptions
- `common` - Common elements used across pages
- `servicePages` - Detailed service pages (prototyping, power, pcb-design, firmware)
- `projects` - Project descriptions

## Best Practices

### 1. Always Provide Fallbacks

```javascript
// Good - with fallback
{t?.nav?.home ?? 'Home'}

// Avoid - without fallback
{t?.nav?.home} // Could be undefined
```

### 2. Use Consistent Key Naming

Use camelCase for keys:
```json
"backToHome" // ✓ Good
"Back To Home" // ✗ Bad
"back_to_home" // ✗ Avoid
```

### 3. Group Related Translations

```json
{
  "about": {
    "title": "About",
    "values": {
      "quality": {
        "title": "Quality First",
        "description": "..."
      }
    }
  }
}
```

### 4. Keep HTML in Dictionaries When Needed

For translations with formatting, use HTML in the dictionary:

```json
{
  "about": {
    "backToHome": "<- Back to home"
  }
}
```

And use `dangerouslySetInnerHTML`:
```javascript
<div dangerouslySetInnerHTML={{ __html: t?.about?.backToHome }} />
```

## Adding a New Page with Translations

### Step 1: Create the Page Structure

```javascript
// app/[locale]/newpage/page.jsx
import { getDictionary } from '../../i18n/getDictionary'
import NewPageClient from './NewPageClient'

export default async function NewPage({ params: { locale } }) {
  const t = await getDictionary(locale)
  return <NewPageClient key={locale} t={t} locale={locale} />
}
```

### Step 2: Create Client Component

```javascript
// app/[locale]/newpage/NewPageClient.jsx
'use client'

export default function NewPageClient({ t, locale }) {
  return (
    <div>
      <h1>{t?.newPage?.title}</h1>
      <p>{t?.newPage?.description}</p>
    </div>
  )
}
```

### Step 3: Add Translations

Add `newPage` section to all three dictionary files.

## Testing Translations

### Test Different Locales

Access your site with different locale prefixes:
- English: `http://localhost:3000/en`
- French: `http://localhost:3000/fr`
- German: `http://localhost:3000/de`

### Test Language Switching

Use the LangSwitcher component to verify language switching works correctly.

### Test Missing Translations

If a translation is missing, the site should display the key name or fallback value without crashing.

## Common Issues

### Issue: Translation not showing

**Solution:** Check that:
1. The key exists in all dictionary files
2. You're using optional chaining (`t?.section?.key`)
3. The dictionary is being passed correctly to client components

### Issue: Language not switching

**Solution:** Verify that:
1. Links include the locale parameter: `/${locale}/about`
2. The middleware is running correctly
3. The LangSwitcher component is properly configured

### Issue: Fallback to English not working

**Solution:** Check `app/i18n/getDictionary.js` - the fallback logic should import `defaultLocale` when a locale file is not found.

## SEO Considerations

Your current setup includes:

1. **Localized Metadata** - Each locale has its own title, description, and OpenGraph tags
2. **Hreflang Tags** - Consider adding these for better SEO
3. **URL Structure** - Clean locale-prefixed URLs (`/en/about`)

To add hreflang tags, modify your layout's `generateMetadata` function.

## Additional Resources

- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Accept-Language Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language)
