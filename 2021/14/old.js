import { read, first, last } from '../helpers'

const solve = data => {
  const templates = first(data)
  const insertionPairs = data.slice(2).map(line => line.split(' -> '))
  const projection = {}
  const pairCounter = {}
  const letters = new Set()
  insertionPairs.forEach(p => {
    projection[first(p)] = last(p)
    pairCounter[first(p)] = 0
    letters.add(last(p))
  })

  let order = []
  const slork = (pair) => {
    const prod = projection[pair]
    const l = first(pair) + last(prod)
    const r = prod + last(pair)
    pairCounter[l] += 1
    pairCounter[r] += 1
    order.push(l)
    order.push(r)
  }

  // init counter from template
  for (let i = 0; i < templates.length - 1 ; ++i) {
    const pair = templates.slice(i, i+2)
    //pairCounter[pair] = 1
    slork(pair)
  }
  

  //             
  // NCNBCHB -> (nc) (cn) (nb) (bc) (ch) (hb)
  //NBCCNBBBCBHCB -> nb bc cc cn nb bb bb bc cb bh hc cb 
  //NBCCNBBBCBHCB
  
  
  const process = () => {
    //Object.keys(pairCounter).map(pair => {
    let curOrder = [...order]
    order = []
    curOrder.map(pair => {
      if (pairCounter[pair] > 0) {
        slork(pair)
      }
    })
  }

  const steps = 25
  for (let i = 0; i < steps; ++i) {
    process()
  }

  console.log(pairCounter)
  console.log(Object.values(pairCounter).reduce((acc, x) => acc + x, 0))



  const result = 0
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
//console.log("Data", solve(read('./data')))