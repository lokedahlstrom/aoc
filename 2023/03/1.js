import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const split = s => s.split('')
const range = n => [...Array(n).keys()]
const first = a => a.at(0)
const isDot = c => c === '.'
const isDigit = c => c >= '0' && c <= '9'
const isSymbol = c => !isDigit(c) && !isDot(c)

const get = (matrix, y, x) => {
  const row = matrix.at(y)
  if (!row) return '.'
  return row.at(x) || '.'
}

const symbolAround = matrix => (y, x) => {
  const around = [
    [y-1, x], [y-1, x-1], [y-1, x+1], // above
    [y, x-1], [y, x+1],               // same row
    [y+1, x], [y+1, x-1], [y+1, x+1]  // below
  ]
  return around.some(([y, x]) => isSymbol(get(matrix, y, x)))
}

const numbersAdjacentToSymbol = (row, y, filter) => {
  const res = []
  const re = /(\d+)/g
  let match = null
  while ((match = re.exec(row.join(''))) != null) {
    const num = first(match)
    if (range(num.length).some((_, i) => filter(y, match.index + i)))
      res.push(Number(num))
  }

  return res
}

const solve = lines => {
  const matrix = lines.map(split)
  const matrixSymbolAround = symbolAround(matrix)

  const numbers = matrix
    .map((row, y) => numbersAdjacentToSymbol(row, y, matrixSymbolAround))
    .flat()

  return numbers.reduce((acc, num) => acc + num, 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
