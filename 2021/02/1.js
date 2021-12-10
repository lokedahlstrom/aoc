import { read } from '../helpers'

const split = data => data.split(" ")

const solve = data => {
  let horizontal = 0
  let depth = 0

  const execute = cmd => {
    const [direction, samount] = cmd
    const amount = parseInt(samount)
   
    switch (direction) {
      case 'forward':
        horizontal += amount
        break
      case 'up':
        depth -= amount
        break
      case 'down':     
        depth += amount
        break
      default:
       break
    }
  }

  data.map(split).forEach(execute)

  const result = horizontal * depth
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))