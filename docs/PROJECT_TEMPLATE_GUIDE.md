# Project Template Guide

This guide explains how to create new project pages with 3D PCB visualization.

## Creating a New Project

1. **Copy the template**: Duplicate the `app/[locale]/portfolio/_template/page.mdx` file
2. **Rename the folder**: Create a new folder in `app/[locale]/portfolio/` with your project name (e.g., `new-project`)
3. **Move the file**: Move the copied file to `app/[locale]/portfolio/new-project/page.mdx`
4. **Update content**: Replace the placeholder text with your project details

## Template Structure

### Required Sections:
- **Overview**: Brief project description (1-2 paragraphs)
- **Design Philosophy**: What principles guided the design
- **Key Features**: Main features list (5-8 items)
- **Technical Implementation**: Detailed technical breakdown with subsections
- **Performance Specifications**: Technical specifications list
- **Applications**: Use cases for the project
- **Testing & Validation**: Testing performed

### Optional Sections:
- Add more `<h2>` sections as needed
- Add `<h3>` subsections within technical sections
- Include images or diagrams where appropriate

## 3D PCB Viewer

### Current Implementation
The template includes a `<PCBViewer>` component that shows a green cube as a placeholder for the PCB.

```jsx
<PCBViewer stepFile={null} />
```

### Adding Real STEP Files

When you have actual STEP files for your PCB:

1. **Place STEP files** in the `public/models/` directory
2. **Update the PCBViewer prop**: Change `null` to your STEP file path

```jsx
<PCBViewer stepFile="/models/project-name.step" />
```

3. **Update PCBViewer component** (`app/components/PCBViewer.jsx`):
   - Replace the `<PlaceholderPCB />` with actual STEP file loader
   - Use libraries like `three-stdlib` or `@loaders.gl/step` for loading STEP files
   - Example implementation:

```jsx
import { useGLTF } from '@react-three/drei'

function RealPCB({ stepFile }) {
  const { scene } = useGLTF(stepFile)
  return <primitive object={scene} />
}
```

### PCBViewer Features
- **360° animation**: Automatic rotation on page load (2 seconds)
- **Interactive controls**: Drag to rotate, scroll to zoom
- **Responsive size**: Adjusts between mobile (300px) and desktop (400px)
- **Green placeholder**: Standard PCB color until real model is added

## Internationalization

The template supports multiple languages automatically through the `{locale}` parameter:

- English: `/en/portfolio/project-name`
- French: `/fr/portfolio/project-name`  
- German: `/de/portfolio/project-name`

Dictionary keys are available via:
```javascript
const t = await getDictionary(locale)
```

## Styling

The template uses:
- **Tailwind CSS** for styling
- **Prose classes** for automatic typography (`prose prose-neutral dark:prose-invert`)
- **Max-width**: `max-w-4xl` for optimal reading width

## SEO

Each project page has metadata for SEO:

```javascript
export async function generateMetadata({ params }) {
  return {
    title: 'Project Title — Subtitle',
    description: 'Short project description for SEO.'
  }
}
```

Update these fields for better search engine visibility.

## Best Practices

1. **Keep it technical**: Focus on technical details, specifications, and implementation
2. **Be specific**: Use actual numbers, measurements, and technical terms
3. **Structure well**: Use clear headings and bullet points for readability
4. **Update metadata**: Always update title and description for SEO
5. **Test the 3D viewer**: Ensure the PCB model loads correctly after adding STEP files

## Example Completed Projects

For reference, see these completed projects:
- `app/[locale]/portfolio/heated-coaster/`
- `app/[locale]/portfolio/esp32s3-led-bed/`
- `app/[locale]/portfolio/rc-bms/`
