import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const gcd = (a, b) => a ? gcd(b % a, a) : b
const lcm = (a, b) => a * b / gcd(a, b)

const solve = input => {
  const map = {}
  const directions = input[0]
  let endsWithA = [] 
  
  input.slice(2).forEach(line =>  {
    const [source, left, right] = line.match(/\w+/g)
    map[source] = [left, right]
    if (source[2] === 'A')
      endsWithA.push(source)
  })
  
  const counts = endsWithA.map(current => {
    let i = 0
    while (true) {
      const walk = directions[i % directions.length]
      const destination = map[current][walk === 'L' ? 0 : 1]

      if (destination[2] === 'Z') {
        return i+1
      }
      
      current = destination
      ++i
    }
  })

  // see the venn diagram on https://en.wikipedia.org/wiki/Least_common_multiple 
  // which explains why we use LCM
  return counts.reduce(lcm)
}

console.log(`Result: ${solve(read('test3'))}`)
console.log(`Result: ${solve(read('input'))}`)
