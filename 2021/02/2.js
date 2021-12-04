let horizontal = 0
let depth = 0
let aim = 0

const fs = require('fs')

const read = file => {
  const text = fs.readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const split = data => data.split(" ")

const execute = cmd => {
  const [direction, samount] = cmd
  const amount = parseInt(samount)
 
  switch (direction) {
    case 'forward':
      horizontal += amount
      depth += amount * aim
      break
    case 'up':
      aim -= amount
      break
    case 'down':     
      aim += amount
      break
    default:
      break
  }
}

read('./input').map(split).forEach(execute)

console.log(horizontal * depth)