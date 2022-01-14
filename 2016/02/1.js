import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const keypad = [
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
]

// translate direction to position delta
const directionDelta = {
  'L': [ -1,  0 ],
  'R': [  1,  0 ],
  'U': [  0, -1 ],
  'D': [  0,  1 ]
}

const solve = lines => {
  // keep track of current position, starting at '5' on the keypad
  let curx = 1
  let cury = 1

  const move = ([x, y]) => {
    // restrict movement within the keypad, i.e. <= 2 and <= 0
    curx = Math.max(Math.min(curx + x, 2), 0)
    cury = Math.max(Math.min(cury + y, 2), 0)
  }

  let result = ''
  lines.forEach(line => {
    line.split('').forEach(c => {
      move(directionDelta[c])
    })
    result += keypad[cury][curx]
  })

  return result
}

console.log(`Result: ${solve(read('input'))}`)