import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const nonEmpty = s => s.length

const solve = lines => {
  let registerX = 1
  let cycle = 0
  let result = 0

  const incCycle = amount => {
    for (let i = 0; i < amount; ++i) {
      ++cycle
      if (cycle === 20 || (cycle+20) % 40 === 0) {
        result += cycle * registerX
      }
    }
  }

  lines.filter(nonEmpty).forEach(line => {
    const [op, arg] = line.split(' ')

    switch (op) {
      case 'noop':
        incCycle(1)
        break
      case 'addx':
        incCycle(2)
        registerX += parseInt(arg)
        break
    }    
  })

  return result
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('test2'))}`)
console.log(`Result: ${solve(read('input'))}`)