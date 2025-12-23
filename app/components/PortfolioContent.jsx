import React from 'react'
import remarkGfm from 'remark-gfm'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * PortfolioContent Component
 * 
 * Reads a README.md file and renders it with GitHub-style formatting
 * Supports: headers, lists, tables, code blocks, images
 */
export default async function PortfolioContent({ readmePath, locale = 'en' }) {
  const fullPath = path.join(process.cwd(), readmePath)
  
  let readmeContent = ''
  try {
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    // Strip frontmatter using gray-matter
    const { content } = matter(fileContent)
    readmeContent = content
  } catch (error) {
    return (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="p-6 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
          <h3 className="text-red-900 dark:text-red-100 text-lg font-bold mb-2">
            README Not Found
          </h3>
          <p className="text-red-800 dark:text-red-200">
            Could not find README.md at: {readmePath}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none mt-8">
      <MDXRemote
        source={readmeContent}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
        components={{
          // Style headings with website fonts
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 mt-8">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 mt-6">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 mt-4">
              {children}
            </h4>
          ),
          // Style paragraphs
          p: ({ children }) => (
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
              {children}
            </p>
          ),
          // Style lists
          ul: ({ children }) => (
            <ul className="mb-6 space-y-2 list-disc pl-6">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="text-neutral-700 dark:text-neutral-300">
              {children}
            </li>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 space-y-2 list-decimal pl-6">
              {children}
            </ol>
          ),
          // Style tables
          table: ({ children }) => (
            <div className="mb-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-neutral-200 dark:border-neutral-800">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left border border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-900 dark:text-white">
              {children}
            </th>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {children}
            </tbody>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
              {children}
            </td>
          ),
          // Style code blocks
          pre: ({ children }) => (
            <pre className="mb-4 p-4 rounded-lg bg-neutral-900 dark:bg-neutral-800 overflow-x-auto">
              {children}
            </pre>
          ),
          code: ({ children }) => (
            <code className="text-sm">
              {children}
            </code>
          ),
          // Style inline code
          inlineCode: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white">
              {children}
            </code>
          ),
          // Style links
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-[#0891b2] hover:text-[#0ea5e9] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          // Style blockquotes
          blockquote: ({ children }) => (
            <blockquote className="pl-4 border-l-4 border-[#0891b2] italic text-neutral-600 dark:text-neutral-400 my-4">
              {children}
            </blockquote>
          ),
          // Style horizontal rules
          hr: () => (
            <hr className="my-8 border-neutral-300 dark:border-neutral-700" />
          ),
          // Style images
          img: ({ src, alt }) => {
            let webPath = src
            
            // Handle relative paths (./images/ or images/)
            if (src.startsWith('./images/') || src.startsWith('images/')) {
              // Extract project folder from readme path
              const pathParts = readmePath.split('/')
              const projectFolder = pathParts[pathParts.length - 2]
              const imageName = src.replace(/^\.?\/images\//, '')
              webPath = `/TES/portfolio/${projectFolder}/images/${imageName}`
            }
            
            return (
              <img 
                src={webPath} 
                alt={alt || ''} 
                className="rounded-lg shadow-md max-w-full h-auto my-6"
              />
            )
          },
        }}
      />
    </div>
  )
}
