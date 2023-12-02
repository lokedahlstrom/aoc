import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const getSet = s => s.match(/(\d+) (\w+)/g)
const getColorCount = s => {
  const [_, count, color] = s.match(/(\d+) (\w+)/)
  return { color, count: Number(count)}
}

const readGame = s => {
  const min = { red: 0, green: 0, blue: 0 }
  
  s.split(';').forEach(set => {
    getSet(set).forEach(set => {
      const c = getColorCount(set)
      min[c.color] = Math.max(c.count, min[c.color])
    })
  })

  return min.red * min.green * min.blue
}

const solve = lines => lines.reduce((acc, line) => acc + readGame(line), 0)

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
