import { readFileSync } from 'fs'

const read = file => readFileSync(file).toString('utf-8')

const hash = s => {
  return s.split('').reduce((acc, c) => {
    acc += c.charCodeAt(0)
    acc *= 17
    acc %= 256
    return acc
  }, 0)
}

const solve = line => {
  return line.split(',').reduce((acc, s) => acc + hash(s), 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
