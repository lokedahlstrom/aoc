import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const rotateCCW = m => m[0].map((_, index) => m.map(row => row[index]).reverse())
const rowRockCount = row => row.filter(c => c === 'O').length

const tilt = matrix => {
  let moving = true
  while (moving) {
    moving = false
    matrix.forEach((row, y) => {
      if (y === 0)
        return
      row.forEach((c, x) => {
        if (c === 'O') {
          const above = matrix[y-1][x]
          if (above === '.') {
            moving = true
            matrix[y-1][x] = 'O'
            matrix[y][x] = '.'
          }
        }
      })
    })
  }
}

const performCycle = matrix => {
  for (let i = 0; i < 4; ++i) {
    tilt(matrix)
    matrix = rotateCCW(matrix)
  }

  return matrix
}

const solve = lines => {
  let matrix = lines.map(l => l.split(''))

  for (let round = 0; round < 1000; ++round) {
    matrix = performCycle(matrix)
  }

  const rows = matrix.length
  return matrix.reduce((acc, row, i) => acc + (rows - i) * rowRockCount(row), 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
