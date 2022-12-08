import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const ints = l => l.split('').map(s => parseInt(s))

const solve = lines => {
  let cols = lines[0].length
  let rows = lines.length - 1
  let scenicScore = 0

  const columns = [] 

  for (let x = 0; x < cols; ++x) {
    let c = []
    for (let y = 0; y < lines.length - 1; ++y) {
      c.push(parseInt(lines[y][x]))
    }
    columns.push(c)
  }

  const getLength = (i, arr) => i > -1 ? i + 1 : arr.length
  const greaterEqualIndex = (arr, t) => arr.findIndex(x => x >= t)
  const rayLength = (arr, t) => getLength(greaterEqualIndex(arr, t), arr)

  const up = (x, y, t) => rayLength(columns[x].slice(0, y).reverse(),t)
  const down = (x, y, t) => rayLength(columns[x].slice(y+1, rows),t)
  const left = (x, y, t) => rayLength(ints(lines[y]).slice(0, x).reverse(),t)
  const right = (x, y, t) => rayLength(ints(lines[y]).slice(x+1, cols),t)

  lines.filter(l => l.length).forEach((line, y) => {
    for (let x = 0; x < cols; ++x) {
      const t = line[x]

      const u = up(x,y,t)
      const d = down(x,y,t)
      const l = left(x,y,t)
      const r = right(x,y,t)

      scenicScore = Math.max(scenicScore, u*d*l*r)
    }
  })
  
  return scenicScore
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)