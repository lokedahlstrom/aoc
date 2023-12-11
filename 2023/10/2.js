import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const last = a => a.at(-1)
const Start = 'S'

const NS = '|' // | is a vertical pipe connecting north and south.
const EW = '-' // - is a horizontal pipe connecting east and west.
const NE = 'L' // L is a 90-degree bend connecting north and east.
const NW = 'J' // J is a 90-degree bend connecting north and west.
const SW = '7' // 7 is a 90-degree bend connecting south and west.
const SE = 'F' // F is a 90-degree bend connecting south and east.

const get = (matrix, y, x) => {
  const row = matrix.at(y)
  if (!row) return '.'
  return row.at(x) || '.'
}

const symbolAround = matrix => (y, x) => {
  const around = [
             [y-1, x],           // above
    [y, x-1],          [y, x+1], // same row
             [y+1,  x]           // below
  ]

  return around.map(([sy, sx]) =>{
    const symbol = get(matrix, sy, sx)

    switch (symbol) {
      case NS: // |
      case EW: // -
      case NE: // L
      case NW: // J
      case SW: // 7
      case SE: // F
        return [symbol, sy, sx]
      default:
        return []
    }
  }).filter(a => a.length)
}

const getStartLocation = input => {
  let loc = [-1, -1]
  input.some((line, y) => line.split('').some((c, x) => {
    if (c === Start) {
      loc = [y, x]
      return true
    }
    return false
  }))
  return loc
}

const move = (matrix, cur, dst) => {
  const curY = cur[1]
  const curX = cur[2]
  const dstY = dst[1]
  const dstX = dst[2]

  let newY = 0
  let newX = 0

  const fromN = curY <= dstY
  const fromW = curX <= dstX

  switch (dst[0]) {
    case NS: // |
      newY = fromN ? dstY + 1 : dstY - 1
      newX = dstX
      break
    case EW: // -
      newY = dstY
      newX = fromW ? dstX + 1 : dstX - 1
      break

    case NE: // L
      newY = curY === dstY ? dstY - 1 : curY < dstY ? dstY : dstY
      newX = curY === dstY ? dstX : curY < dstY ? dstX+1 : dstX+1
      break
    case NW: // J
      newY = curY === dstY ? dstY - 1 : curY < dstY ? dstY : dstY
      newX = curY === dstY ? dstX : curY < dstY ? dstX-1 : dstX+1
      break
    case SW: // 7
      newY = curY === dstY ? dstY + 1 : curY < dstY ? dstY : dstY
      newX = curY === dstY ? dstX : curY < dstY ? dstX : dstX-1
      break
    case SE: // F
      newY = curY === dstY ? dstY + 1 : curY < dstY ? dstY : dstY
      newX = curY === dstY ? dstX : curY < dstY ? dstX : dstX+1
      break
      
    default:
      break
  }

  const res = [get(matrix, newY, newX), newY, newX]
  return res
}

const solve = lines => {
  // find start location
  let start = getStartLocation(lines)
  let dest = last(symbolAround(lines)(start[0], start[1]))
  let steps = 0
  let cur = ['S', ...start]
  let oldDest = dest

  let loopPipes = []

  do {
    oldDest = dest
    dest = move(lines, cur, oldDest)
    cur = oldDest

    loopPipes.push(cur)

    ++steps
  } while(cur[0] !== Start)

  // remove all characters not part of the loop
  // and expand the matrix to allow flood filling
  // the outside of the loop
  for (let y = 0; y < lines.length; ++y) {
    let newLine = ''
    for (let x = 0; x < lines[y].length; ++x) {
      const c = lines[y][x]
      if (loopPipes.filter(p => p[1] === y && p[2] === x).length < 1) {
        newLine += '#'
      } else {
        newLine += c
      }
    }
    lines[y] = newLine
  }

  let insideCount = 0
  lines.forEach((line, y) => {
    let isInside = false
    line.split('').forEach((c, x) => {
      if (c === Start || c === SE || c === SW || c === NS) {
        isInside = !isInside
      }
      if (isInside && loopPipes.filter(p => p[1] === y && p[2] === x).length < 1) {
        ++insideCount
      }
    })
  })

  return insideCount
}

console.log(`Result: ${solve(read('test3'))}`)
console.log(`Result: ${solve(read('input'))}`)
