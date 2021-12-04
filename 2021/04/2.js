const fs = require('fs')

const read = file => {
  const text = fs.readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const lines = read('./data')

const numbers = lines[0]
const range = n => [...Array(n).keys()]
const sum = v => v.reduce((acc, x) => acc + x, 0)
const empty = v => v === null || v === undefined || v === ''
const notEmpty = v => !empty(v)

const subset = l => r => {
  if (l.size < r.size) {
    return false
  }
  for (let i of r) {
    if (!l.has(i)) {
        return false
    }
  }
  return true
}

class Board {
  constructor (lines) {
    this.lines = lines
    this.marked = new Set()
  }
  mark(n) {
    this.marked.add(n)
  }
  hasBingoH() {
    const testMarked = subset(this.marked)
    return this.lines.filter(testMarked).length > 0
  }
  hasBingoV() {
    const testMarked = subset(this.marked)
    const side = this.lines[0].length

    for (let i = 0; i < side; ++i) {
      const column = range(side).map(j => this.lines[j][i])
      if (testMarked(column)) {
        return true
      }
    }

    return false
  }
  hasBingo() {
    return this.hasBingoH() || this.hasBingoV()
  }
  getUnmarked() {
    const all = this.lines.flat()
    return all.filter(x => !this.marked.has(x))
  }
}

// read the boards
const nonEmptyBoardLines = lines.slice(2).filter(notEmpty)
const numberOfBoards = nonEmptyBoardLines.length / 5
const boards = range(numberOfBoards).map(i => {
  const start = i * 5
  const end = start + 5
  const lines = nonEmptyBoardLines.slice(start, end)
  const numbers = lines.map(x => x.trim().replace(/\s+/g, ',').split(',').map(x => parseInt(x)))
  return new Board(numbers)
})

let won = new Set()
let orderWon = []
let current = undefined

// mark
numbers.split(',').map(n => {
  console.log('mark', parseInt(n))
  return boards.filter(b => !won.has(b)).map(b => {
    b.mark(parseInt(n))
    if (b.hasBingo()) {
      //let result = sum(b.getUnmarked())
      orderWon.push(b)
      won.add(b)
      current = n
    }
  })
})

const lastToWin = orderWon.reverse()[0]
console.log(lastToWin)
let result = sum(lastToWin.getUnmarked())
console.log('bingo!!!', result, current, result * current)

// console.log(boards[0])

// const b = new Board(
//   [
//     [14, 21, 17, 24,  4], 
//     [10, 16, 15,  9, 19],
//     [18,  8, 23, 26, 20],
//     [22, 11, 13,  6,  5],
//     [ 2,  0, 12,  3,  7]
//   ])

//  b.mark(7)
//    b.mark(4)
// //     b.mark(9)
// //       b.mark(5)
// //         b.mark(11)
// //           b.mark(17)
// //             b.mark(23)
// //               b.mark(2)
// //                 b.mark(0)
// //                   b.mark(14)
// //                     b.mark(21)
// //                       b.mark(24)

//  console.log(b)

//  console.log(' 8  2 23  4 24'.trim().replace(/\s+/g, ',').split(',').map(x => parseInt(x)))

// // console.log(sum(b.getUnmarked()))


// // console.log('Numbers', numbers)

