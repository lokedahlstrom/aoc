import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const isDigit = c => c >= '0' && c <= '9'

const get = (matrix, y, x) => {
  const row = matrix[y]
  if (!row) return '.'
  return row[x] || '.'
}

const symbolAround = matrix => (y, x) => {
  const around = [
    [y-1, x], [y-1, x-1], [y-1, x+1], // above
    [y, x-1], [y, x+1],               // same row
    [y+1, x], [y+1, x-1], [y+1, x+1]  // below
  ]
  const res = around.map(([y, x]) => {
    if (isDigit(get(matrix, y, x))) {
      return [y, x]
    }
  })

  return res.filter(x => x)
}

const solve = lines => {
  const re = /(\*)/g
  let match = null
  return lines.map((row, y) => {
    const res = []
    while ((match = re.exec(row)) != null) {
      res.push([...symbolAround(lines)(y, match.index)])
    }
    return res
  })
    .flat()
    .map(hits => {
      const unique = new Set()
      hits.map(([y,x]) => {
        const line = lines[y]
        let first = 0
        let last = 0
        for (let a = x; a >= 0; --a) {
          if (!isDigit(line[a])) {
            first = a+1
            break
          }
        }

        for (let a = x; a < line.length; ++a) {
          if (!isDigit(line[a])) {
            last = a
            break
          }
        }

        const s = line.substring(first, last === 0 ? line.length : last)
        unique.add(Number(s))
      })

      const res = [...unique]
      return res.length > 1 ? res : []
    })
    .reduce((acc, arr) => acc + arr.reduce((acc, num) => acc * num, arr.length < 1 ? 0 : 1), 0)
}
  
console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
