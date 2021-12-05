import { read } from '../helpers'

// helpers
const commaSplit = d => d.split(',')
const toInt = s => parseInt(s)
const or = (predLeft, predRight) => subject => predLeft(subject) || predRight(subject)
const create2dMatrix = (x, y) => Array.from(Array(y), () => new Array(x))

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

const addToMatrix = matrix => line => {
  if (horizontal(line)) {
    const row = matrix[line[1]]
    const startx = Math.min(line[0], line[2])
    const endx = Math.max(line[0], line[2])
    for (let x = startx; x <= endx; ++x) {
      let cur = row[x] || 0
      row[x] = ++cur
    }
  }
  else {
    const col = line[0]
    const starty = Math.min(line[1], line[3])
    const endy = Math.max(line[1], line[3])
    for (let y = starty; y <= endy; ++y) {
      let cur = matrix[y][col] || 0
      matrix[y][col] = ++cur
    }
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
  data = data.filter(or(vertical, horizontal))

  // create diagram
  let matrix = create2dMatrix(maxX + 1, maxY + 1)
  
  // fill matrix with lines
  data.map(addToMatrix(matrix))

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
