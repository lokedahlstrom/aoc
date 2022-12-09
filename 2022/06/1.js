import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = lines => {
  const window = 4
  let result = []

  lines.forEach(line => {
    line.split('').some((_, i) => {
      let part = line.slice(i, i + window)
      if (part.length === window) {
        const letters = new Set(part)
        if (letters.size === window) {
          result.push(i + window)
          return true
        }
      }
    })
  })
  
  return result
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)