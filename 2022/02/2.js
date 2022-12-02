import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const Loss = 0
const Draw = 3
const Win  = 6
const X = 1
const Y = 2
const Z = 3

const scores = {
  AX: X + Draw, //sten sten
  AY: Y + Win,  //sten påse
  AZ: Z + Loss, //sten sax

  BX: X + Loss, //påse sten
  BY: Y + Draw, //påse påse
  BZ: Z + Win,  //påse sax
  
  CX: X + Win,  //sax sten
  CY: Y + Loss, //sax påse
  CZ: Z + Draw  //sax sax
}

const win = elf => {
  switch (elf) {
    case 'A': return 'Y'
    case 'B': return 'Z'
    case 'C': return 'X'
  }
}

const draw = elf => {
  switch (elf) {
    case 'A': return 'X'
    case 'B': return 'Y'
    case 'C': return 'Z'
  }
}

const lose = elf => {
  switch (elf) {
    case 'A': return 'Z'
    case 'B': return 'X'
    case 'C': return 'Y'
  }
}

const call = (left, right) => {
  switch (right) {
    case 'X': return lose(left)
    case 'Y': return draw(left)
    case 'Z': return win(left)
  }
}

const solve = lines => {
  let score = 0

  lines.forEach(l => {
    const [ left, right ] = l.split(' ')
    if (left && right) {
      const key = left + call(left, right)
      score += scores[key]
    }
  })

  return score
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)