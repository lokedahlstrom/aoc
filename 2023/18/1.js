import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const getKey = ([y, x]) => '' + y + '|' + x
const range = n => [...Array(n).keys()]

const L = [ 0, -1]
const R = [ 0,  1]
const D = [ 1,  0]
const U = [-1,  0]

const getDir = c => c === 'L' ? L : c === 'R' ? R : c === 'D' ? D : U
const addPos = (l, r) => [l[0] + r[0], l[1] + r[1]]

const solve = lines => {
  const dug = {}

  let y = 0
  let x = 0
  let maxY = 1
  let maxX = 1
  let minY = 0
  let minX = 0
  let sum = 0

  lines.forEach(l => {
    const [_, dir, steps, color] = new RegExp(/(\w) (\d+) (\(\#\w+\))/g).exec(l)

    const d = getDir(dir, steps)
    range(Number(steps)).forEach(n => {
      [y, x] = addPos([y, x], d)
      maxY = Math.max(maxY, y)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      minX = Math.min(minX, x)
      dug[getKey([y, x])] = { dir, color }
    })
  })

  // create the matrix
  let matrix = []
  for (let r = minY; r <= maxY; ++r) {
    let l = ''
    for (let c = minX; c <= maxX; ++c) {
      const o = dug[getKey([r, c])]
      l += o ? o.dir : '.'
    }
    sum += l.split('').filter(c => c !== '.').length
    matrix.push(l)
  }

  // "flood fill" it
  let startX = matrix[1].indexOf('U') + 1
  let queue = [[1, startX]]
  let visited = new Set()

  while (queue.length) {
    var pos = queue.pop()

    if (matrix[pos[0]][pos[1]] !== '.')
      continue

    visited.add(getKey(pos))

    const l = addPos(pos, L)
    if (!visited.has(getKey(l)))
      queue.push(l)
  
    const r = addPos(pos, R)
    if (!visited.has(getKey(r)))
      queue.push(r)

    const u = addPos(pos, U)
    if (!visited.has(getKey(u)))
      queue.push(u)

    const d = addPos(pos, D)
    if (!visited.has(getKey(d)))
      queue.push(d)
  }

  return sum + visited.size
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
