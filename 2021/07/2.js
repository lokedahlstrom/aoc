import { read, ints, range, sum } from '../helpers'

const mean = arr => sum(arr) / arr.length
const steps = (source, dest) => Math.abs(source - dest)
const arithmeticSum = n => n *((1 + n) / 2)

const solve = data => {
  const m = mean(data)
  const result = data.reduce((acc, n) => acc + arithmeticSum(steps(d, m)), 0)

  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))