import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = lines => {
  let idx = 0
  const elfCaloriesInventories = lines.reduce((res, cur) => {
    if (!cur) {
      idx++
      res.push([])
    } else {
      res[idx].push(parseInt(cur))
    }

    return res
  }, [[]])

  const sum = arr => arr.reduce((acc, cur) => acc + cur, 0)
  const sumParts = elfCaloriesInventories.map(sum)

  return Math.max(...sumParts)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)