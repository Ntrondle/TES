import Link from 'next/link'

export default function Breadcrumb({ items }) {
  return (
    <nav className="mb-6 text-sm text-neutral-500 dark:text-neutral-400 flex gap-1 flex-wrap">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1">
          {item.href ? (
            <Link href={item.href} className="hover:text-neutral-700 dark:hover:text-neutral-200">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {idx < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  )
}
