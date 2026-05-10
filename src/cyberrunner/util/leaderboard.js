const KEY = 'cyberrunner.lb'
const MAX_ENTRIES = 10
const MAX_NAME_LEN = 12

export function getLeaderboard() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    return arr
      .filter((e) => e && typeof e.name === 'string' && typeof e.score === 'number')
      .map((e) => ({ name: e.name, score: e.score, ts: e.ts || 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES)
  } catch {
    return []
  }
}

export function qualifies(score) {
  if (score <= 0) return false
  const lb = getLeaderboard()
  if (lb.length < MAX_ENTRIES) return true
  return score > lb[lb.length - 1].score
}

export function submitScore(name, score) {
  const clean = sanitizeName(name)
  if (!clean || score <= 0) return null
  const entry = { name: clean, score: Math.floor(score), ts: Date.now() }
  const lb = getLeaderboard()
  lb.push(entry)
  lb.sort((a, b) => b.score - a.score || b.ts - a.ts)
  const trimmed = lb.slice(0, MAX_ENTRIES)
  try {
    localStorage.setItem(KEY, JSON.stringify(trimmed))
  } catch {
    return null
  }
  return entry
}

export function sanitizeName(name) {
  return String(name || '')
    .toUpperCase()
    .replace(/[^A-Z0-9 _-]/g, '')
    .trim()
    .slice(0, MAX_NAME_LEN) || null
}

export const NAME_MAX = MAX_NAME_LEN
