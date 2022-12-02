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

// opcodes
const ADD = 1
const MUL = 2
const HLT = 99

const solve = (program, noun, verb) => {
  let ip = 0

  const instructionLength = op => {
    switch (op) {
      case ADD:
      case MUL:
        return 4
      case HLT:
      default:
        return 1
    }
  }

  const readInstruction = () => {
    const opcode = program[ip]
    const length = instructionLength(opcode)
    const result = program.slice(ip, ip + length)
    ip += length
    return result
  }

  const peek = address => program[address]
  const poke = (address, val) => program[address] = val

  const exec = instruction => {
    const a = peek(instruction[A])
    const b = peek(instruction[B])

    switch (instruction[OP]) {
      case ADD:
        poke(instruction[DEST], a + b)
        break
      case MUL:
        poke(instruction[DEST], a * b)
        break
      default:
        break
    }
  }

  poke(1, noun)
  poke(2, verb)
  
  let instruction
  do {
    instruction = readInstruction()
    exec(instruction)
  } while (instruction[OP] !== 99 && ip < program.length)

  return peek(0)
}

const original = read('input')

for (let noun = 0; noun <= 99; ++noun) {
  for (let verb = 0; verb <= 99; ++verb) {
    const result = solve([...original], noun, verb)
    if (result === 19690720) {
      console.log('Result:', 100 * noun + verb)
    }
  }
}
