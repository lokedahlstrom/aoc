import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

export const range = n => [...Array(n).keys()]
export const sum = v => v.reduce((acc, x) => acc + x, 0)
export const empty = v => v === null || v === undefined || v === ''
export const notEmpty = v => !empty(v)
export const ints = data => data.map(line => line.split(',').map(d => parseInt(d)))