import React from 'react'

export default function WarningCallout({ children, type = 'warning' }) {
  const icons = {
    warning: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    danger: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }

  const colors = {
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-l-4 border-amber-500',
      icon: 'text-amber-500',
      text: 'text-amber-900 dark:text-amber-100'
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-l-4 border-red-500',
      icon: 'text-red-500',
      text: 'text-red-900 dark:text-red-100'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-l-4 border-blue-500',
      icon: 'text-blue-500',
      text: 'text-blue-900 dark:text-blue-100'
    }
  }

  const style = colors[type] || colors.warning
  const Icon = icons[type] || icons.warning

  return (
    <div className={`my-6 p-4 rounded-lg ${style.bg} ${style.border} ${style.text}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${style.icon}`}>
          {Icon}
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}