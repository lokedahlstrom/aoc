import { readFileSync } from 'fs'
import { chunk, isArray, isInteger } from 'lodash'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const nonEmpty = l => l && l.length
const sum = a => a.reduce((acc, x) => acc + x, 0)

const compare = (left, right) => {
  const longest = Math.max(left.length, right.length)

  for (let i = 0; i < longest; i++) {
    const l = left[i]
    const r = right[i]

    if (isInteger(l) && isInteger(r)) {
      if (l < r) return -1
      if (l > r) return 1
    } else if (isArray(l) && isArray(r)) {
      const test = compare(l, r)
      if (test !== 0) return test
    } else if (l && isArray(r)) {
      const test = compare([l], r)
      if (test !== 0) return test
    } else if (isArray(l) && r) {
      const test = compare(l, [r])
      if (test !== 0) return test
    } else if (!l && r) {
      return -1
    } else if (l && !r) {
      return 1
    }
  }

  // finally, we can return 0
  return 0
}

const solve = lines => {
  let rights = []
  chunk(lines.filter(nonEmpty), 2).forEach((pair, i) => {
    const [l, r] = pair
    if (1 !== compare(JSON.parse(l), JSON.parse(r))) {
      rights.push(i+1)
    }
  })

  return sum(rights)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)