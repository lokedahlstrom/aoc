import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = lines => {  
  const snake = {
    '0': [0,0],
    '1': [0,0],
    '2': [0,0],
    '3': [0,0],
    '4': [0,0],
    '5': [0,0],
    '6': [0,0],
    '7': [0,0],
    '8': [0,0],
    '9': [0,0],
  }

  let tailVisits = ['0,0']

  const moveTail = (head, tail) => {
    const [hx, hy] = snake[head]
    let [tx, ty] = snake[tail]

    const allowedDist = 1

    const dx = hx - tx
    const dy = hy - ty

    // same line
    if (hy === ty && Math.abs(dx) > allowedDist) {
      tx += dx > 0 ? 1 : -1
      snake[tail] = [tx, ty]
    } else
    // same column
    if (hx === tx && Math.abs(dy) > allowedDist) {
      ty += dy > 0 ? 1 : -1
      snake[tail] = [tx, ty]
    }
    else
    // diagonal
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      tx += dx > 0 ? 1 : -1
      ty += dy > 0 ? 1 : -1
      snake[tail] = [tx, ty]
    }
  }

  const moveHead = (direction, head) => {
    let [hx, hy] = snake[head]
    switch (direction) {
      case 'U':
        hy++
        break
      case 'D':
        hy--
        break
      case 'L':
        hx--
        break
      case 'R':
        hx++
        break
    }
    snake[head] = [hx, hy]
  }
  
  lines.filter(l => l.length).forEach(line => {
    const [d, s] = line.split(' ')
    const amount = parseInt(s)

    for (let i = 0; i < amount; ++i) {
      moveHead(d, '0')
      for (let link = 1; link < 10; ++link) {
        const a = ''+link-1
        const b = ''+link
        
        moveTail(a, b)
      }
      
      const [tx, ty] = snake['9']
      tailVisits.push(`${tx},${ty}`)
    }
  })

  const tailVisitsSet = new Set(tailVisits)  
  return tailVisitsSet.size
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('test2'))}`)
console.log(`Result: ${solve(read('input'))}`)