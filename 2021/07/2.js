import { readInts, sum } from '../helpers'

const mean = arr => sum(arr) / arr.length
const steps = (source, dest) => Math.abs(source - dest)
const arithmeticSum = n => n *((1 + n) / 2)

const solve = data => {
  const m = Math.floor(mean(data))
  const result = data.reduce((acc, n) => acc + arithmeticSum(steps(n, m)), 0)

  return `Result: ${result}`
}

console.log("Test", solve(readInts('./test')))
console.log("Data", solve(readInts('./data')))