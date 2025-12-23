# Dynamic Portfolio Structure Guide

This document explains how to add new portfolio projects to your website using the dynamic portfolio system.

## Overview

The portfolio system is now fully dynamic. When you add a new folder to `public/portfolio/`, it will automatically appear on the portfolio page without any code changes.

## Project Folder Structure

Each project should be placed in `public/portfolio/{project-name}/` with the following structure:

```
public/portfolio/
├── at2-led-bed/
│   ├── README.md          # Project content with frontmatter
│   ├── icon.svg           # SVG icon (optional)
│   ├── thumbnail.png      # Card image (optional)
│   ├── at2.glb           # 3D model file (optional, custom name)
│   └── images/           # Additional images for README
│       └── detail-1.png
└── microflip/
    ├── README.md
    ├── icon.svg
    ├── thumbnail.png
    └── images/
```

## Required Files

### README.md (Required)

The README.md file must include YAML frontmatter at the top with project metadata:

```yaml
---
title: "Project Title"
description: "Short description for the portfolio card"
modelFile: "model.glb"  # Optional: path to 3D model file
date: "2025-01-15"       # Required: used for sorting
---
# Project Title

Project description and content here...
```

**Frontmatter Fields:**
- `title` (required): Project name displayed on card and detail page
- `description` (required): Short description shown on portfolio cards
- `modelFile` (optional): Name of 3D model file in project folder
- `date` (required): ISO date string (YYYY-MM-DD) - used for sorting

**Content:**
The rest of the README.md uses standard Markdown with GitHub Flavored Markdown support:
- Headers (#, ##, ###)
- Lists (ordered and unordered)
- Tables
- Code blocks
- Images
- Links

## Optional Files

### icon.svg (Optional but Recommended)

An SVG icon displayed next to the project title on the detail page.

**Specifications:**
- Standard SVG format
- Recommended size: 32x32
- Can include custom colors or gradients
- Example:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
</svg>
```

### thumbnail.png (Optional but Recommended)

Image displayed on the portfolio card. If not provided, the icon.svg will be used as a fallback.

**Specifications:**
- PNG format
- Recommended aspect ratio: 16:9 or 4:3
- Recommended resolution: 800x450 or 640x360
- Should showcase the project visually

### 3D Model File (Optional)

3D model file displayed in the interactive viewer on the detail page.

**Specifications:**
- GLB or GLTF format
- Custom filename (specified in `modelFile` frontmatter field)
- Placed directly in project folder

## Adding a New Project

### Step-by-Step Guide

1. **Create project folder:**
   ```
   public/portfolio/my-new-project/
   ```

2. **Create README.md with frontmatter:**
   ```markdown
   ---
   title: "My New Project"
   description: "A brief description of the project"
   modelFile: "model.glb"
   date: "2025-01-20"
   ---
   
   # My New Project
   
   Detailed description of the project...
   ```

3. **Add optional assets:**
   - Create `icon.svg` for the project icon
   - Create `thumbnail.png` for the portfolio card
   - Add 3D model file (if applicable)

4. **Done!** The project will automatically appear on the portfolio page on the next build or in development mode.

## Project Display Order

Projects are automatically sorted by date (newest first) based on the `date` field in the frontmatter. To control the order, adjust the dates in your project README.md files.

## Customizing Detail Pages

### Adding Custom 3D Viewers

You can embed custom 3D viewers in your README.md using MDX syntax:

```markdown
## 3D Model

<PCBViewer model="/portfolio/my-project/model.glb" />
```

### Adding Interactive Components

The README supports MDX, so you can include React components if needed.

## Troubleshooting

### Project Not Showing on Portfolio Page

1. **Check README.md exists:** Ensure each project folder has a README.md file
2. **Check frontmatter:** Verify the YAML frontmatter is properly formatted with hyphens (`---`)
3. **Check date field:** Ensure the `date` field is in ISO format (YYYY-MM-DD)
4. **Restart dev server:** If running in development, try restarting the dev server

### Images Not Loading

1. **Check file paths:** Images in README.md should use relative paths like `images/photo.png`
2. **Check thumbnail:** Ensure `thumbnail.png` is in the project root (not in images/ folder)

### 3D Model Not Displaying

1. **Check modelFile field:** Ensure the `modelFile` frontmatter matches the exact filename
2. **Check file location:** Model file must be in the project root folder
3. **Check file format:** Ensure the file is in GLB or GLTF format

## Example Projects

See the existing projects for reference:
- `public/portfolio/at2-led-bed/` - Project with 3D model
- `public/portfolio/microflip/` - Project without 3D model
- `public/portfolio/prusa-heatbed-tile/` - Project with detailed content

## Technical Details

- The portfolio system uses Next.js App Router with server components
- Projects are discovered at build time using the `getPortfolioProjects()` utility in `lib/portfolio.js`
- Frontmatter is parsed using the `gray-matter` package
- Static pages are generated for all projects using `generateStaticParams()`
- No database or CMS required - everything is file-based

## Future Enhancements

Potential improvements to consider:
- Add tags/categories to projects
- Support for multiple images per project
- Project filtering and search
- Project featured/pinned status
- Multilingual support for project content
