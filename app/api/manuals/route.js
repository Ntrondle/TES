import { NextResponse } from 'next/server'
import { getManuals } from '../../../../lib/manuals'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'en'
  
  try {
    const manuals = await getManuals(locale)
    return NextResponse.json(manuals)
  } catch (error) {
    console.error('Error fetching manuals:', error)
    return NextResponse.json([], { status: 500 })
  }
}
