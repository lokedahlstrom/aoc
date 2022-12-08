import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const ints = l => l.split('').map(s => parseInt(s))
const geIndex = (arr, t) => arr.findIndex(x => x >= t)

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

  const calcResult = (i, arr) => i > -1 ? i + 1 : arr.length

  const up = (x, y, t) => {
    const part = columns[x].slice(0, y).reverse()
    return calcResult(geIndex(part, t), part)
  }

  const down = (x, y, t) => {
    const part = columns[x].slice(y+1, rows)
    return calcResult(geIndex(part, t), part)
  }

  const left = (x, y, t) => {
    const part = ints(lines[y]).slice(0, x).reverse()
    return calcResult(geIndex(part, t), part)
  }

  const right = (x, y, t) => {
    const part = ints(lines[y]).slice(x+1, cols)
    return calcResult(geIndex(part, t), part)
  }

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