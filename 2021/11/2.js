import { read } from '../helpers'

const ROWS = 10
const LENGTH = 10

const p2s = v => JSON.stringify(v)
const set = {
  has: (s, v) => s.has(p2s(v)),
  add: (s, p) => s.add(p2s(p))
}
let visited = new Set()

const splitInt = s => s.split('').map(d => parseInt(d))
const inc = m => m.forEach((r, y) => r.forEach((c, x) => incAround(m, x, y)))

const incCell = (matrix, x, y) => matrix[y][x] = matrix[y][x] + 1

// out of bounds check
const oob = (x, y) => {
  if (y < 0 || y >= ROWS)
    return true
  if (x < 0 || x >= LENGTH)
    return true
  return false
}

const incAround = (m, x, y) => {
  if (oob(x, y) || set.has(visited, [x,y]))
    return 

  incCell(m, x, y)
  const c = m[y][x]
  if (c > 9) {
    set.add(visited, [x,y])
    incAround(m, x,   y-1) // N
    incAround(m, x-1, y-1) // NW
    incAround(m, x-1,   y) // W
    incAround(m, x-1, y+1) // SW
    incAround(m, x,   y+1) // S
    incAround(m, x+1, y+1) // SE
    incAround(m, x+1,   y) // E
    incAround(m, x+1, y-1) // NE
  }
}

const calcFlashed = m => {
  // calc how many are > 9 and reset them
  let flashed = 0
  m.forEach((r, y) => {
    r.forEach((c, x) => {
      if (c > 9) {
        flashed += 1
        m[y][x] = 0
      }
    })
  })
  return flashed
}

const solve = data => {
  let flashed = 0
  let round = 0
  
  while (flashed < 100) {
    visited = new Set()
    inc(data)
    flashed = calcFlashed(data)
    ++round
  }

  const result = round
  return `Result: ${result}`
}

console.log("Test", solve(read('./test').map(splitInt)))
console.log("Data", solve(read('./data').map(splitInt)))