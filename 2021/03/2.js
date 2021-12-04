import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const lines = read('./data5')

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

const calcRating = criteria => () => {
  let bit = -1
  let candidates = criteria(++bit)(lines)
  while (candidates.length > 1) {
    candidates = criteria(++bit)(candidates)
  }
  return candidates[0]
}

const getOxygenGeneratorRating = calcRating(mostFrequent)
const getCO2ScrubberRating = calcRating(leastFrequent)

const oxy = getOxygenGeneratorRating()
const co2 = getCO2ScrubberRating()

console.log('life support rating:', binToDec(oxy) * binToDec(co2))