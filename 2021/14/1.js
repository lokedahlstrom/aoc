import { read, first, last } from '../helpers'

const max = v => v.reduce((acc, x) => {
  return Math.max(x, acc)
}, 0)

const min = (v, max) => v.reduce((acc, x) => {
  return Math.min(x, acc)
}, max)

const solve = data => {
  const template = first(data)
  const insertionPairs = data.slice(2).map(line => line.split(' -> '))
  const projection = {}

  insertionPairs.forEach(p => {
    projection[first(p)] = last(p)
  })

  let value = ''
  
  const steps = 10
  value = template
  for (let i = 0; i < steps; ++i) {
    let temp = ''
    for (let i = 0; i < value.length - 1 ; ++i) {
      const pair = value.slice(i, i+2)
      const prod = projection[pair]
      temp += (i < 1 ? first(pair) : '') + prod + last(pair)
    }
    value = temp
  }

  const charFrequency = {}
  value.split('').forEach(c => {
    let cur = charFrequency[c] || 0
    charFrequency[c] = cur + 1
  })

  const most = max(Object.values(charFrequency))
  const least = min(Object.values(charFrequency), most)

  const result = most - least
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))