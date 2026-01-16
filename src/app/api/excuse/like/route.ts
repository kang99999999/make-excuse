import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'

export async function POST(req: Request) {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'No id' }, { status: 400 })
  }

  try {
    const updated = await sanityClient
      .patch(id)
      .inc({ likes: 1 })
      .commit()

    return NextResponse.json({ success: true, likes: updated.likes })
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to like' },
      { status: 500 }
    )
  }
}
