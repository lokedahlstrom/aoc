import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const ints = l => l.split('').map(s => parseInt(s))

const solve = lines => {
  let cols = lines[0].length
  let rows = lines.length - 1
  let interiorVisible = 0

  const columns = [] 

  for (let x = 0; x < cols; ++x) {
    let c = []
    for (let y = 0; y < lines.length - 1; ++y) {
      c.push(parseInt(lines[y][x]))
    }
    columns.push(c)
  }

  const calcResult = (arr, t) => Math.max(...arr) < t

  const up = (x, y, t) => {
    const part = columns[x].slice(0, y)
    return calcResult(part, t)
  }

  const down = (x, y, t) => {
    const part = columns[x].slice(y+1, rows)
    return calcResult(part, t)
  }

  const left = (x, y, t) => {
    const part = ints(lines[y]).slice(0, x)
    return calcResult(part, t)
  }

  const right = (x, y, t) => {
    const part = ints(lines[y]).slice(x+1, cols)
    return calcResult(part, t)
  }

  lines.filter(l => l.length).forEach((line, y) => {
    if (y > 0 && y < rows - 1) {
      for (let x = 1; x < cols - 1; ++x) {
        const t = line[x]

        if (up(x,y,t) || left(x,y,t) || right(x,y,t) || down(x,y,t)) {
          interiorVisible++
        }
      }
    }
  })
  
  const edgeTrees = cols * 2 + 2 * (rows - 2)
  return edgeTrees + interiorVisible
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)