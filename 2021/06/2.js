import { read, ints, range, sum } from '../helpers'

const solve = data => {
  const pool = Array(9).fill(0)

  // set the frequency of each generation
  ints(data).flat().forEach(gen => {
    pool[gen] += 1
  })

  const days = 256
  range(days).forEach(d => {
    const add = pool[0]

    for (let i = 0; i < pool.length - 1; ++i) {
      pool[i] = pool[i + 1]
    }

    pool[6] += add
    pool[8] = add
  })

  const result = sum(pool)
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))
