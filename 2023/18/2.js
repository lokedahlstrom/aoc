import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const L = 2
const R = 0
const D = 1
const U = 3

const solve = lines => {
  let points = []
  let y = 0
  let x = 0
  let perimeter = 0
  
  lines.forEach(l => {
    const color = l.match(/\(#([0-9a-f]+)\)/)[1]
    const steps = parseInt(color.slice(0, -1), 16)
    const dir = Number(color.slice(-1))

    switch (dir) {
      case R:
        x += steps
        break
      case L:
        x -= steps
        break
      case U:
        y -= steps
        break
      case D:
        y += steps
        break
    }

    perimeter += steps
    points.push([y, x])
  })

  // use the shoe lace formula (should have used that for part one as well...)
  let innerArea = 0
  for (let i = 0; i < points.length - 1; ++i) {
    const p1 = points[i]
    const p2 = points[i+1]
    innerArea += (p2[1] + p1[1]) * (p2[0] - p1[0])
  }

  return Math.floor((innerArea + perimeter) / 2) + 1
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
