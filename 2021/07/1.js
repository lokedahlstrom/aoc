import { readInts, ints, range, sum, int_sort } from '../helpers'

const median = arr => {
  const local = int_sort(arr)
  const mid = local.length / 2
  if (local.length % 2 !== 0) {
    return local[mid]
  }  

  return (local[mid - 1] + local[mid]) / 2
}

const steps = (source, dest) => Math.abs(source - dest)

const solve = data => {
  const m = median(data)
  const result = data.reduce((acc, d) => acc + steps(d, m), 0)

  return `Result: ${result}`
}

console.log("Test", solve(readInts('./test')))
console.log("Data", solve(readInts('./data')))