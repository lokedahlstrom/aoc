import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

export const _ints = s => s
  .split('\n')
  .map(line => line
    .replace(/[\D]/g, ' ')  // replace non numeric with space
    .replace(/\W+/g, ' ')   // remove repeated whitespaces
    .split(' ')             // make array
    .map(d => parseInt(d))  // make ints
    .filter(d => !isNaN(d)) // remove any invalid numbers
  )
  .filter(a => a.length > 0)
  .flat()

export const readInts = file => read(file).map(_ints).flat()

export const range = n => [...Array(n).keys()]
export const sum = v => v.reduce((acc, x) => acc + x, 0)
// todo: include || v.length === 0 for arrays
export const empty = v => v === null || v === undefined || v === ''
export const notEmpty = v => !empty(v)
// to be deprecated by _ints
export const ints = data => data.map(line => line.split(',').map(d => parseInt(d)))

export const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export const int_sort = v => [...v].sort((a, b) => a - b)

export const first = v => v[0]
export const last = v => v[v.length - 1]
export const isUpperCase = s => s === s.toUpperCase()