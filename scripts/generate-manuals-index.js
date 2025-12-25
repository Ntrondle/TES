const fs = require('fs')
const path = require('path')

const MANUALS_DIR = path.join(process.cwd(), 'public', 'manuals')
const OUTPUT_FILE = path.join(MANUALS_DIR, 'index.json')

function generateManualsIndex() {
  const manuals = []
  
  if (!fs.existsSync(MANUALS_DIR)) {
    console.log('Manuals directory does not exist')
    return []
  }
  
  const pcbDirs = fs.readdirSync(MANUALS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => !dirent.name.startsWith('.'))
    .filter(dirent => !dirent.name.startsWith('_')) // Exclude _ directories
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
    
    // Count steps
    let stepCount = 0
    if (fs.existsSync(stepsDir)) {
      const stepFiles = fs.readdirSync(stepsDir)
        .filter(file => file.endsWith('.md'))
        .filter(file => !file.includes('.FR') && !file.includes('.DE')) // Skip localized files
        .sort()
      stepCount = stepFiles.length
    }
    
    manuals.push({
      slug: pcbName,
      title: frontmatter.title || pcbName,
      description: frontmatter.description || '',
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      modelFile: frontmatter.modelFile,
      stepCount: stepCount
    })
  }
  
  return manuals
}

function parseFrontmatter(content) {
  const frontmatter = {}
  // Normalize line endings
  const normalizedContent = content.replace(/\r\n/g, '\n')
  const match = normalizedContent.match(/^---\n([\s\S]*?)\n---/)
  
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

// Generate and save manuals index
const manuals = generateManualsIndex()
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manuals, null, 2))
console.log(`✓ Generated manuals index for ${manuals.length} manual(s)`)
console.log(`✓ Saved to: ${OUTPUT_FILE}`)
