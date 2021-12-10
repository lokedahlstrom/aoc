import { read } from '../helpers'

const expect = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}
 
const cost = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4
}
 
const open  = new Set(Object.keys(expect))
const close = new Set(Object.values(expect))

const solve = data => {
  let result = 0 
  let scores = []

  data.forEach(row => {
    let stack = []
    const error = row.split('').some(t => {
      if (open.has(t)) {
        stack.push(t)
      } else if (close.has(t)) {
        const o = stack.pop()
        const expected = expect[o]
        if (t !== expected) {
          return true
        }
      }
    
      return false
    })

    if (!error) {
      stack.reverse()
      scores.push(stack.reduce((acc, x) => acc * 5 + cost[x] , 0))
    }
  })

  scores.sort((a, b) => a - b)
  const mid = Math.floor(scores.length / 2)
  result = scores[mid]

  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))