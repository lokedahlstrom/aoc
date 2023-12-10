import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const first = a => a.at(0)

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
      case NS:
      case EW:
      case NE:
      case NW:
      case SW:
      case SE:
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
  let dest = first(symbolAround(lines)(start[0], start[1]))
  let steps = 0
  let cur = ['S', ...start]
  let oldDest = dest

  do {
    oldDest = dest
    dest = move(lines, cur, oldDest)
    cur = oldDest
    ++steps
  } while(cur[0] !== Start)

  return steps / 2
}

console.log(`Result: ${solve(read('input'))}`)
