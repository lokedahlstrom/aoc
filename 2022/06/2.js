import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = lines => {
  const window = 14

  lines.forEach(line => {
    line.split('').some((_, i) => {
      let part = line.slice(i, i + window)
      if (part.length === window) {
        const letters = new Set(part)
        if (letters.size === window) {
          console.log(i + window)
          return true
        }
      }
    })
  })
  
  return 0
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)