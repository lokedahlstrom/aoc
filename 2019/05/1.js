import { readFileSync } from 'fs'
import promptSync from 'prompt-sync'

const prompt = promptSync()

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
const GET = 3
const PUT = 4
const HLT = 99

const solve = program => {
  let ip = 0

©  const instructionLength = op => {
    switch (op) {
      case ADD:
      case MUL:
        return 4
      case GET:
      case PUT:
        return 2
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
    switch (instruction[OP]) {
      case ADD:
        poke(instruction[DEST], peek(instruction[A]) + peek(instruction[B]))
        break
      case MUL:
        poke(instruction[DEST], peek(instruction[A]) * peek(instruction[B]))
        break
      case GET:
        poke(instruction[1], prompt('Input: '))
        break
      case PUT:
        console.log(peek(instruction[1]))
      default:
        break
    }
  }
  
  let instruction
  do {
    instruction = readInstruction()
    exec(instruction)
  } while (instruction[OP] !== 99 && ip < program.length)

  return peek(0)
}

solve([3,0,4,0,99])