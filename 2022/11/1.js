import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const ints = s => s
  .split('\n')
  .map(line => line
    .replace(/[\D]/g, ' ')  // replace non numeric with space
    .replace(/\W+/g, ' ')   // remove repeated whitespaces
    .split(' ')             // make array
    .map(d => parseInt(d))  // make ints
    .filter(d => !isNaN(d)) // remove any invalid numbers
  )
  .filter(a => a.length > 0)
  .flat()

const nonEmpty = s => s.length

let monkeys = []

const inspect = (monkey, v) => {
  const [_, op, rs] = monkey.op
  const l = v
  const r = rs === 'old' ? v : parseInt(rs)

  monkey.inspections++

  switch (op) {
    case '+': return l + r
    case '-': return l - r
    case '*': return l * r
    case '/': return l / r
  }
}

const getBored = v => Math.floor(v / 3.0)

const getThrowTarget = (monkey, v) => {
  const newLevel = inspect(monkey, v)
  const adjustedLevel = getBored(newLevel)
  const divisible = adjustedLevel % monkey.test === 0
  return {
    target: divisible ? monkey.t : monkey.f,
    value: adjustedLevel
  }
}

const readMonkey = (lines) => {
  const ops = lines[2].slice(19)
  const op = ops.split(' ')

  monkeys.push({
    id: ints(lines[0])[0],
    items: ints(lines[1]),
    op,
    test: ints(lines[3])[0],
    t: ints(lines[4])[0],
    f: ints(lines[5])[0],
    inspections: 0
  })
}

const solve = lines => {
  const x = lines.filter(nonEmpty)
  for (let i = 0; i < x.length; i += 6) {
    readMonkey(x.slice(i, i + 6))
  }

  for (let round = 0; round < 20; ++round) {
    monkeys.forEach(m => {
      m.items.forEach(item => {
        const { target, value } = getThrowTarget(m, item)
        monkeys[target].items.push(value)
      })

      m.items = []
    })
  }

  const inspections = monkeys.map(m => m.inspections).sort((a, b) => b - a)
  return inspections[0] * inspections[1]
}

console.log(`Result: ${solve(read('test'))}`)
monkeys = []
console.log(`Result: ${solve(read('input'))}`)
