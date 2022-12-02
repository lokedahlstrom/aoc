import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('')
}

const solve = data => {
  let floor = 0
  let result = 0

  data.some(c => {
    floor += (c === '(' ? 1 : -1)
    result++
    return floor === -1
  })

  return result
}

console.log(`Result: ${solve(read('input'))}`)
