import { NextResponse } from 'next/server'
import { sanity } from '@/lib/sanity'

export async function POST(req: Request) {
  const { target, situation, tone } = await req.json()

  const query = `
    *[_type=="excuse"
      && target==$target
      && situation==$situation
      && tone==$tone
      && isActive==true
    ]{
      _id,
      text,
      likes
    }
  `

  const list = await sanity.fetch(query, { target, situation, tone })

  if (!list.length) {
    return NextResponse.json(null)
  }

  const random = list[Math.floor(Math.random() * list.length)]
  return NextResponse.json(random)
}
