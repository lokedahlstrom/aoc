import { readFileSync } from 'fs'
import { indexOf, isArray, isInteger } from 'lodash'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

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
  const two = [[2]]
  const six = [[6]]

  let filtered = lines.filter(w => w.length).map(s => JSON.parse(s))
  filtered.push(two, six)
 
  const sorted = filtered.sort(compare);

  const idxTwo = indexOf(sorted, two) + 1
  const idxSix = indexOf(sorted, six) + 1

  return idxTwo * idxSix
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)