import { read, first } from '../helpers'
import { createWriteStream } from 'fs'

const matrix_get = m => (x, y) => parseInt(m[y][x])

const name = (x, y) => JSON.stringify([x, y])
const fromName = n => JSON.parse(n)

const min = (q) => {
  q.sort((a, b) => a.distance - b.distance)
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
      }
    })
  }

   console.log(distances)
}

const add = (n, inc) =>  Math.max((n + inc) % 10, 1)
const makeLine = v => {
  let s = v.join('')
  let s2 = ''
  let s3 = ''
  let s4 = ''
  let s5 = ''
  v.forEach(n => {
    let x1 = add(n, 1)
    let x2 = add(x1, 1)
    let x3 = add(x2, 1)
    let x4 = add(x3, 1)

    s2 += x1
    s3 += x2
    s4 += x3
    s5 += x4
  })

  return s + s2 + s3 + s4 + s5
}

const makeLine2 = (line, inc) => {
  let result = ''
  line.split('').forEach(c => {
    let n = parseInt(c)
    result += add(n, inc)
  })
  return result 
} 

const solve = data => {
  let result = []
  data.forEach(line => {
    result.push(makeLine(line))
  })

  let extra1 = []
  result.forEach(line => {
    extra1.push(makeLine2(line, 1))
  })
  let extra2 = []
  extra1.forEach(line => {
    extra2.push(makeLine2(line, 1))
  })
  let extra3 = []
  extra2.forEach(line => {
    extra3.push(makeLine2(line, 1))
  })
  let extra4 = []
  extra3.forEach(line => {
    extra4.push(makeLine2(line, 1))
  })
  let extra5 = []
  extra4.forEach(line => {
    extra5.push(makeLine2(line, 1))
  })


  extra1.forEach(line => result.push(line))
  extra2.forEach(line => result.push(line))
  extra3.forEach(line => result.push(line))
  extra4.forEach(line => result.push(line))
  //extra5.forEach(line => result.push(line))

  var logger = createWriteStream('data-out', {encoding: 'utf8'})
  
  result.forEach(line => {
    logger.write(line + '\n')
  })
}

console.log("Test", solve(read('./test').map(l => l.split('').map(c => parseInt(c)))))
console.log("Test", solve(read('./data').map(l => l.split('').map(c => parseInt(c)))))

//console.log("Data", solve(read('./data').map(l => l.split(''))))
