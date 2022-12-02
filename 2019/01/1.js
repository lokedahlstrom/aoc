import { readFileSync } from 'fs'
import { floor } from 'lodash'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = lines => {
  let result = 0


  lines.forEach(line => {
    const temp = floor(parseInt(line) / 3) - 2
    result += temp
  })


  return result
}

console.log(`Result: ${solve(['12', '14', '1969', '100756'])}`)
console.log(`Result: ${solve(read('input'))}`)