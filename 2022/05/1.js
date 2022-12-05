import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const empty = l => l.length === 0
const range = n => [...Array(n).keys()]
const notEmpty = l => l.length

const lineGet = line => i => line[3 * i + i + 1].replace(/\W+/g, '')

const solve = lines => {
  const end = lines.findIndex(empty)
  const stacks = lines[end-1]
    .replace(/\W+/g,' ')
    .split(' ')
    .filter(notEmpty)
    .reverse()
    [0]

  let crates = {}
  const stackRange = range(parseInt(stacks))
  stackRange.forEach(i => crates[i+1] = [])

  range(end-1).forEach(i => {
    const line = lines[i]
    const get = lineGet(line)
    stackRange.forEach(j => {
      const val = get(j)
      if (val)
        crates[j+1].push(val)
    })
  })
  
  for (let i = end+1; i < lines.length; ++i) {
    if (lines[i]) {
      const [ count, from, to ] = lines[i].match(/\d+/g)
      for (let x = 0; x < parseInt(count); ++x) {
        crates[to].unshift(crates[from].shift())
      }
    }
  }
  
  return stackRange.reduce((s, i) => s + crates[i+1].shift(), '')
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)