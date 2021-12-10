import { read, range } from '../helpers'

const split = data => data.split("")

const solve = data => {
  const length = data[0].length
  const lineCount = data.length

  let acc = range(length)
  let oneFreq = acc.map(x => 0)

  // invert the bits. the mask depends on the number of bits
  const complement = l => n => {
    const mask = 2**l - 1
    return (n & mask) ^ mask
  }

  const complementN = complement(length)

  data.map(split).forEach(line => {
    line.forEach((b, i) => {
      if (b === '1') {
        oneFreq[i] += 1
      }
    })
  })

  //now create the first number
  const half = lineCount / 2
  let gamma = 0
  oneFreq.reverse().forEach((n, i) => {
    if (n > half) {
      gamma += 2 ** i
    }
  })

  const result = gamma * complementN(gamma)
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))