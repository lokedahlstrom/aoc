import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const getKey = ([y, x]) => '' + y + '|' + x
const range = n => [...Array(n).keys()]

const L = [ 0, -1]
const R = [ 0,  1]
const D = [ 1,  0]
const U = [-1,  0]

const getDir = c => c === 'L' ? L : c === 'R' ? R : c === 'D' ? D : U
const addPos = (l, r) => [l[0] + r[0], l[1] + r[1]]

const solve = lines => {
  const dug = {}

  let y = 0
  let x = 0
  let maxY = 1
  let maxX = 1

  lines.forEach(l => {
    const [_, dir, steps, color] = new RegExp(/(\w) (\d+) (\(\#\w+\))/g).exec(l)

    console.log(dir, steps)

    const d = getDir(dir, steps)
    range(Number(steps)).forEach(() => {
      [y, x] = addPos([y, x], d)
      maxY = Math.max(maxY, y)
      maxX = Math.max(maxX, x)
      dug[getKey([y, x])] = { dir, color }
    })
  })

  let isInside = false
  for (let r = 0; r <= maxY; ++r) {
    let l = ''
    for (let c = 0; c <= maxX; ++c) {
      const o = dug[getKey([r, c])]
      l += o ? o.dir : '.'
    }
    console.log(l)
  }

  return 0
}

console.log(`Result: ${solve(read('/Users/loke/source/github/aoc/2023/18/test'))}`)
// console.log(`Result: ${solve(read('input'))}`)
