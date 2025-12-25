'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import TerminalBlock from './TerminalBlock'
import Model3DAnnotation from './3dModelAnnotation'

export default function StepContent({ content, modelPath, t }) {
  // Custom components for markdown rendering
  const components = {
    // Handle div elements for 3D model
    div: ({ node, className, ...props }) => {
      // Check if this is a 3D model container
      if (className === 'manual-3d-container' && props['data-model']) {
        return (
          <Model3DAnnotation 
            model={props['data-model']}
            annotations={props['data-annotations']}
            cameraPosition={props['data-camera']}
          />
        )
      }
      // Return default div for other cases
      return <div className={className} {...props} />
    },
    
    // Custom 3d-model component (kept for compatibility)
    '3d-model': ({ node, ...props }) => {
      return <Model3DAnnotation {...props} />
    },
    
    // Custom terminal component
    terminal: ({ node, ...props }) => {
      return <TerminalBlock {...props} t={t} />
    },
    
    // Override code blocks (not terminal) for syntax highlighting
    code: ({ node, inline, className, children, ...props }) => {
      // Check if this should be inline based on parent or content
      const isInline = inline || (
        React.Children.toArray(children).length === 1 &&
        typeof React.Children.toArray(children)[0] === 'string' &&
        !React.Children.toArray(children)[0].includes('\n')
      )
      
      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-mono">
            {children}
          </code>
        )
      }
      
      // Block code - return pre directly without div wrapper to avoid HTML validation issues
      return (
        <pre className="my-4 p-4 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 overflow-x-auto">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      )
    },
    
    // Override headings
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">
        {children}
      </h1>
    ),
    
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mt-6 mb-3">
        {children}
      </h2>
    ),
    
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-neutral-900 dark:text-white mt-4 mb-2">
        {children}
      </h3>
    ),
    
    // Override paragraphs - avoid wrapping block-level elements
    p: ({ children }) => {
      // Check if children contain block-level elements (div, pre, terminal, 3d-model)
      const hasBlockChildren = React.Children.toArray(children).some(child => {
        if (React.isValidElement(child)) {
          const type = child.type
          if (typeof type === 'string') {
            return type === 'div' || type === 'pre'
          }
          // Check for custom component names
          const componentName = type?.displayName || type?.name || ''
          return componentName === 'TerminalBlock' || componentName === 'Model3DAnnotation'
        }
        return false
      })

      // If contains block elements, render as div instead of p
      if (hasBlockChildren) {
        return (
          <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed my-3">
            {children}
          </div>
        )
      }

      return (
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed my-3">
          {children}
        </p>
      )
    },
    
    // Override lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 my-3 space-y-1">
        {children}
      </ul>
    ),
    
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-neutral-700 dark:text-neutral-300 my-3 space-y-1">
        {children}
      </ol>
    ),
    
    li: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    
    // Override links
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </a>
    ),
    
    // Override blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-neutral-500 pl-4 italic text-neutral-600 dark:text-neutral-400 my-4">
        {children}
      </blockquote>
    ),
    
    // Override strong/bold
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900 dark:text-white">
        {children}
      </strong>
    ),
    
    // Override em/italic
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
  }

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}