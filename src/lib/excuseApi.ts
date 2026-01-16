export async function likeExcuse(id: string) {
  const res = await fetch('/api/excuse/like', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  return res.json()
}

export async function getRanking() {
  const res = await fetch('/api/excuse/ranking')
  return res.json()
}
