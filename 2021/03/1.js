const fs = require('fs')

const read = file => {
  const text = fs.readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const split = data => data.split("")

const lines = read('./data5')
const length = lines[0].length
const lineCount = lines.length

const range = n => [...Array(n).keys()]

let acc = range(length)
let oneFreq = acc.map(x => 0)

const complement = l => n => {
  const mask = 2**l - 1
  return (n & mask) ^ mask
}

const complementN = complement(length)

lines.map(split).forEach(line => {
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

console.log(gamma * complementN(gamma))