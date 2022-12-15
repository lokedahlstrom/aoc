import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const ints = s => s
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

const hasLength = s => s.length
const allValid = a => a.every(hasLength)

const slidingWindow = (arr, w) => {
  let result = []
  for (let i = 0; i < arr.length / w; ++i) {
    const a = w * i
    const b = a + w
    const c = b + w
    result.push([arr.slice(a, b), arr.slice(b, c)])
  }
  return result
}

const solve = lines => {
  const cave = {
    0: {
      500: '+'
    }
  }

  const get = (y, x) => {
    if (!cave[y])
      cave[y] = {}
    return cave[y][x]
  }

  const set = (y, x, c) => {
    get(y, x)
    cave[y][x] = c
  }

  let MinX = 999999
  let MaxX = 0
  let MinY = 999999
  let MaxY = 0

  const print = () => {
    for (let y = 0; y <= MaxY; ++y) {
      process.stdout.write('' + y + ' ')
      const row = cave[y]
      if (!row) {
        for (let x = MinX; x <= MaxX; ++x)
          process.stdout.write('.')
      } else {
        for (let x = MinX; x <= MaxX; ++x)
          process.stdout.write(cave[y][x] || '.')
      }
      console.log()
    }
  }

  const createPath = a => {
    const [ fx, fy ] = a[0]
    const [ tx, ty ] = a[1]

    MinX = Math.min(MinX, fx, tx)
    MaxX = Math.max(MaxX, fx, tx)
    MinY = Math.min(MinY, fy, ty)
    MaxY = Math.max(MaxY, fy, ty)

    const hor = () => {
      const fromx = Math.min(fx, tx)
      const tox = Math.max(fx, tx)
      for (let x = fromx; x <= tox; ++x) {
        set(fy, x, '#')
      }
    }

    const ver = () => {
      const fromy = Math.min(fy, ty)
      const toy = Math.max(fy, ty)
      for (let y = fromy; y <= toy; ++y) {
        set(y, fx, '#')
      }
    }

    fy === ty ? hor() : ver()
  }

  const _blocked = c => c === '#' || c === 'o'
  const isBlocked = (y, x) => _blocked(get(y, x))

  const isOOB = (y, x) => y < 0 || y > MaxY || x < 0 || x > MaxX

  const drop = (y, x) => {
    while (true) {
      y++
      if (isOOB(y, x)) return false
      if (!isBlocked(y, x)) continue
      
      x -= 1
      if (isOOB(y, x)) return false
      if (!isBlocked(y, x)) continue
      
      x += 2
      if (isOOB(y, x)) return false
      if (!isBlocked(y, x)) continue

      set(--y, --x, 'o')
      return true
    }
  }

  lines.filter(hasLength).forEach(l => {
    const path = ints(l)

    // make cave
    slidingWindow(path, 2)
      .filter(allValid)
      .forEach(createPath)
  })

  let resting = 0
  while (drop(0, 500)) {
    resting++
  }  
  //print()
  return resting
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)