import { readFileSync } from 'fs'
import { floor } from 'lodash'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const calc = s => floor(parseInt(s) / 3) - 2

const solve = lines => {
  let result = 0

  lines.forEach(line => {
    let local = 0
    let temp = calc(line)
    while (temp >= 0) {
      local += temp
      temp = calc(temp)
    }

    result += local
  })


  return result
}

console.log(`Result: ${solve(read('input'))}`)