import Image from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components) {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold tracking-tight mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-neutral-800 dark:text-neutral-200">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-neutral-800 dark:text-neutral-200">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 space-y-2 text-neutral-700 dark:text-neutral-300">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="ml-6 list-disc">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900 dark:text-neutral-100">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm font-mono text-neutral-800 dark:text-neutral-200">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-x-auto">
        {children}
      </pre>
    ),
    img: ({ src, alt, ...props }) => (
      <div className="mb-6">
        <Image 
          src={src} 
          alt={alt} 
          width={800} 
          height={400} 
          className="rounded-lg w-full h-auto"
          {...props}
        />
      </div>
    ),
    a: ({ href, children }) => (
      <Link href={href} className="nav-link">
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-6 pl-4 border-l-4 border-neutral-300 dark:border-neutral-600 italic text-neutral-600 dark:text-neutral-400">
        {children}
      </blockquote>
    ),
    ...components,
  }
}