import { read } from '../helpers'

const first = v => v[0]
const p2s = v => JSON.stringify(v)
const set = {
  has: (s, v) => s.has(p2s(v)),
  add: (s, p) => s.add(p2s(p))
}

const solve = data => {
  const matrix = data.map(row => row.split('').map(s => parseInt(s)))
  const rows = data.length
  const rowLength = first(data).length
  const MAX = 9

  let basins = []
  let visited = new Set()

  const get = (x, y) => {
    if (y < 0 || y >= rows)
      return MAX
    if (x < 0 || x >= rowLength)
      return MAX
    return matrix[y][x]
  }
  
  const isLowest = (x, y) => {
    const P = get(x, y)
    const N = get(x, y-1)
    const W = get(x-1, y)
    const E = get(x+1, y)
    const S = get(x, y+1)
  
    return P < Math.min(N, W, E, S)
  }
  
  // out of bounds check
  const oob = (x, y) => {
    if (y < 0 || y >= rows)
      return true
    if (x < 0 || x >= rowLength)
      return true
    return false
  }
  
  const expandBasin = (basin, x, y) => {
    if (oob(x, y) || set.has(visited, [x,y]))
      return
  
    set.add(visited, [x,y])
    const v = matrix[y][x]
    if (v === MAX)
      return
    
    set.add(basin, [x,y])

    expandBasin(basin, x, y-1) // N
    expandBasin(basin, x-1, y) // W
    expandBasin(basin, x+1, y) // E
    expandBasin(basin, x, y+1) // S
  }
  
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < rowLength; ++c) {
      if (isLowest(c, r)) {
        let basin = new Set()
        expandBasin(basin, c, r)
        basins.push(basin)
      }
    }
  }

  basins.sort((l, r) => r.size - l.size) // sort largest to lowest
  const result = basins.slice(0, 3).reduce((acc, b) => acc * b.size, 1)
  
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))