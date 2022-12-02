import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('')
}

const solve = data => {
  let floor = 0

  data.forEach(c => floor += (c === '(' ? 1 : -1))

  return floor
}

console.log(`Result: ${solve(read('input'))}`)
