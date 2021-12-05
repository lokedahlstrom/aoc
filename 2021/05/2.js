import { range, read } from '../helpers'

// helpers
const commaSplit = d => d.split(',')
const toInt = s => parseInt(s)
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)
const or = (predLeft, predRight) => subject => predLeft(subject) || predRight(subject)
const create2dMatrix = (x, y) => Array(y).fill().map(() => Array(x).fill('.'));

// replace ' -> ' with comma
const toCommaDelimited = data => data.map(l => l.replace(/\W\-\>\W/g, ','))
// convert input to an array of lines of four numbers
const toNumberArray = input => toCommaDelimited(input)
  .map(commaSplit)
  .map(l => l.map(toInt))
// vertical line filter
const vertical = line => line[0] === line[2]
// horizontal line filter
const horizontal = line => line[1] === line[3]

const cellEmpty = v => v === undefined || v === null || v === '.'

const incOverlap = (matrix, y, x) => {
  const c = matrix[y][x]
  let cur = cellEmpty(c) ? 0 : c
  matrix[y][x] = ++cur
}

const addToMatrix = matrix => line => {
  if (horizontal(line)) {
    const row = matrix[line[1]]
    const startx = Math.min(line[0], line[2])
    const endx = Math.max(line[0], line[2])
    for (let x = startx; x <= endx; ++x) {
      incOverlap(matrix, line[1], x)
    }
  }
  else if (vertical(line)) {
    const col = line[0]
    const starty = Math.min(line[1], line[3])
    const endy = Math.max(line[1], line[3])
    for (let y = starty; y <= endy; ++y) {
      incOverlap(matrix, y, line[0])
    }
  } else {
    // diagonal line
    const rows = Math.abs(line[3] - line[1]) + 1
    const addX = line[2] > line[0]
    const addY = line[3] > line[1]

    let x = line[0]
    let y = line[1]
    range(rows).map(_ => {
      incOverlap(matrix, y, x)
      x += addX ? 1 : -1
      y += addY ? 1 : -1
    })
  }
}

const solve = data => {
  data = toNumberArray(data)

  //find max x and y
  let maxX = 0
  let maxY = 0
  data.forEach(line => {
    const [ x1, y1, x2, y2 ] = line
    maxX = Math.max(Math.max(maxX, x1), x2)
    maxY = Math.max(Math.max(maxY, y1), y2)
  })

  // filter straight lines
  // data = data.filter(or(vertical, horizontal))

  // create diagram
  let matrix = create2dMatrix(maxX + 1, maxY + 1)
  
  // fill matrix with lines
  data.map(addToMatrix(matrix))

  // matrix.forEach(l => {
  //   l.forEach(c => {
  //     process.stdout.write(String(c))
  //   })
  //   console.log()
  // })

  // count > 1
  let result = 0
  matrix.forEach(row => row.forEach(c => {
    if (c > 1) {
      ++result
    }
  }))

  return `Result: ${result}`
}

console.log(solve(read('./data')))
