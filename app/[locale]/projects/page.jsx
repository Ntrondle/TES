'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProjectsPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to portfolio page since projects is redundant
    router.replace('/portfolio')
  }, [router])
  
  return null
}
