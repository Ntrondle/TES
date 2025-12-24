import fs from 'fs'
import path from 'path'

const MANUALS_DIR = path.join(process.cwd(), 'public', 'manuals')

/**
 * Get all manuals from pre-generated JSON file
 * @param {string} locale - Current locale (en/fr/de)
 * @returns {Array} Array of manual objects
 */
export function getManuals(locale = 'en') {
  try {
    const localeFile = locale === 'en' ? '_manuals.json' : `_manuals.${locale}.json`
    const filePath = path.join(MANUALS_DIR, localeFile)
    
    if (!fs.existsSync(filePath)) {
      console.warn(`Manuals file not found: ${filePath}`)
      return []
    }
    
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.error('Error reading manuals:', error)
    return []
  }
}

/**
 * Get a single manual by slug
 * @param {string} slug - Manual folder name
 * @param {string} locale - Current locale for localized metadata
 * @returns {Object|null} Manual object or null if not found
 */
export function getManual(slug, locale = 'en') {
  const manuals = getManuals(locale)
  return manuals.find(m => m.slug === slug) || null
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
  
  if (!manual) {
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
    'fr': `${stepSlug}.fr.md`,
    'de': `${stepSlug}.de.md`
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
  
  // Read and parse the step file
  const content = fs.readFileSync(stepPath, 'utf8')
  const frontmatter = parseFrontmatter(content)
  
  return {
    slug: stepSlug,
    title: frontmatter.title || stepSlug,
    content: content.split('---')[2]?.trim() || ''
  }
}

/**
 * Simple frontmatter parser for markdown files
 * @param {string} content - File content
 * @returns {Object} Frontmatter data
 */
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
