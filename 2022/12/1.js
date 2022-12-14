import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const Infinity = 99999999
const first = v => v[0]
const last = v => v.slice(-1)
const name = v => `${first(v)}.${last(v)}`

const safe_get = matrix => (y, x) => {
  if (y < 0 || y >= matrix.length) {
    return undefined
  }
  if (x < 0 || x >= matrix[0].length) {
    return undefined
  }
  return matrix[y][x]
}

const node = (v, dist) => ({ id: v, dist })

const t = c => {
  switch (c) {
    case 'S': return 'a'
    case 'E': return 'z'
    default: return c
  }
}

const ok = (v, w) => t(w).charCodeAt() - t(v).charCodeAt() < 2

const neighbors = (data, height, width, v) => {
  const [y, x] = v.split('.').map(d => parseInt(d))
  const uy = y-1
  const dy = y+1
  const lx = x-1
  const rx = x+1
  const get = safe_get(data)

  let res = []

  const vs = data[y][x]

  const a = get(uy, x)
  const b = get(dy, x)
  const c = get(y, lx)
  const d = get(y, rx)

  a && ok(vs, a) && res.push(name([uy,x]))
  b && ok(vs, b) && res.push(name([dy,x]))
  c && ok(vs, c) && res.push(name([y,lx]))
  d && ok(vs, d) && res.push(name([y,rx]))

  return res
}

const dijkstra = (data, height, width, start, end) => {
  let nodes = []
  let distances = {}
  const previous = {}
  let path = []

  data.forEach((row, y) => {
    row.forEach((_, x) => {
      const v = name([y, x])
      if (v === start) {
        distances[v] = 0
        nodes.push(node(v, 0))
      } else {
        distances[v] = Infinity
        nodes.push(node(v, Infinity))
      }
      previous[v] = null
    })
  })

  let smallest = undefined
  
  while (nodes.length) {
    // pretty inefficient priority queue...
    nodes.sort((a, b) => a.dist - b.dist)
    smallest = nodes.shift()

    if (smallest.id == end) {
      let x = smallest.id
      while (previous[x]) {
        path.push(x);
        x = previous[x];
      }
      break
    }
  
    neighbors(data, height, width, smallest.id).forEach(w => {      
      const candidate = distances[smallest.id] + 1      
      if (candidate < distances[w]) {
        distances[w] = candidate
        previous[w] = smallest.id
        nodes.push(node(w, candidate))
      }
    })    
  }

  return path.concat(smallest.id).reverse()
}

const solve = lines => {
  
  const width = first(lines).length
  const height = lines.length

  const data = lines.map(row => row.split(''))

  let start = undefined
  let end = undefined
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      if (data[y][x] === 'S')
        start = [y, x]
        if (data[y][x] === 'E')
        end = [y, x]
    }
  }

  return dijkstra(data, height, width, name(start), name(end)).length - 1
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)