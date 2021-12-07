import { readInts, sum } from '../helpers'

const mean = arr => sum(arr) / arr.length
const steps = (source, dest) => Math.abs(source - dest)
const arithmeticSum = n => n *((1 + n) / 2)

const calc = data => fn => {
  const m = fn(mean(data))
  return data.reduce((acc, n) => acc + arithmeticSum(steps(n, m)), 0)
}

const solve = data => {
  const candidate = calc(data)
  const result = Math.min(candidate(Math.floor), candidate(Math.ceil))

  return `Result: ${result}`
}

console.log("Test", solve(readInts('./test')))
console.log("Data", solve(readInts('./data')))