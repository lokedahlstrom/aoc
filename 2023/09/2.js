import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const toNumber = s => Number(s)
const getNumbers = s => s.match(/\-?\d+/g).map(toNumber)
const isZero = d => d === 0
const realValue = d => d !== undefined

const extrapolate = arr => {
  let seq = [[...arr]]
  let idx = -1
  while (true) {
    const row = seq[++idx]
    const next = row.map((d, i) => {
      const e = row[i+1]
      if (i < row.length - 1)
        return e - d
    })
    const newRow = next.filter(realValue)
    seq.push(newRow)
    if (newRow.every(isZero)) {
      break
    }
  }

  seq.reverse()
  for (let i = 0; i < seq.length-1; ++i) {
    const row = seq[i]
    const newValue = seq[i+1][0] - row[0]
    seq[i+1] = [newValue, ...seq[i+1]]
  }
  
  seq.reverse()
  return seq[0][0]
}

const solve = input => {
  return input.reduce((sum, line) => sum + extrapolate(getNumbers(line)), 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
