import { read } from '../helpers'

const parse_input = d => d.trim().split(' ').map(x => new Set(x.split('')))

// set operations
const minus = (a, b) => new Set([...a].filter(x => !b.has(x)))

const eqSet = (a, b) => {
  if (a.size !== b.size)
    return false
  for (var x of a) {
    if (!b.has(x)) 
      return false
  }
  return true;
}

const isSuperset = (set, subset) => {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false
    }
  }
  return true
}

const allWithLength = v => n => v.filter(x => x.size === n)
const withLength = v => n => allWithLength(v)(n)[0] 

const decodeRow = d => {
  const [pattern_input, signal_input] = d.split('|')

  const patterns = parse_input(pattern_input)
  const signals = parse_input(signal_input)

  const patternWithLength = withLength(patterns)

  const lookup = {
    1: patternWithLength(2),
    2: undefined,
    3: undefined,
    4: patternWithLength(4),
    5: undefined,
    6: undefined,
    7: patternWithLength(3),
    8: patternWithLength(7),
    9: undefined,
    0: undefined
  }

  const allPatternsWithLength = allWithLength(patterns)

  const withSix = allPatternsWithLength(6)
  lookup[9] = withSix.filter(x => isSuperset(x, lookup[4]))[0]
  lookup[0] = withSix.filter(x => isSuperset(x, lookup[1]) && x !== lookup[9])[0]
  lookup[6] = withSix.filter(x => x !== lookup[9] && x !== lookup[0])[0]

  const withFive = allPatternsWithLength(5)
  lookup[3] = withFive.filter(x => isSuperset(x, lookup[1]))[0]
  const eightMinusNine = minus(lookup[8], lookup[9])
  lookup[2] = withFive.filter(x => isSuperset(x, eightMinusNine))[0]
  lookup[5] = withFive.filter(x => x != lookup[3] && x != lookup[2])[0]

  let result = ''
  signals.forEach(x => {
    const found = Object.keys(lookup).filter(key => eqSet(lookup[key], x))[0]
    result += found
  })
   
  return parseInt(result)
}

const solve = data => {
  const result = data.reduce((acc, r) => acc + decodeRow(r), 0)
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))