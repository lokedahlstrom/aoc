import { read } from '../helpers'

// sure, there must be a built in feature in js
// to convert binary to decimal...
const binToDec = s => {
  let result = 0
  s.split('').reverse().forEach((n, i) => {
    if (n === '1') {
      result += 2 ** i
    }
  })
  return result
}

const nthBitSet = bit => v => v[bit] == 1
const nthBitNotSet = bit => v => !nthBitSet(bit)(v)

const bitSetFrequency = (bit, data) => data.reduce((acc, line) => acc + nthBitSet(bit)(line), 0)

const mostFrequent = bit => data => {
  const result = bitSetFrequency(bit, data)

  if (result >= (data.length / 2)) {
    return data.filter(nthBitSet(bit))
  }

  return data.filter(nthBitNotSet(bit))
}

const leastFrequent = bit => data => {
  const result = bitSetFrequency(bit, data)

  if (result < (data.length / 2)) {
    return data.filter(nthBitSet(bit))
  }

  return data.filter(nthBitNotSet(bit))
}

const solve = data => {
  const calcRating = criteria => () => {
    let bit = -1
    let candidates = criteria(++bit)(data)
    while (candidates.length > 1) {
      candidates = criteria(++bit)(candidates)
    }
    return candidates[0]
  }
  
  const getOxygenGeneratorRating = calcRating(mostFrequent)
  const getCO2ScrubberRating = calcRating(leastFrequent)
  
  const oxy = getOxygenGeneratorRating()
  const co2 = getCO2ScrubberRating()
  
  const result = binToDec(oxy) * binToDec(co2)
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))