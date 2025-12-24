'use client'

export default function ThemeAwareLogo({ type, className = 'w-5 h-5' }) {
  // Determine which SVGs to use based on type
  let lightSrc, darkSrc
  if (type === 'github') {
    lightSrc = '/TES/github.svg'
    darkSrc = '/TES/github-white.svg'
  } else if (type === 'tes-shop') {
    lightSrc = '/TES/tes-shop-white.svg'
    darkSrc = '/TES/tes-shop.svg'
  } else {
    console.error(`Invalid logo type: ${type}`)
    return null
  }

  return (
    <>
      {/* Light mode logo - hidden in dark mode */}
      <img 
        src={lightSrc} 
        alt={type}
        className={`${className} dark:hidden`}
      />
      {/* Dark mode logo - hidden in light mode */}
      <img 
        src={darkSrc} 
        alt={type}
        className={`${className} hidden dark:block`}
      />
    </>
  )
}
