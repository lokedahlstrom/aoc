import { read } from '../helpers'

const first = v => v[0]

const get = (matrix, rows, rowLength) => (x,y) => {
  if (y < 0 || y >= rows)
    return 99999
  if (x < 0 || x >= rowLength)
    return 99999
  return matrix[y][x]
}

const isLowest = (matrix, rows, rowLength) => (x, y) => {
  const mget = get(matrix, rows, rowLength)

  const P = mget(x, y)
  const N = mget(x, y-1)
  const W = mget(x-1, y)
  const E = mget(x+1, y)
  const S = mget(x, y+1)

  return P < Math.min(N, W, E, S)
}

const solve = data => {
  const matrix = data.map(row => row.split('').map(s => parseInt(s)))
  
  const rows = data.length
  const rowLength = first(data).length

  const mLowest = isLowest(matrix, rows, rowLength)

  let lowest = []
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < rowLength; ++c) {
       if (mLowest(c, r))
         lowest.push(matrix[r][c])
    }
  }

  const result = lowest.reduce((acc, n) => acc + n + 1, 0)
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))