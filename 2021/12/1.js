import { read } from '../helpers'

const splits = s => s.split('-')
const empty = o => o === undefined || o === null || o.length === 0
const first = v => v[0]
const last = v => v[v.length - 1]
const isUpperCase = s => s === s.toUpperCase()

class Graph {
  constructor(vertices) {
    this.vertices = {}
    if (!empty(vertices))
      vertices.forEach(this.addVertex)
  }

  addVertex(v) {
    if (empty(this.vertices[v]))
      this.vertices[v] = []
  }

  addEdge(u, v) {
    this.addVertex(u)
    this.addVertex(v)

    // add edges in both directions!
    this.vertices[u].push(v)
    this.vertices[v].push(u)
  }

  paths(s, e, complete) {
    let visited = new Set()
    let pathlist = [s]
    this.recPaths(s, e, visited, pathlist, complete)
  }

  recPaths(s, e, visited, pathlist, complete) {
    if (s === e) {
      complete.push([...pathlist])
      return
    }

    if (!isUpperCase(s)) {
      visited.add(s)
    }
    const edges = this.vertices[s]
    edges.forEach(v => {
      if (!visited.has(v)) {
        pathlist.push(v)
        this.recPaths(v, e, visited, pathlist, complete)
        pathlist.splice(pathlist.indexOf(v), 1)
      }
    })
    visited.delete(s)
  }
}

const solve = data => {
  const G = new Graph()
  data.forEach(line => {
    G.addEdge(first(line), last(line))
  })
  
  let complete = []
  G.paths('start', 'end', complete)
  const result = complete.length
  complete.forEach(c => {
    console.log(c.join(','))
  })
  return `Result: ${result}`
}

console.log("Test", solve(read('./small-test').map(splits)))
// console.log("Test", solve(read('./medium-test').map(splits)))
// console.log("Test", solve(read('./large-test').map(splits)))
// console.log("Data", solve(read('./data').map(splits)))