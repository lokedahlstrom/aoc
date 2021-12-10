import { readInts } from '../helpers'

const solve = data => {
  const result = data.reduce((acc, curr, i) => acc + (curr > data[i-1] ? 1 : 0), 0)
  return `Result: ${result}`
}

console.log("Test", solve(readInts('./test')))
console.log("Data", solve(readInts('./data')))