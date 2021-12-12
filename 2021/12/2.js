import { read } from '../helpers'

const splits = s => s.split('-')
const empty = o => o === undefined || o === null || o.length === 0
const first = v => v[0]
const last = v => v[v.length - 1]
const isUpperCase = s => s === s.toUpperCase()

let i = 0
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
   // this.recPaths(s, e, visited, pathlist, complete)
   i = 0
   this.dfs(s,e)
   console.log(i)
  }

  ok(p, x) {
    return p.includes(x)
  }

  dfs(s, e) {
    let q = [['start']]

    while (q.length > 0) {
      let p = q.pop()
      let ep = last(p)
      if (ep === e) {
        ++i
        //console.log(p.join(','))
      }

     
      const edges = this.vertices[ep]
      edges.forEach(x => {
        if (!this.ok(p,x) || isUpperCase(x) ) {
          let newPath = [...p, x]
          q.push(newPath)
        }
      })
    }

    
    /*
      Create a queue which will store path(s) of type vector
      initialise the queue with first path starting from src

      Now run a loop till queue is not empty
        get the frontmost path from queue
        check if the lastnode of this path is destination
            if true then print the path
        run a loop for all the vertices connected to the
        current vertex i.e. lastnode extracted from path
            if the vertex is not visited in current path
              a) create a new path from earlier path and 
                  append this vertex
              b) insert this new path to queue

    */
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
 console.log("Test", solve(read('./medium-test').map(splits)))
 console.log("Test", solve(read('./large-test').map(splits)))
 console.log("Data", solve(read('./data').map(splits)))