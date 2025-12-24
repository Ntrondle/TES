import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Get localized project metadata by reading the appropriate README file
 * @param {string} projectPath - Path to project directory
 * @param {string} locale - Current locale (en/fr/de)
 * @returns {Object} Frontmatter data
 */
function getLocalizedProjectMetadata(projectPath, locale) {
  // Try to get metadata from localized README first
  const localizedReadmes = {
    'fr': 'readmeFR.md',
    'de': 'readmeDE.md'
  }
  
  const localizedFile = localizedReadmes[locale]
  if (localizedFile) {
    const localizedPath = path.join(projectPath, localizedFile)
    if (fs.existsSync(localizedPath)) {
      try {
        const content = fs.readFileSync(localizedPath, 'utf8')
        const { data } = matter(content)
        return data
      } catch (error) {
        console.error(`Error reading localized README for ${projectPath}:`, error)
      }
    }
  }
  
  // Fallback to English README.md
  const readmePath = path.join(projectPath, 'README.md')
  if (fs.existsSync(readmePath)) {
    try {
      const content = fs.readFileSync(readmePath, 'utf8')
      const { data } = matter(content)
      return data
    } catch (error) {
      console.error(`Error reading README.md for ${projectPath}:`, error)
    }
  }
  
  return {}
}

/**
 * Get all portfolio projects from public/portfolio directory
 * @param {string} locale - Current locale for localized metadata
 * @returns {Array} Array of project objects sorted by date
 */
export async function getPortfolioProjects(locale = 'en') {
  const portfolioDir = path.join(process.cwd(), 'public', 'portfolio')
  
  // Check if portfolio directory exists
  if (!fs.existsSync(portfolioDir)) {
    return []
  }
  
  // Get all directories in portfolio folder
  const folders = fs.readdirSync(portfolioDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  
  const projects = []
  
  for (const folder of folders) {
    const projectPath = path.join(portfolioDir, folder)
    const readmePath = path.join(projectPath, 'README.md')
    const thumbnailPath = path.join(projectPath, 'thumbnail.png')
    const iconPath = path.join(projectPath, 'icon.svg')
    
    // Skip if README.md doesn't exist
    if (!fs.existsSync(readmePath)) {
      continue
    }
    
    // Get localized metadata
    const frontmatter = getLocalizedProjectMetadata(projectPath, locale)
    
    // Build project object
    const project = {
      slug: folder,
      title: frontmatter.title || folder,
      description: frontmatter.description || '',
      modelFile: frontmatter.modelFile || null,
      date: frontmatter.date || new Date().toISOString(),
      hasThumbnail: fs.existsSync(thumbnailPath),
      hasIcon: fs.existsSync(iconPath),
      githubLink: frontmatter.githubLink || null,
      shopLink: frontmatter.shopLink || null,
      // Check for models directory
      modelsDir: path.join(projectPath, 'models'),
    }
    
    projects.push(project)
  }
  
  // Sort by date (newest first)
  projects.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return projects
}

/**
 * Get a single portfolio project by slug
 * @param {string} slug - Project folder name
 * @param {string} locale - Current locale for localized metadata
 * @returns {Object|null} Project object or null if not found
 */
export async function getPortfolioProject(slug, locale = 'en') {
  const projects = await getPortfolioProjects(locale)
  return projects.find(p => p.slug === slug) || null
}
