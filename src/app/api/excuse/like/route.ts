import { NextResponse } from 'next/server'
import { sanity } from '@/lib/sanity'

export async function POST(req: Request) {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 })
  }

  const result = await sanity
    .patch(id)
    .inc({ likes: 1 })
    .commit()

  return NextResponse.json({ likes: result.likes })
}
