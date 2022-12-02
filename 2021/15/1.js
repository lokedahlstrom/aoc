import { read, first } from '../helpers'

const matrix_get = m => (x, y) => parseInt(m[y][x])

const name = (x, y) => JSON.stringify([x, y])
const fromName = n => JSON.parse(n)

const min = (q) => {
  //q.sort((a, b) => a.distance - b.distance)
  return first(q)
}

const getNeighbors = (visited, p, w, h, data) => {
  const [x,y] = fromName(p.p)
  let result = []
  //N
  if (y - 1 >= 0) {
    const n = name(x, y-1)
    //if (!visited.has(n)) {
      result.push({p:n, cost:data[y-1][x]})
    //}
  }
  //E
  if (x+1 < w) {
    const n = name(x+1,y)
    //if (!visited.has(n))
      result.push({p:n, cost:data[y][x+1]})
  }
  //S
  if (y+1 < h) {
    const n = name(x,y+1)
    //if (!visited.has(n))
      result.push({p:n, cost:data[y+1][x]})
  }
  //W
  if (x-1 >= 0) {
    const n = name(x-1, y)
    //if (!visited.has(n))
      result.push({p:n, cost:data[y][x-1]})
  }
  return result
}

const dijkstra = (data, w, h, startx, starty) => {
  let visited = new Set()
  let distances = {}
  let parents = {}
  let Q = []

  const start = name(startx, starty)

  // init
  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      const v = name(x,y)
      distances[v] = Number.MAX_VALUE
      parents[v] = undefined
      if (v !== start)
        Q.push({p:v, cost: data[y][x], distance: Number.MAX_VALUE})
    }
  }

  Q.push({p:start, cost: 0, distance: 0})

  distances[name(startx, starty)] = 0
  //visited.add(name(startx, starty))

  while (Q.length > 0) {
    let u = min(Q)
    Q.shift()
    //console.log(getNeighbors(visited, u, w, h, data))
    // break
    getNeighbors(visited, u, w, h, data).forEach(v => {
      //visited.add(v.p)
      let tempDist = Number(distances[u.p]) + Number(v.cost)

      if (tempDist < distances[v.p]) {
        distances[v.p] = tempDist
        parents[v.p] = u.p

        v.distance = tempDist
        Q.push({p:v.p, cost: v.cost, distance: tempDist})
      }
    })
  }

   console.log(distances)
}

const solve = data => {
  const WIDTH = first(data).length
  const HEIGHT = data.length

  dijkstra(data, WIDTH, HEIGHT, 0, 0)

  //astar.init(grid)

  console.log(WIDTH, HEIGHT)

  const result = 0
  return `Result: ${result}`
}

console.log("Test", solve(read('./data-out').map(l => l.split(''))))
//console.log("Data", solve(read('./data').map(l => l.split(''))))
