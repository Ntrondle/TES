import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Get localized manual metadata by reading the appropriate README file
 * @param {string} manualPath - Path to manual directory
 * @param {string} locale - Current locale (en/fr/de)
 * @returns {Object} Frontmatter data
 */
function getLocalizedManualMetadata(manualPath, locale) {
  // Try to get metadata from localized README first
  const localizedReadmes = {
    'fr': 'readmeFR.md',
    'de': 'readmeDE.md'
  }
  
  const localizedFile = localizedReadmes[locale]
  if (localizedFile) {
    const localizedPath = path.join(manualPath, localizedFile)
    if (fs.existsSync(localizedPath)) {
      try {
        const content = fs.readFileSync(localizedPath, 'utf8')
        const { data } = matter(content)
        return data
      } catch (error) {
        console.error(`Error reading localized README for ${manualPath}:`, error)
      }
    }
  }
  
  // Fallback to English README.md
  const readmePath = path.join(manualPath, 'README.md')
  if (fs.existsSync(readmePath)) {
    try {
      const content = fs.readFileSync(readmePath, 'utf8')
      const { data } = matter(content)
      return data
    } catch (error) {
      console.error(`Error reading README.md for ${manualPath}:`, error)
    }
  }
  
  return {}
}

/**
 * Get all step files for a manual
 * @param {string} manualPath - Path to manual directory
 * @returns {Array} Array of step objects sorted by step number
 */
function getManualSteps(manualPath) {
  const stepsDir = path.join(manualPath, 'steps')
  
  if (!fs.existsSync(stepsDir)) {
    return []
  }
  
  const stepFiles = fs.readdirSync(stepsDir)
    .filter(file => file.match(/^\d{2}-.+\.md$/))
    .sort()
  
  return stepFiles.map(file => {
    const stepPath = path.join(stepsDir, file)
    const { data, content } = matter(fs.readFileSync(stepPath, 'utf8'))
    
    return {
      filename: file,
      slug: file.replace('.md', ''),
      title: data.title || file.replace('.md', '').replace(/^\d{2}-/, ''),
      content: content,
      nextStep: data.nextStep || null,
      prevStep: data.prevStep || null
    }
  })
}

/**
 * Get all manuals from public/manuals directory
 * @param {string} locale - Current locale for localized metadata
 * @returns {Array} Array of manual objects
 */
export async function getManuals(locale = 'en') {
  const manualsDir = path.join(process.cwd(), 'public', 'manuals')
  
  // Check if manuals directory exists
  if (!fs.existsSync(manualsDir)) {
    return []
  }
  
  // Get all directories in manuals folder
  const folders = fs.readdirSync(manualsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  
  const manuals = []
  
  for (const folder of folders) {
    const manualPath = path.join(manualsDir, folder)
    const readmePath = path.join(manualPath, 'README.md')
    const thumbnailPath = path.join(manualPath, 'thumbnail.png')
    
    // Skip if README.md doesn't exist
    if (!fs.existsSync(readmePath)) {
      continue
    }
    
    // Get localized metadata
    const frontmatter = getLocalizedManualMetadata(manualPath, locale)
    
    // Get steps
    const steps = getManualSteps(manualPath)
    
    // Build manual object
    const manual = {
      slug: folder,
      title: frontmatter.title || folder,
      description: frontmatter.description || '',
      modelFile: frontmatter.modelFile || `${folder}/${folder}.glb`,
      date: frontmatter.date || new Date().toISOString(),
      hasThumbnail: fs.existsSync(thumbnailPath),
      steps: steps,
      stepCount: steps.length
    }
    
    manuals.push(manual)
  }
  
  // Sort by date (newest first)
  manuals.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return manuals
}

/**
 * Get a single manual by slug
 * @param {string} slug - Manual folder name
 * @param {string} locale - Current locale for localized metadata
 * @returns {Object|null} Manual object or null if not found
 */
export async function getManual(slug, locale = 'en') {
  const manuals = await getManuals(locale)
  return manuals.find(m => m.slug === slug) || null
}

/**
 * Get a specific step from a manual
 * @param {string} manualSlug - Manual folder name
 * @param {string} stepSlug - Step filename without .md
 * @param {string} locale - Current locale
 * @returns {Object|null} Step object or null if not found
 */
export async function getManualStep(manualSlug, stepSlug, locale = 'en') {
  const manual = await getManual(manualSlug, locale)
  
  if (!manual) {
    return null
  }
  
  const step = manual.steps.find(s => s.slug === stepSlug)
  
  if (!step) {
    return null
  }
  
  return {
    ...step,
    manual: {
      slug: manual.slug,
      title: manual.title
    }
  }
}

/**
 * Get localized step content
 * @param {string} manualSlug - Manual folder name
 * @param {string} stepSlug - Step filename without .md
 * @param {string} locale - Current locale (en/fr/de)
 * @returns {Object|null} Step object with localized content or null if not found
 */
export async function getLocalizedManualStep(manualSlug, stepSlug, locale = 'en') {
  const manualPath = path.join(process.cwd(), 'public', 'manuals', manualSlug)
  const stepsDir = path.join(manualPath, 'steps')
  
  if (!fs.existsSync(stepsDir)) {
    return null
  }
  
  // Try to get localized step first
  const localizedStepFiles = {
    'fr': `${stepSlug}.fr.md`,
    'de': `${stepSlug}.de.md`
  }
  
  const localizedFile = localizedStepFiles[locale]
  let stepPath = path.join(stepsDir, `${stepSlug}.md`)
  
  if (localizedFile && fs.existsSync(path.join(stepsDir, localizedFile))) {
    stepPath = path.join(stepsDir, localizedFile)
  }
  
  if (!fs.existsSync(stepPath)) {
    return null
  }
  
  const { data, content } = matter(fs.readFileSync(stepPath, 'utf8'))
  
  return {
    slug: stepSlug,
    filename: path.basename(stepPath),
    title: data.title || stepSlug.replace(/^\d{2}-/, ''),
    content: content,
    nextStep: data.nextStep || null,
    prevStep: data.prevStep || null
  }
}
