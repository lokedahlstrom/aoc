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
const five = (s, at) => part(s, at, 5)
const four = (s, at) => part(s, at, 4)
const fifteen = (s, at) => part(s, at, 15)
const is_set =  (n, pos) => (n & (1 << pos)) > 0

const remaining_bits = pos => 8 - (pos % 8)

let stack = []

const parse = binary => {
  let pos = 0
  let result = 0

  const foo = () => {
    const [header, type] = parse_package()
    if (type === 4) {
      parse_literal()
    } else {
      // console.log('WTF', type)
      parse_operation(type)
    }
    result += header
  }

  const parse_package = () => {
    const header = three(binary, pos)
    pos += 3
    const type = three(binary, pos)
    pos += 3
    console.log('package version', header, 'type', type)
    return [header, type]
  }

  const parse_literal = () => {
    let more = true
    let number = ''
    do {
      more = binary.slice(pos, pos+1) === '1'
      pos +=1 
      number += binary.slice(pos, pos+4)
      pos += 4
    } while (more)
    console.log('PUSH VAL', parseInt(number, 2))
    stack.push(parseInt(number, 2))
  }

  const parse_operation = (type) => {
    let more = false
    do {
      const lengthTypeId = one(binary, pos)
      pos +=1

      const bitsForLength = lengthTypeId === 0 ? 15 : 11
      const subPacketLength = part(binary, pos, bitsForLength)
      pos += bitsForLength

      if (lengthTypeId === 1) {
          foo()
      } else {
        const subpackage = binary.slice(pos, pos + subPacketLength)
        result += parse(subpackage)
        pos += subPacketLength
      }
    } while (more)
  }

  while (pos < binary.length) {
    const [header, type] = parse_package()
    if (type === 4) {
      parse_literal()
    } else {
      if (type !== 4) {
        console.log('PUSH', type)
        stack.push('OP' + type)
      }
      parse_operation(type)
    }
    result += header

    if (binary.length - pos - 1 < 8) {
      break
    }
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
  const result = parse(binary)

  let foo = []

 // console.log('before', stack)
 // return result

  //stack = stack.reverse()
  console.log('before', stack)
  let temp = []
  let values = []

  const pop = () => {
    if (values.length)
      return values.pop()
    return stack.pop()
  }

  //let sstack = [...stack]
  while (stack.length > 1) {

  }

  while (stack.length > 1) {
    const v = stack.pop()
    console.log('popping stack', v)
    let zap = 0
    if (typeof v !== 'string') {
      values.push(v)
    } else {
      if (v === 'OP0') {
        zap = values.reduce((acc, n) => acc + n, 0)
        console.log('ADD', values, zap)
      } 
      if (v === 'OP1') {
        zap = values.reduce((acc, n) => acc * n, 1)
        console.log('MULT', values, zap)
      }
      if (v === 'OP2') {
        zap = min(values, Number.MAX_VALUE)
      }
      if (v === 'OP3') {
        zap = max(values)
      }
      if (v === 'OP5') {
        const r = values.pop()
        const l = values.pop()
        zap = l < r ? 1 : 0
      }
      if (v === 'OP6') {
        const r = values.pop()
        const l = values.pop()
        zap = l > r ? 1 : 0
      }
      if (v === 'OP7') {
        const r = values.pop()
        const l = values.pop()
        zap = l === r ? 1 : 0
      }
      values.pop(zap)      
    }
    console.log('>>>', stack)
  }

  console.log('-----done-----', stack, values)

  return `Result: ${(stack)}`
}

console.log("Test", solve(read('./test1')))
// console.log("Data", solve(read('./data')))