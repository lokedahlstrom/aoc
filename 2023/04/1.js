import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const numbers = s => s.match(/\d+/g).map(s => Number(s))
const power = n => n < 0 ? 0 : Math.pow(2, n)
  
const solve = lines => {
  return lines.map(l => l.substring(8).split('|'))
    .map(row => row.map(numbers))
    .map(([left, right]) => {
      const ls = new Set([...left])
      const rs = new Set([...right])

      return [...rs.intersection(ls)]
    })
    .reduce((acc, list) => acc + power(list.length - 1), 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
