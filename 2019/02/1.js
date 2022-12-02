import { readFileSync } from 'fs'
import { floor } from 'lodash'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split(',').map(x => parseInt(x))
}

const OP = 0
const A = 1
const B = 2
const DEST = 3

const ADD = 1
const MUL = 2

const solve = program => {
  let ip = 0

  const readInstruction = () => {
    const result = program.slice(ip, ip + 4)
    ip += 4
    return result
  }

  const peek = address => program[address]
  const poke = (val, address) => program[address] = val

  const exec = instruction => {
    const a = peek(instruction[A])
    const b = peek(instruction[B])

    switch (instruction[OP]) {
      case ADD:
        poke(a + b, instruction[DEST])
        break
      case MUL:
        poke(a * b, instruction[DEST])
        break
    }
  }

  poke(12, 1)
  poke(2, 2)
  
  let instruction = readInstruction()
  while (instruction[OP] !== 99 && ip < program.length) {
    exec(instruction)
    instruction = readInstruction()
  }

  return peek(0)
}

console.log(`Result: ${solve(read('input'))}`)