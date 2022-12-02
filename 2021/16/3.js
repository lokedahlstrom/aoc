import { read, first, last } from '../helpers'

const tob = c => {
  switch (c) {
    case '0': return '0000'
    case '1': return '0001'
    case '2': return '0010'
    case '3': return '0011'
    case '4': return '0100'
    case '5': return '0101'
    case '6': return '0110'
    case '7': return '0111'
    case '8': return '1000'
    case '9': return '1001'
    case 'A': return '1010'
    case 'B': return '1011'
    case 'C': return '1100'
    case 'D': return '1101'
    case 'E': return '1110'
    case 'F': return '1111'
  }
}

const part = (s, at, l) => {
  const v =  s.slice(at, at + l)
  return parseInt(v, 2)
}

const one = (s, at) => part(s, at, 1)
const three = (s, at) => part(s, at, 3)

const ADD = 0
const MUL = 1
const MIN = 2
const MAX = 3
const LIT = 4
const LT  = 5
const GT  = 6
const EQ  = 7

const parse = (binary, stack) => {
  let pos = 0
  let result = 0

  const exec = (op, stack) => {
    if (op === ADD) {
      return stack.reduce((acc, n) => acc + n, 0)
    } 
    if (op === MUL) {
      return stack.reduce((acc, n) => acc * n, 1)
    }
    if (op === MIN) {
      return min(stack, Number.MAX_VALUE)
    }
    if (op === MAX) {
      return max(stack)
    }
    if (op === LT) {
      const r = stack.pop()
      const l = stack.pop()
      return l < r ? 1 : 0
    }
    if (op === GT) {
      const r = stack.pop()
      const l = stack.pop()
      return l > r ? 1 : 0
    }
    if (op === EQ) {
      const r = stack.pop()
      const l = stack.pop()
      return l === r ? 1 : 0
    }
  }

  const parse_sentence = (stack) => {
    const [header, type] = parse_package()
    if (type === LIT) {
      parse_literal(stack)
    } else {
      let local_stack = [ type ]
      stack.push(local_stack)
      parse_operator(type, local_stack)
      stack.pop()
      local_stack = local_stack.reverse()
      // toss the operator
      local_stack.pop()
      const res = exec(type, local_stack)
      stack.push(res)
      
    }
    result += header
  }

  const parse_package = () => {
    const header = three(binary, pos)
    pos += 3
    const type = three(binary, pos)
    pos += 3
    return [header, type]
  }

  const parse_literal = (stack) => {
    let more = true
    let number = ''
    do {
      more = binary.slice(pos, pos+1) === '1'
      pos +=1 
      number += binary.slice(pos, pos+4)
      pos += 4
    } while (more)
    stack.push(parseInt(number, 2))
  }

  const parse_operator = (type, stack) => {
    const lengthTypeId = one(binary, pos)
    pos +=1

    const bitsForLength = lengthTypeId === 0 ? 15 : 11
    const subPacketLength = part(binary, pos, bitsForLength)
    pos += bitsForLength

    if (lengthTypeId === 1) {
      for (let i = 0; i < subPacketLength; ++i) {
        parse_sentence(stack)
      }
    } else {
      const subpackage = binary.slice(pos, pos + subPacketLength)
      result += parse(subpackage, stack)
      pos += subPacketLength
    }
  }

  while (pos < binary.length) {
    parse_sentence(stack)
  }

  return result
}

const max = v => v.reduce((acc, x) => {
  return Math.max(x, acc)
}, 0)

const min = (v, max) => v.reduce((acc, x) => {
  return Math.min(x, acc)
}, max)

const solve = data => {
  const binary = first(data).split('').reduce((acc, c) => acc + tob(c), '')    
  
  let stack = []
  const result = parse(binary, stack)
  // result ignored in part 2

  return first(stack)
}

console.log("Test", solve(read('./test1')))
console.log("Data", solve(read('./data')))