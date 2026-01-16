const KEY = 'likedExcuses'

export function hasLiked(id: string): boolean {
  if (typeof window === 'undefined') return false
  const list = JSON.parse(localStorage.getItem(KEY) || '[]')
  return list.includes(id)
}

export function markLiked(id: string) {
  const list = JSON.parse(localStorage.getItem(KEY) || '[]')
  localStorage.setItem(KEY, JSON.stringify([...list, id]))
}
