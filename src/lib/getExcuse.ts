import { sanity } from './sanity'

export async function getRandomExcuse(
  target: string,
  situation: string,
  tone: string
) {
  const res = await fetch('/api/excuse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ target, situation, tone }),
  })

  return res.json()
}
