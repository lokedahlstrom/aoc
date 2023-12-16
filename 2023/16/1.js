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

const getValue = (matrix, [y, x]) => {
  const row = matrix.at(y)
  if (!row) return undefined
  return row.at(x) || undefined
}

const getNextCell = ([y, x], dir) => [y + dir[0], x + dir[1]]

const getNextDir = (dir, nextCell) => {
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
const getKey = (y, x, dir) => '' + y + '|' + x + '|' + dirToString(dir)
const isVisited = (d, [y, x], dir) => getKey(y, x, dir) in d
const visit = (d, [y, x], dir) => d[getKey(y, x, dir)] = true
const dirToString = d => isE(d) ? 'E' : isW(d) ? 'W' : isN(d) ? 'N' : 'S'
const isValid = (m, [x, y]) => y >= 0 && y < m.length && x >= 0 && x < m[0].length

const beam = (matrix, energized, visited, startPos, startDir) => {
  let queue = [[startPos, startDir]]

  while (queue.length) {
    const [curPos, curDir] = queue.pop()
    const value = getValue(matrix, curPos)
    console.log('Current', value, 'at', curPos, dirToString(curDir[0]))

    if (!isValid(matrix, curPos))
      continue

    if (isVisited(visited, curPos, curDir[0]))
      continue

    visit(visited, curPos, curDir[0])
    energized[curPos[0]+'|'+curPos[1]] = true

    const nextPos = getNextCell(curPos, curDir[0])
    const nextValue = getValue(matrix, nextPos)
    const nextDir = getNextDir(curDir[0], nextValue)
    console.log('Going to', nextValue, 'at', nextPos, 'next dir(s)', nextDir.map(d => dirToString(d)))

    nextDir.forEach(dir => {
      console.log('Pushing', nextValue, 'at', nextPos, dirToString(dir))
      queue.push([nextPos, [dir]])
    })
  }
}

const solve = lines => {
  const matrix = toMatrix(lines)
  // print(matrix)

  const energized = {}
  //visit(energized, [0, 0])
  beam(matrix, energized, {}, [0, 0], [S])

  // console.log(energized)

  matrix.forEach((r, y) => {
    let l = ''
    r.forEach((c, x) => {
      if (isVisited(energized, [y, x]))
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
