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

const solve = lines => {
  let score = 0

  lines.forEach(l => {
    const key = l.replace(' ', '')
    score += key.length ? scores[key] : 0
  })

  return score
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)