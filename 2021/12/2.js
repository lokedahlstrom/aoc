import { read } from '../helpers'

const splits = s => s.split('-')
const empty = o => o === undefined || o === null || o.length === 0
const first = v => v[0]
const last = v => v[v.length - 1]
const isUpperCase = s => s === s.toUpperCase()

let foo = {}

let duplicateAdded = false
let count = 0
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
   foo = {b:0,c:0,d:0}
   this.dfs(s,e, complete)
   console.log(i)
  }

  extra(p, x) {
    let a = p.filter(y => !isUpperCase(y) && y !== 'start' && y !== 'end'  )
    //console.log('tesxt', p, x)

    if (isUpperCase(x))
      return true

    let s = new Set(a)

    //console.log( a.length , s.size)

    if (a.includes(x)) {
      let dict = {}
      a.forEach(i => {
        let cur = dict[i] || 0
        dict[i] = ++cur 
      })

      

      if (dict[x] > 1) {
        return false
      }
      //har någon annan redan snott golden
      const others = Object.keys(dict).filter(i => i !== x)
      //console.log('others', others, x)

      const otherAlready =  others.some(i => {
        const found = dict[i] > 1
        if (found) {
          //console.log('has already', i, p)
        }
        return found
      })

      
      if (otherAlready)
        return false

      if (dict[x] < 2) {
          return true
      }
     // console.log(p, x, r, r2)
    }

  //   foo[x] += 1
  //   if (x === 'b') {
  //   let cur = foo[x]
  //   if (cur > 3)
  //     return false
  //   else {
  //     foo[x] = ++cur
  //     return true
  //   }
  // }

   
    return !p.includes(x)
    // console.log(a, a.length)
    // if (x === 'b' && a.length < 2)
    //   return true
    // if (x === 'c' && a.length < 2)
    //   return true
    return false
  }

  dfs(s, e, complete) {
    let q = [['start']]

    while (q.length > 0) {
      let p = q.pop()
      let ep = last(p)
      if (ep === e) {
        ++i
       
        complete.push(p)
        duplicateAdded = false
        //console.log(p.join(','))
        foo={b:0,c:0,d:0}
        //console.log(foo)
      }

     
      const edges = this.vertices[ep]
      edges.forEach(x => {
        //if (!p.includes(x) || isUpperCase(x) || this.extra(p, x)) {
        if (this.extra(p, x)) {
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
  // complete.forEach(c => {
  //   console.log(c.join(','))
  // })
  return `Result: ${result}`
}

console.log("Test", solve(read('./small-test').map(splits)))
  console.log("Test", solve(read('./medium-test').map(splits)))
  console.log("Test", solve(read('./large-test').map(splits)))
  console.log("Data", solve(read('./data').map(splits)))