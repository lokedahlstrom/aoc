import { readFileSync } from 'fs'
import { sortBy } from 'lodash'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = lines => {
  let result = 0
  lines.forEach(line => {
    const [a, b, c] = sortBy(line.match(/\d+/g).map(x => parseInt(x)))
    result += 2*a + 2*b + a*b*c
  })

  return result
}

console.log(`Result: ${solve(read('input'))}`)