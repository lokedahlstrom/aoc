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

const p2s = v => JSON.stringify(v)
const has = (s, v) => s.has(p2s(v))

// out of bounds check
const oob = (rows, rowLength) => (x, y) => {
  if (y < 0 || y >= rows)
    return true
  if (x < 0 || x >= rowLength)
    return true
  return false
}

const visit = (matrix, visited, basin, moob) => (x, y) => {
  const isVisited = has(visited, [x,y])
  if (moob(x, y) || isVisited) {
    return
  }

  visited.add(p2s([x,y]))
  const v = matrix[y][x]
  if (v === 9)
    return
  
  basin.add(p2s([x,y]))

  visit(matrix, visited, basin, moob)(x, y-1)
  visit(matrix, visited, basin, moob)(x-1, y)
  visit(matrix, visited, basin, moob)(x+1, y)
  visit(matrix, visited, basin, moob)(x, y+1)
}

const solve = data => {
  const matrix = data.map(row => row.split('').map(s => parseInt(s)))
  
  const rows = data.length
  const rowLength = first(data).length

  const mLowest = isLowest(matrix, rows, rowLength)
  const moob = oob(rows, rowLength)

  let basins = []
  
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < rowLength; ++c) {
      if (mLowest(c, r)) {
        let visited = new Set()
        let basin = new Set()
        visit(matrix, visited, basin, moob)(c,r)
        basins.push(basin)
      }
    }
  }

  basins.sort((l, r) => r.size - l.size)
  const result = basins.slice(0, 3).reduce((acc, b) => acc * b.size, 1)
  
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))