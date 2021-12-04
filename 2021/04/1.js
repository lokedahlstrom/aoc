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

// mark
numbers.split(',').some(n => {
  return boards.some(b => {
    b.mark(parseInt(n))
    if (b.hasBingo()) {
      const sumOfUnmarked = sum(b.getUnmarked())
      console.log('bingo', sumOfUnmarked * n)
      return true
    }
    return false
  })
})
