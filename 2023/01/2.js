import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const isDigit = c => c >= '0' && c <= '9'
const first = v => v.at(0)
const last = v => v.at(-1)
const range = n => [...Array(n).keys()]

const names = [ 
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 
  '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

const translate = s => {
  const c = s.at(0)
  if (isDigit(c))
    return c
  return names[names.indexOf(s) + 9]
}

const digits = s => range(s.length)
  .reduce((acc, index) => [
    ...acc, 
    names
      .filter(n => s.substring(index, index + n.length) === n)
      .map(translate)]
  , [])
  .flat()

const solve = lines => {  
  return lines.reduce((acc, l) => {
    const d = digits(l)
    const num = Number(first(d) + last(d))
     
    return acc += isNaN(num) ? 0 : num
  }, 0)
}

console.log(`Result: ${solve(read('test2'))}`)
console.log(`Result: ${solve(read('input'))}`)
