import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const first = a => a.at(0)
const toNumber = s => Number(s)
const notEmpty = s => s.trim() !== ''
const isDigit = c => c >= '0' && c <= '9'
const range = n => [...Array(n).keys()]

const numbers = s => s.match(/\d+/g).map(s => Number(s))
const winCount = (time, distance) => {
  const newDist = range(time).map(ms => {
    const f = ms+1
    return ms * (time-ms)
  }).filter(newDist => newDist > distance)
  return newDist.length
}


const solve = input => {
  const times = numbers(input[0])
  const distances = numbers(input[1])

  return times
    .map((t, i) => winCount(t, distances[i]))
    .reduce((acc, wins) => acc * wins, 1)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
