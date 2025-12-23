# Converting STEP Files to GLB/GLTF Format

STEP files cannot be loaded directly by Three.js in the browser. They need to be converted to GLB/GLTF format first.

## Why STEP Files Don't Work Directly

- STEP (.step) is a CAD file format used for 3D modeling and manufacturing
- Three.js is a WebGL library that only supports specific 3D formats (GLB, GLTF, OBJ, etc.)
- Browser-based STEP conversion is resource-intensive and unreliable

## Solution: Convert STEP to GLB

### Option 1: Online Converters (Easiest)

Use these free online tools to convert your STEP files:

1. **AnyConv** - https://anyconv.com/step-to-glb-converter/
2. **Online3DConvert** - https://online3dconvert.com/
3. **Aspose** - https://products.aspose.app/3d/conversion/step-to-glb

**Steps:**
1. Upload your `.step` file
2. Select `.glb` as output format
3. Download the converted file
4. Replace the `.step` file in `public/models/` with the `.glb` file

### Option 2: Desktop Software (Better Quality)

Use professional CAD software:

1. **FreeCAD** (Open Source)
   - Download: https://www.freecad.org/
   - Import STEP → File → Export → Select GLB/GLTF

2. **Blender** (Free)
   - Download: https://www.blender.org/
   - Import STEP (needs CAD Importer add-on) → Export as GLB

3. **Fusion 360** (Free for Personal Use)
   - Import STEP → Export as GLB

### Option 3: Command Line (For Automation)

Using Blender's Python API:

```bash
# Install Blender
# Then run this script
blender -b -P convert_step_to_glb.py -- --input="models/coaster.step" --output="public/models/coaster.glb"
```

## After Conversion

1. Replace `.step` files in `public/models/` with `.glb` files
2. Update the `stepFile` prop in your portfolio pages from `.step` to `.glb`

Example in `app/[locale]/portfolio/prusa-heatbed-tile/page.mdx`:

```jsx
// Before
<PCBViewer stepFile="/models/coaster.step" />

// After
<PCBViewer stepFile="/models/coaster.glb" />
```

## Current Status

Currently, your portfolio pages are set up with placeholder 3D models. To display your actual PCB models:

1. Convert `coaster.step`, `at2.step`, and `microflip.step` to GLB format
2. Update the file paths in the portfolio pages
3. The PCBViewer component will automatically load and display the GLB models

## Why GLB/GLTF?

- **GLB/GLTF** is the standard format for 3D web graphics
- Optimized for WebGL and browser performance
- Supports materials, textures, and animations
- Smaller file sizes than STEP
- Native support in Three.js and react-three-fiber

## Testing the Conversion

After converting, test your GLB files:

1. Open the browser console and navigate to `http://localhost:3000/portfolio/prusa-heatbed-tile`
2. Check for any loading errors in the console
3. Verify the model appears and is rotatable with OrbitControls
4. Ensure the model is properly scaled (use the `scale` prop in PCBViewer if needed)
