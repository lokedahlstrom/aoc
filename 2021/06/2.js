import { read, ints, range, sum } from '../helpers'

const solve = data => {
  const pool = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  // set the frequency of each generation
  ints(data).flat().forEach(gen => {
    pool[gen] += 1
  })

  const days = 256
  range(days).forEach(d => {
    const atZero = pool[0]
    
    pool[0] = pool[1]
    pool[1] = pool[2]
    pool[2] = pool[3]
    pool[3] = pool[4]
    pool[4] = pool[5]
    pool[5] = pool[6] 
    pool[6] = pool[7] + atZero
    pool[7] = pool[8]
    pool[8] = atZero
  })

  const result = sum(pool)
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))
