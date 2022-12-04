import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const notEmpty = l => l.length
const getInts = s => s.split('-').map(i => parseInt(i))

const solve = lines => {
  return lines
    .filter(notEmpty)
    .reduce((res, cur) => {
      const [l,r] = cur.split(',')
      const [lf,lt] = getInts(l)
      const [rf, rt] = getInts(r)

      if (lf >= rf && lt <= rt || rf >= lf && rt <= lt) {
        return res + 1
      }
      return res
    }, 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)