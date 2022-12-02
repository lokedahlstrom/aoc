import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('')
}

const solve = input => {
  let set = new Map()
  let x = 0
  let y = 0

  const move = c => {
    switch (c) {
      case '^':
        y++
        break
      case 'v':
        y--
        break
      case '>':
        x++
        break
      case '<':
        x--
        break
      default:
        break
    }
  }
  const visit = () => {
    const key = `${x},${y}`
    if (!set.has(key)) {
      set.set(key, { visits: 1 })
    } else {
      const visits = set.get(key)
      visits.visits += 1
    }
  }

  visit()
  input.forEach(c => {
    move(c)
    visit()
  })
  
  return set.size
}

console.log(`Result: ${solve(read('input'))}`)