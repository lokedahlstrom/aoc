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
  let line = 0
  let screen = {
  } 

  const incCycle = amount => {
    for (let i = 0; i < amount; ++i) {
      draw(cycle % 40)
      ++cycle
      if (cycle === 20 || (cycle+20) % 40 === 0) {
        result += cycle * registerX
      }

      if (cycle % 40 === 0) {
        line++
      }
    }
  }

  const draw = (x) => {
    const lit = Math.abs(registerX - x) < 2
    const cur = screen[line] || []
    screen[line] = [...cur, lit ? '#' : ' ']
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

  Object.keys(screen).map(k => console.log(screen[k].join(' ')))
  return result
}

solve(read('input'))