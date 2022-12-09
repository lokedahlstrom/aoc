import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = lines => {  
  let head = [0,0]
  let tail = [0,0]

  let tailVisits = ['0,0']

  const moveTail = () => {
    const [hx, hy] = head
    let [tx, ty] = tail
    const allowedDist = 1

    const dx = hx - tx
    const dy = hy - ty

    // same line
    if (hy === ty && Math.abs(dx) > allowedDist) {
      tx += dx > 0 ? 1 : -1
      tail = [tx, ty]
    } else
    // same column
    if (hx === tx && Math.abs(dy) > allowedDist) {
      ty += dy > 0 ? 1 : -1
      tail = [tx, ty]
    }
    else
    // diagonal
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      tx += dx > 0 ? 1 : -1
      ty += dy > 0 ? 1 : -1
      tail = [tx, ty]
    }
  }

  const moveHead = (direction) => {
    let [hx, hy] = head
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
    head = [hx, hy]
  }
  
  lines.filter(l => l.length).forEach(line => {
    const [d, s] = line.split(' ')
    const amount = parseInt(s)

    for (let i = 0; i < amount; ++i) {
      moveHead(d)
      moveTail()
      
      const [tx, ty] = tail
      tailVisits.push(`${tx},${ty}`)
    }
  })

  const tailVisitsSet = new Set(tailVisits)  
  return tailVisitsSet.size
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)