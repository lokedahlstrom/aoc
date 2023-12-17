import { readFileSync } from 'fs'

const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

// "borrowed" MinHeap from internet. lost the link
const MinHeap={siftDown(h,i=0,v=h[i]){if(i<h.length){let k=v[0];while(1){let j=i*2+1;if(j+1<h.length&&h[j][0]>h[j+1][0])j++;if(j>=h.length||k<=h[j][0])break;h[i]=h[j];i=j;}h[i]=v}},heapify(h){for(let i=h.length>>1;i--;)this.siftDown(h,i);return h},pop(h){return this.exchange(h,h.pop())},exchange(h,v){if(!h.length)return v;let w=h[0];this.siftDown(h,0,v);return w},push(h,v){let k=v[0],i=h.length,j;while((j=(i-1)>>1)>=0&&k<h[j][0]){h[i]=h[j];i=j}h[i]=v;return h}};

const toMatrix = lines => lines.map(l => l.split(''))
const printMatrix = m => m.forEach(r => console.log(r.join('')))
const sum = a => a.reduce((acc, v) => acc + v, 0)
const getKey = ([y, x], dir) => '' + y + '|' + x + (dir ? ('|' + dirToString(dir)) : '')

const getValue = (matrix, [y, x]) => {
  const row = matrix.at(y)
  if (!row) return undefined
  return Number(row.at(x)) || undefined
}

const E = [ 0,  1]
const W = [ 0, -1]
const N = [-1,  0]
const S = [ 1,  0]
const O = [ 0,  0]

const getAllowedDirections = from => {
  switch (from) {
    case E: return [E, N, S]
    case W: return [W, N, S]
    case N: return [N, W, E]
    case S: return [S, W, E]
    default: return [S, E]
  }
}

const crawl = (d, f) => {
  let res = [getKey(f)]
  let u = d[getKey(f)].previous
  while (u) {
    res.push(u)
    u = d[u].previous
  }
  return res.reverse()
}

const addPos = (p1, p2) => [p1[0] + p2[0], p1[1] + p2[1]]

const getAdjacent = (matrix, pos, parent) => {
  let result = []

  // [0,0] --> [1,0], [0,1]
  // [2,2] --> [1,2], [3,2], [2,1], [2,3] N,S,W,E

  const allowed = getAllowedDirections(parent.direction)

  // (1) check parent direction and only allow the remaining three other directions, iff within matrix
  return allowed
    .filter(x => {
      const n = addPos(pos, x)
      return n[0] >= 0 && n[0] < matrix.length && n[1] >= 0 && n[1] < matrix[0].length
    })
    .map(x => {
      const np = addPos(pos, x)
      const cost = getValue(matrix, np)
      return { id: getKey(np), cost, pos: np, direction: x }
    })

  // missing step:
  // (2) traverse backwards in 'parent' and block direction x if three of the same direction x
}

const initialDistances = (matrix, start) => {
  const distances = {}
  distances[getKey(start)] = 0
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < matrix[0].length; ++x) {
      distances[getKey([y, x])] = Infinity
    }
  }

  distances[getKey([0,0])] = 0
  return distances
}

const dijkstra = (matrix, acc, parents, start) => {
  parents[getKey(start)] = { previous: null, direction: O }
  acc = initialDistances(matrix, start)

  let visited = new Set()
  let heap = []
  MinHeap.push(heap, [0, { id: getKey(start), cost: 0, pos: start }])

  while (heap.length) {
    let [curCost, cur] = MinHeap.pop(heap)
    visited.add(cur.id)

    getAdjacent(matrix, cur.pos, parents[cur.id]).map(adj => {
      // determine lowest cost here
      // the lowest get pushed and its parent is set to cur
      if (!visited.has(adj.id)) {
        const newLength = curCost + adj.cost
        if (newLength < acc[adj.id]) {
          //adjust acc cost and replace parent
          parents[adj.id] = { previous: cur.id, direction: adj.direction }
          acc[adj.id] = newLength
          adj.cost = newLength

          MinHeap.push(heap, [newLength, adj])
        }
      }
    })
  }
}

const solve = lines => {
  const matrix = toMatrix(lines)

  const start = [0, 0]
  const finish = [matrix.length - 1, matrix[0].length - 1]

  // printMatrix(matrix)
  console.log('start', start, 'finish', finish)

  const parents = {}
  const acc = {}
  dijkstra(matrix, acc, parents, start)

  // console.log(parents)
  // console.log('Finish', parents[getKey(finish)], matrix.length)

  const path = crawl(parents, finish)
  console.log('path', path)

  //return sum(path)
}

console.log(`Result: ${solve(read('/Users/loke/source/github/aoc/2023/17/test'))}`)
console.log(`Result: ${solve(read('/Users/loke/source/github/aoc/2023/17/input'))}`)
