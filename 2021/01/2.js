import { readInts } from '../helpers'

const calc = arr => arr.reduce((acc, curr, i) => acc + (curr > arr[i-1] ? 1 : 0), 0)
const slidingWindow = window => arr => arr.map((x, i) => arr.slice(i, i + window)).filter(x => x.length === window)
const sum = arr => arr.reduce((acc, x) => acc + x, 0)
const triplets = slidingWindow(3)

const solve = data => {
  const result = calc(triplets(data).map(sum))
  return `Result: ${result}`
}

console.log("Test", solve(readInts('./test')))
console.log("Data", solve(readInts('./data')))