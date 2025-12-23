import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Get all portfolio projects from public/portfolio directory
 * @returns {Array} Array of project objects sorted by date
 */
export async function getPortfolioProjects() {
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
    
    // Read and parse README.md with frontmatter
    const readmeContent = fs.readFileSync(readmePath, 'utf8')
    const { data: frontmatter } = matter(readmeContent)
    
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
 * @returns {Object|null} Project object or null if not found
 */
export async function getPortfolioProject(slug) {
  const projects = await getPortfolioProjects()
  return projects.find(p => p.slug === slug) || null
}
