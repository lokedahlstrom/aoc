import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = lines => {
  let result = 0
  lines.forEach(line => {
    const  [ l, w, h ] = line.match(/\d+/g)
    const a1 = l*w
    const a2 = w*h
    const a3 = h*l
    result += 2*a1 + 2*a2 + 2*a3 + Math.min(a1, Math.min(a2, a3))
  })

  return result
}

console.log(`Result: ${solve(read('input'))}`)