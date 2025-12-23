# Portfolio Setup Guide

This guide explains how to set up portfolio pages using the new README-based system.

## New Structure

```
public/portfolio/
├── project-name/
│   ├── README.md          ← GitHub README file (main content)
│   ├── icon.jsx          ← Project icon (easy to edit!)
│   ├── model.glb         ← 3D PCB model
│   └── images/          ← Images referenced in README
│       ├── image1.png
│       └── image2.png
```

## Creating a New Portfolio Page

### Step 1: Create Project Folder

Create a new folder in `public/portfolio/`:

```bash
mkdir public/portfolio/my-project
mkdir public/portfolio/my-project/images
```

### Step 2: Add Icon File

Create `icon.jsx` in the project folder:

```jsx
export default function ProjectIcon() {
  return (
    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
    </div>
  )
}
```

**Tips:**
- Use Tailwind gradient classes for icon background
- Customize colors to match your project theme
- Use SVG icons from [Lucide](https://lucide.dev/) or similar libraries

### Step 3: Add README.md

Copy your GitHub README to the folder:

```bash
cp path/to/github/repo/README.md public/portfolio/my-project/README.md
```

**Supported Markdown Features:**
- Headers (H1, H2, H3, H4)
- Lists (ordered and unordered)
- Tables
- Code blocks with syntax highlighting
- Inline code
- Links
- Blockquotes
- Images (from `images/` folder)

### Step 4: Add 3D Model

Copy your GLB model:

```bash
cp model.glb public/portfolio/my-project/model.glb
```

Or link to existing model in `public/models/`:
```jsx
<PCBViewer stepFile="/models/your-model.glb" />
```

### Step 5: Create Page Component

Create `app/[locale]/portfolio/my-project/page.jsx`:

```jsx
import Link from 'next/link'
import { getDictionary } from '../../../i18n/getDictionary'
import PCBViewer from '../../../components/PCBViewer'
import PortfolioContent from '../../../components/PortfolioContent'
import dynamic from 'next/dynamic'

// Dynamically import icon from public folder
const ProjectIcon = dynamic(() => import('../../../../public/portfolio/my-project/icon'), { ssr: false })

export async function generateMetadata({ params }) {
  return {
    title: 'My Project',
    description: 'Short description of your project.'
  }
}

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
    <article className="max-w-4xl">
      <p className="mb-6">
        <Link href={`/${locale}/portfolio`} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
          ← {t.common.backToPortfolio}
        </Link>
      </p>
      
      <div className="flex items-center gap-3 mb-4">
        <ProjectIcon />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
          My Project
        </h1>
      </div>
      <p className="text-xl text-neutral-600 dark:text-neutral-300 mt-4">
        Short description of your project.
      </p>

      <div className="mt-8">
        <PCBViewer stepFile="/models/my-model.glb" />
      </div>

      <PortfolioContent readmePath="public/portfolio/my-project/README.md" locale={locale} />
    </article>
  )
}
```

## Updating Content

### Edit README.md

Simply edit the `README.md` file to update content:

```bash
nano public/portfolio/my-project/README.md
# or use your preferred editor
```

The page automatically reflects changes!

### Edit Icon

Edit `icon.jsx` to change the icon:

```bash
nano public/portfolio/my-project/icon.jsx
```

### Update Title/Description

Edit the page component `page.jsx`:

```jsx
export async function generateMetadata({ params }) {
  return {
    title: 'New Title',           // Change this
    description: 'New description' // And this
  }
}

export default async function Page({ params }) {
  return (
    <>
      <ProjectIcon />
      <h1>New Title</h1>      {/* And this */}
      <p>New description</p>       {/* And this */}
      <PCBViewer stepFile="/models/new-model.glb" /> {/* And this if needed */}
    </>
  )
}
```

## Image Support

Images in README are loaded from the `images/` folder:

```markdown
## Overview

![Render](images/render.png)

Front view of the PCB.

## Hardware

![PCB Top](images/front.png)
![PCB Bottom](images/back.png)
```

## Styling Guide

### Typography
- Uses website fonts (same as rest of site)
- H1: `text-3xl font-bold`
- H2: `text-2xl font-bold`
- H3: `text-xl font-bold`
- H4: `text-lg font-bold`

### Colors
- **Primary text**: `text-neutral-900 dark:text-white`
- **Secondary text**: `text-neutral-700 dark:text-neutral-300`
- **Links**: `text-[#0891b2] hover:text-[#0ea5e9]`
- **Quotes**: Cyan accent with left border
- **Code blocks**: Dark theme with syntax highlighting

### Tables
- Bordered tables with light header background
- Responsive overflow-x for small screens

## Examples

### Example: Prusa HeatBed Tile

Location: `public/portfolio/prusa-heatbed-tile/`

- **Icon**: Thermometer (orange/red gradient)
- **README**: Complete technical documentation
- **Model**: `coaster.glb`

### Example: AT2 LED Bed

Location: `public/portfolio/at2-led-bed/`

- **Icon**: Lightbulb (cyan/blue gradient)
- **README**: 4-layer PCB details
- **Model**: `at2.glb`

### Example: MicroFlip

Location: `public/portfolio/microflip/`

- **Icon**: Arrows (green/emerald gradient)
- **README**: Motor control documentation
- **Model**: `microflip.glb`

## Benefits of New System

✅ **Easy Content Updates**: Just edit README.md (GitHub style)
✅ **Separate Icons**: Easy to modify icons without touching content
✅ **Image Support**: Images render automatically from README
✅ **Markdown Power**: Tables, code blocks, lists all work
✅ **Website Fonts**: Consistent with rest of site
✅ **Dark Mode**: Automatically supported

## Troubleshooting

### README Not Found Error

If you see "README Not Found" error:
1. Check file path in `readmePath` prop
2. Ensure README.md exists in the correct folder
3. Restart dev server if file was just added

### Icon Not Displaying

1. Check icon.jsx syntax is valid JSX
2. Ensure import path is correct
3. Try restarting dev server

### Images Not Loading

1. Check image paths in README use relative paths: `images/filename.png`
2. Ensure images exist in `images/` folder
3. Check file names match exactly (case-sensitive)

## Next Steps

- Add your project to portfolio list in `app/[locale]/portfolio/page.jsx`
- Test the page in all locales (en, fr, de)
- Add images to README for better visualization
- Update README with latest project information
