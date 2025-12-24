const fs = require('fs')
const path = require('path')

const MANUALS_DIR = path.join(process.cwd(), 'public', 'manuals')
const OUTPUT_FILE = path.join(MANUALS_DIR, '_manuals.json')

function generateManualsData() {
  const manuals = []
  
  if (!fs.existsSync(MANUALS_DIR)) {
    console.log('Manuals directory does not exist')
    return []
  }
  
  const pcbDirs = fs.readdirSync(MANUALS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => !dirent.name.startsWith('.'))
    .map(dirent => dirent.name)
  
  for (const pcbName of pcbDirs) {
    const pcbDir = path.join(MANUALS_DIR, pcbName)
    const readmePath = path.join(pcbDir, 'README.md')
    const stepsDir = path.join(pcbDir, 'steps')
    
    if (!fs.existsSync(readmePath)) {
      console.log(`No README.md found for ${pcbName}, skipping...`)
      continue
    }
    
    // Read README.md to get frontmatter
    const readmeContent = fs.readFileSync(readmePath, 'utf-8')
    const frontmatter = parseFrontmatter(readmeContent)
    
    // Get step files
    let steps = []
    if (fs.existsSync(stepsDir)) {
      const stepFiles = fs.readdirSync(stepsDir)
        .filter(file => file.endsWith('.md'))
        .filter(file => !file.includes('.fr.') && !file.includes('.de.')) // Skip localized files
        .sort()
      
      steps = stepFiles.map(file => {
        const stepPath = path.join(stepsDir, file)
        const stepContent = fs.readFileSync(stepPath, 'utf-8')
        const stepFrontmatter = parseFrontmatter(stepContent)
        
        return {
          slug: file.replace('.md', ''),
          title: stepFrontmatter.title || file.replace('.md', ''),
          content: stepContent.split('---')[2]?.trim() || ''
        }
      })
    }
    
    // Get localized content
    let localizedContent = {}
    const frPath = path.join(pcbDir, 'readmeFR.md')
    const dePath = path.join(pcbDir, 'readmeDE.md')
    
    if (fs.existsSync(frPath)) {
      const frContent = fs.readFileSync(frPath, 'utf-8')
      const frFrontmatter = parseFrontmatter(frContent)
      localizedContent.fr = {
        title: frFrontmatter.title,
        description: frFrontmatter.description
      }
    }
    
    if (fs.existsSync(dePath)) {
      const deContent = fs.readFileSync(dePath, 'utf-8')
      const deFrontmatter = parseFrontmatter(deContent)
      localizedContent.de = {
        title: deFrontmatter.title,
        description: deFrontmatter.description
      }
    }
    
    manuals.push({
      slug: pcbName,
      title: frontmatter.title || pcbName,
      description: frontmatter.description || '',
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      modelFile: frontmatter.modelFile,
      stepCount: steps.length,
      steps: steps,
      localizedContent: Object.keys(localizedContent).length > 0 ? localizedContent : undefined
    })
  }
  
  return manuals
}

function parseFrontmatter(content) {
  const frontmatter = {}
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  
  if (match) {
    const frontmatterStr = match[1]
    const lines = frontmatterStr.split('\n')
    
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        let value = valueParts.join(':').trim()
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        frontmatter[key.trim()] = value
      }
    }
  }
  
  return frontmatter
}

// Generate and save manuals data
const manuals = generateManualsData()
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manuals, null, 2))
console.log(`✓ Generated manuals data for ${manuals.length} manual(s)`)

// Also generate localized versions
for (const locale of ['fr', 'de']) {
  const localizedManuals = manuals.map(manual => ({
    ...manual,
    title: manual.localizedContent?.[locale]?.title || manual.title,
    description: manual.localizedContent?.[locale]?.description || manual.description
  }))
  
  const localeOutput = path.join(MANUALS_DIR, `_manuals.${locale}.json`)
  fs.writeFileSync(localeOutput, JSON.stringify(localizedManuals, null, 2))
  console.log(`✓ Generated manuals data for locale: ${locale}`)
}

console.log('\nManuals generation complete!')
