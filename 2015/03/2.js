import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('')
}

const solve = input => {
  let set = new Map()
  let xs = 0
  let ys = 0
  let xr = 0
  let yr = 0

  const move = (who, c) => {
    switch (c) {
      case '^':
        who === 'santa' ? ys++ : yr++
        break
      case 'v':
        who === 'santa' ? ys-- : yr--
        break
      case '>':
        who === 'santa' ? xs++ : xr++
        break
      case '<':
        who === 'santa' ? xs-- : xr--
        break
      default:
        break
    }
  }
  const visit = (who) => {
    const key = `${who === 'santa' ? xs : xr},${who === 'santa' ? ys : yr}`
    if (!set.has(key)) {
      set.set(key, { presents: 1 })
    } else {
      const visit = set.get(key)
      visit.presents += 1
    }
  }

  visit('santa')
  visit('robo-santa')

  input.forEach((c, i) => {
    const who = i % 2 === 0 ? 'santa' : 'robo-santa'
    move(who, c)
    visit(who)
  })
  
  return set.size
}

console.log(`Result: ${solve('^v'.split(''))}`)
console.log(`Result: ${solve('^>v<'.split(''))}`)
console.log(`Result: ${solve('^v^v^v^v^v'.split(''))}`)
console.log(`Result: ${solve(read('input'))}`)