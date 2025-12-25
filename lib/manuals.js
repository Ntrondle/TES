import fs from 'fs'
import path from 'path'

const MANUALS_DIR = path.join(process.cwd(), 'public', 'manuals')

/**
 * Get localized README file path
 * @param {string} manualPath - Path to manual directory
 * @param {string} locale - Current locale (en/fr/de)
 * @returns {string} Path to localized README file
 */
function getLocalizedReadmePath(manualPath, locale = 'en') {
  const localizedReadmeFiles = {
    'fr': 'README.FR.md',
    'de': 'README.DE.md'
  }
  
  const defaultReadme = path.join(manualPath, 'README.md')
  
  // Try localized file first
  const localizedFile = localizedReadmeFiles[locale]
  if (localizedFile) {
    const localizedPath = path.join(manualPath, localizedFile)
    if (fs.existsSync(localizedPath)) {
      return localizedPath
    }
  }
  
  // Fall back to default English README
  return defaultReadme
}

/**
 * Get all manuals by scanning the file system
 * @param {string} locale - Current locale (en/fr/de)
 * @returns {Array} Array of manual objects
 */
export function getManuals(locale = 'en') {
  try {
    if (!fs.existsSync(MANUALS_DIR)) {
      console.warn(`Manuals directory not found: ${MANUALS_DIR}`)
      return []
    }
    
    const manuals = []
    const entries = fs.readdirSync(MANUALS_DIR, { withFileTypes: true })
    
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        const manualPath = path.join(MANUALS_DIR, entry.name)
        const stepsPath = path.join(manualPath, 'steps')
        
        // Get localized README path
        const readmePath = getLocalizedReadmePath(manualPath, locale)
        
        if (fs.existsSync(readmePath)) {
          // Read README to get manual metadata
          const readmeContent = fs.readFileSync(readmePath, 'utf8')
          const frontmatter = parseFrontmatter(readmeContent)
          
          // Count steps
          let stepCount = 0
          if (fs.existsSync(stepsPath)) {
            const stepFiles = fs.readdirSync(stepsPath)
              .filter(file => file.endsWith('.md') && !file.includes('.FR') && !file.includes('.DE'))
              .sort()
            stepCount = stepFiles.length
          }
          
          // Check for custom icon
          const iconPath = path.join(manualPath, 'icon.svg')
          const hasCustomIcon = fs.existsSync(iconPath)
          
          manuals.push({
            slug: entry.name,
            title: frontmatter.title || entry.name,
            description: frontmatter.description || '',
            date: frontmatter.date || new Date().toISOString().split('T')[0],
            author: frontmatter.author || null,
            modelFile: frontmatter.modelFile || null,
            stepCount: stepCount,
            hasCustomIcon: hasCustomIcon
          })
        }
      }
    }
    
    return manuals
  } catch (error) {
    console.error('Error reading manuals:', error)
    return []
  }
}

/**
 * Get a single manual by slug with all steps
 * @param {string} slug - Manual folder name
 * @param {string} locale - Current locale for localized content
 * @returns {Object|null} Manual object with steps or null if not found
 */
export function getManual(slug, locale = 'en') {
  try {
    const manuals = getManuals(locale)
    const manual = manuals.find(m => m.slug === slug)
    
    if (!manual) {
      return null
    }
    
    const manualPath = path.join(MANUALS_DIR, slug)
    const stepsPath = path.join(manualPath, 'steps')
    
    if (!fs.existsSync(stepsPath)) {
      return { ...manual, steps: [] }
    }
    
    const stepFiles = fs.readdirSync(stepsPath)
      .filter(file => file.endsWith('.md') && !file.includes('.FR') && !file.includes('.DE'))
      .sort()
    
    const steps = stepFiles.map(file => {
      const stepSlug = file.replace('.md', '')
      const step = getLocalizedManualStep(slug, stepSlug, locale)
      return step
    }).filter(Boolean)
    
    return { ...manual, steps }
  } catch (error) {
    console.error('Error reading manual:', error)
    return null
  }
}

/**
 * Get a specific step from a manual
 * @param {string} manualSlug - Manual folder name
 * @param {string} stepSlug - Step filename without .md
 * @param {string} locale - Current locale
 * @returns {Object|null} Step object or null if not found
 */
export function getManualStep(manualSlug, stepSlug, locale = 'en') {
  const manual = getManual(manualSlug, locale)
  
  if (!manual || !manual.steps) {
    return null
  }
  
  return manual.steps.find(s => s.slug === stepSlug)
}

/**
 * Get localized step content by reading from appropriate markdown file
 * @param {string} manualSlug - Manual folder name
 * @param {string} stepSlug - Step filename without .md
 * @param {string} locale - Current locale (en/fr/de)
 * @returns {Object|null} Step object with localized content or null if not found
 */
export function getLocalizedManualStep(manualSlug, stepSlug, locale = 'en') {
  const stepsDir = path.join(MANUALS_DIR, manualSlug, 'steps')
  const localizedStepFiles = {
    'fr': `${stepSlug}.FR.md`,
    'de': `${stepSlug}.DE.md`
  }
  
  let stepPath = path.join(stepsDir, `${stepSlug}.md`)
  
  // Try localized file first
  const localizedFile = localizedStepFiles[locale]
  if (localizedFile) {
    const localizedPath = path.join(stepsDir, localizedFile)
    if (fs.existsSync(localizedPath)) {
      stepPath = localizedPath
    }
  }
  
  if (!fs.existsSync(stepPath)) {
    console.error(`Step file not found: ${stepPath}`)
    return null
  }
  
  // Read and parse step file
  const content = fs.readFileSync(stepPath, 'utf8')
  const frontmatter = parseFrontmatter(content)
  
  return {
    slug: stepSlug,
    title: frontmatter.title || stepSlug,
    content: content.split('---').slice(2).join('---').trim() || ''
  }
}

/**
 * Simple frontmatter parser for markdown files
 * @param {string} content - File content
 * @returns {Object} Frontmatter data
 */
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