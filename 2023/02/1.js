import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const last = v => v.at(-1)

const getGameId = s => Number(last(s.match(/\w (\d+)\:/)))
const getSet = s => s.match(/(\d+) (\w+)/g)
const getColorCount = s => {
  const [_, count, color] = s.match(/(\d+) (\w+)/)
  return { color, count: Number(count)}
}

const limits = { red: 12, green: 13, blue: 14 }

const countValid = c => c.count <= limits[c.color]
const setCountValid = set => countValid(getColorCount(set))
const allSetsValid = set => getSet(set).every(setCountValid)

const readGame = s => s.split(';').every(allSetsValid) ? getGameId(s) : 0

const solve = lines => lines.reduce((acc, line) => acc + readGame(line), 0)
  
console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
