import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const intersection = (l, r) => [...new Set(l.filter(x => r.includes(x)))]
const isLowerCase = s => s.toLowerCase() && s != s.toUpperCase()
const getPriority = c =>  c.charCodeAt(0) - (isLowerCase(c) ? 96 : 38)
const sumPriorities = a => a.reduce((acc, cur) => acc + getPriority(cur), 0)

const solve = lines => {
  let result = 0

  lines.forEach(l => {
    const midPoint = l.length / 2
    
    const first  = l.slice(0, midPoint)
    const second = l.slice(-midPoint)

    const inBoth = intersection([...first], [...second])
    
    result += sumPriorities(inBoth)
  })

  return result
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)