import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n\n')
}

const rotateCCW = m => {
  let transposed = []
  for (let y in m) {
    for (let x in m[y]) {
      transposed[x] += m[y][x]
    }
  }
  return transposed
}

const checkMirror = block => {
  for (let i = 0; i < block.length - 1; i++) {
    let diffCount = 0

    for (let j = 0; j <= Math.min(i, block.length - i - 2); j++)
      diffCount += block[i - j]
        .split('').
        filter((c, idx) => c !== block[i + 1 + j][idx]).length

    if (diffCount === 1)
      return i + 1
  }
  return 0
}

const solve = blocks => {
  return blocks.reduce((acc, blockLine) => {
    const block = blockLine.split('\n')
    return acc + checkMirror(block) * 100 + checkMirror(rotateCCW(block))
  }, 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
