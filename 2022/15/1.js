import { readFileSync } from 'fs'
import { ppid } from 'process'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const nonEmpty = s => s.length
const ints = s => s.match(/(\-?\d+)/g).map(d => parseInt(d))

const md = (x1,y1,x2,y2) => Math.abs(x2-x1) + Math.abs(y2-y1)

const sweep = (a,b,c,d,y) => {
  let x = a
  let beam = md(a,b,c,d)
  let dist = md(a,b,x,y)
  if (beam < dist) {
    return []
  }

  let res = [x]

  // left
  while (beam >= md(a,b,--x,y)) {
    res.push(x)
  }
  x = a
  //right
  while (beam >= md(a,b,++x,y)) {
    res.push(x)
  }

  return res
}

const solve = (row, lines) => {
  let xs = new Set()
  let beacons = new Set()
  lines.filter(nonEmpty).forEach(l => {
    const [a,b,c,d] = ints(l)

    if (d === row)
      beacons.add(c)

    const reaches = sweep(a,b,c,d,row)
    reaches.forEach(r => xs.add(r))
  })

  return xs.size - beacons.size
}

console.log(`Result: ${solve(10, read('test'))}`)
console.log(`Result: ${solve(2000000, read('input'))}`)