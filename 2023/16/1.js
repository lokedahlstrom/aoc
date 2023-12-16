import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const toMatrix = lines => lines.map(l => l.split(''))
const print = m => m.forEach(r => console.log(r.join('')))
const values = d => Object.values(d)
const sum = a => a.reduce((acc, v) => acc + v, 0)

const E = [ 0,  1]
const W = [ 0, -1]
const N = [-1,  0]
const S = [ 1,  0]

const isDir = (dir, compass) => dir == compass
const isE = dir => isDir(dir, E)
const isW = dir => isDir(dir, W)
const isN = dir => isDir(dir, N)
const isS = dir => isDir(dir, S)

const get = (matrix, y, x) => {
  const row = matrix.at(y)
  if (!row) return undefined
  return row.at(x) || undefined
}

const nextCell = (y, x, dir) => [y + dir[0], x + dir[1]]

const nextDir = (dir, nextCell) => {
  switch (nextCell) {
    case '|':
      if (isE(dir) || isW(dir))
        return [N, S]
      return [dir]
    case '-':
      if (isS(dir) || isN(dir))
        return [W, E]
      return [dir]
    case '/':
      if (isE(dir))
        return [N]
      if (isW(dir))
        return [S]
      if (isS(dir))
        return [W]
      if (isN(dir))
        return [E]
    case '\\':
      if (isE(dir))
        return [S]
      if (isW(dir))
        return [N]
      if (isS(dir))
        return [E]
      if (isN(dir))
        return [W]

    default: return [dir]
  }
}
const getKey = (y, x) => '' + y + '|' + x
const isVisited = (d, y, x) => getKey(y, x) in d
const visit = (d, y, x) => d[getKey(y, x)] = true

const beam = (matrix, visited, y, x, dir) => {
  const c = get(matrix, y, x)

  if (isVisited(visited, y, x) || c === undefined) {
    return
  }
  
  const ndir = nextDir(dir, c)
  ndir.forEach(d => {
    const [ny, nx] = nextCell(y, x, d)
    if (ny < 0 || ny >= matrix.length || x < 0 || x >= matrix[0].length) {
      visit(visited, y, x)
      return
    }
    beam(matrix, visited, ny, nx, d)
    visit(visited, y, x)
  })
}

const solve = lines => {
  const matrix = toMatrix(lines)
  // print(matrix)

  const energized = {}
  visit(energized, 0, 0)
  const [y, x] = nextCell(0, 0, E)
  beam(matrix, energized, y, x, E)

  // console.log(energized)

  matrix.forEach((r, y) => {
    let l = ''
    r.forEach((c, x) => {
      if (isVisited(energized, y, x))
        l += '#'
      else
        l += c
    })
    console.log(l)
  })

  return sum(values(energized))
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
