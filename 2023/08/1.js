import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = input => {
  const map = {}
  const directions = input[0]
  
  input.slice(2).forEach(line =>  {
    const [source, left, right] = line.match(/\w+/g)
    map[source] = [left, right]
  })
  
  let current = 'AAA'
  let i = 0
  while (true) {
    const walk = directions[i % directions.length]
    const destination = map[current][walk === 'L' ? 0 : 1]

    if (destination === 'ZZZ') {
      return i+1
    }
    
    current = destination
    ++i
  }

  return 0
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('test2'))}`)
console.log(`Result: ${solve(read('input'))}`)
