import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const range = n => [...Array(n).keys()]

const numberIgnoringSpaces = s => Number(s.substring(10).replaceAll(' ', ''))
const winCount = (time, distance) =>
    range(time)
    .map(ms => ms * (time-ms))
    .filter(newDist => newDist > distance)
    .length

const solve = input => {
  const time = numberIgnoringSpaces(input[0])
  const distance = numberIgnoringSpaces(input[1])

  return winCount(time, distance)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
