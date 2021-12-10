import { read } from '../helpers'

const expect = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}
 
const cost = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}
 
const open  = new Set(Object.keys(expect))
const close = new Set(Object.values(expect))

const solve = data => {
  let stack = []
  let result = 0

  data.forEach(row => {
    row.split('').some(t => {
      if (open.has(t)) {
        stack.push(t)
      } else if (close.has(t)) {
        const o = stack.pop()
        const expected = expect[o]
        if (t !== expected) {
          //console.log(`Expected ${expected}, but found ${t} instead`)
          result += cost[t]
          return true
        }
      }
    
      return false
    })
  })

  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))