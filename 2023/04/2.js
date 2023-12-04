import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const numbers = s => s.match(/\d+/g).map(s => Number(s))
const range = n => [...Array(n).keys()]
  
const solve = lines => {
  const cardCount = {}
  range(lines.length).forEach(n => cardCount[n+1] = 1)
  lines.map(l => l.substring(8).split('|'))
    .map(row => row.map(numbers))
    .map(([left, right], i) => {
      const currentCard = i + 1
      const ls = new Set([...left])
      const rs = new Set([...right])

      const inLeft = [...rs.intersection(ls)]

        range(inLeft.length).forEach(n => {
          cardCount[currentCard+1+n] += cardCount[currentCard]
        })
      
      return inLeft
    })

  return Object.values(cardCount).reduce((acc, cur) => acc + cur, 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
