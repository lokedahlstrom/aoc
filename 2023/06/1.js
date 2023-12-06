import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const range = n => [...Array(n).keys()]

const numbers = s => s.match(/\d+/g).map(s => Number(s))
const winCount = (time, distance) =>
    range(time)
    .map(ms => ms * (time-ms))
    .filter(newDist => newDist > distance)
    .length

const solve = input => {
  const times = numbers(input[0])
  const distances = numbers(input[1])

  return times
    .map((t, i) => winCount(t, distances[i]))
    .reduce((acc, wins) => acc * wins, 1)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
