import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'

export async function POST(req: Request) {
  try {
    console.log('🔥 LIKE API HIT')

    const { id } = await req.json()
    console.log('👉 ID:', id)

    const updated = await sanityClient
      .patch(id)
      .inc({ likes: 1 })
      .commit()

    console.log('✅ UPDATED:', updated)

    return NextResponse.json(updated)
  } catch (e: any) {
    console.error('❌ LIKE ERROR:', e)
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    )
  }
}
