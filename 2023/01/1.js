import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const isDigit = c => c >= '0' && c <= '9'
const digits = s => s.split('').filter(isDigit)
const first = v => v.at(0)
const last = v => v.at(-1)

const solve = lines => {
  return lines.reduce((acc, l) => {
    const d = digits(l)
    const num = Number(first(d) + last(d))
     
    return acc += isNaN(num) ? 0 : num
  }, 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
