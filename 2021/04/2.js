import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
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
const nonEmptyBoardLines = lines
  .slice(2)         // skip line with called numbers and first blank line
  .filter(notEmpty) // remove all empty lines

const numberOfBoards = nonEmptyBoardLines.length / 5

const boards = range(numberOfBoards).map(i => {
  // extract the five rows for the current board
  const start = i * 5
  const end = start + 5
  const lines = nonEmptyBoardLines.slice(start, end)

  const numbers = lines.map(x => x
    .trim()                 // remove heading blanks
    .replace(/\s+/g, ',')   // replace whitespace with ,
    .split(',')             // split numbers on ,
    .map(x => parseInt(x))) // convert to integer

  return new Board(numbers)
})

let won = new Set()
let orderWon = []
let lastCalled = undefined

// call the numbers
numbers.split(',').map(n => {
  // ignore boards that already have bingo
  return boards.filter(b => !won.has(b)).map(b => {
    b.mark(parseInt(n))
    if (b.hasBingo()) {
      orderWon.push(b)
      won.add(b)
      lastCalled = n
    }
  })
})

const lastToWin = orderWon.reverse()[0]
const sumOfUnmarked = sum(lastToWin.getUnmarked())
console.log('last bingo', sumOfUnmarked * lastCalled)
