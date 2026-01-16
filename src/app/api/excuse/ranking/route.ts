import { NextResponse } from 'next/server'
import { sanity } from '@/lib/sanity'

export async function GET() {
  const query = `
    *[_type=="excuse" && isActive==true]
    | order(likes desc)[0...5]{
      _id,
      text,
      likes
    }
  `

  const list = await sanity.fetch(query)
  return NextResponse.json(list)
}
