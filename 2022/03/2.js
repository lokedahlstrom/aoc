import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const intersection = arr => [...new Set(arr.reduce((acc, cur) => acc.filter(x => cur.includes(x))))]
const isLowerCase = s => s.toLowerCase() && s != s.toUpperCase()
const getPriority = c =>  c.charCodeAt(0) - (isLowerCase(c) ? 96 : 38)
const sumPriorities = a => a.reduce((acc, cur) => acc + getPriority(cur), 0)

const solve = lines => {
  let result = 0

  for (let i = 0; i < lines.length; i += 3) {
    const triplet = lines.slice(i, i + 3)
    
    if (triplet.length === 3) {
      const a = [...triplet[0]]
      const b = [...triplet[1]]
      const c = [...triplet[2]]
      const d = intersection([a, b, c])

      result += sumPriorities(d)
    }
  }

  return result
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)