import { read, first, last } from '../helpers'

const max = v => v.reduce((acc, x) => {
  return Math.max(x, acc)
}, 0)

const min = (v, max) => v.reduce((acc, x) => {
  return Math.min(x, acc)
}, max)


const solve = data => {
  const template = first(data)
  const insertionPairs = data.slice(2).map(line => line.split(' -> '))
  const projection = {}
  let pairCounter = {}

  insertionPairs.forEach(p => {
    projection[first(p)] = last(p)
  })

  const letterCount = { }
  const inc = (o, k, v = 1) => {
    let cur = o[k] || 0
    o[k] = cur + v
  }

  // init 0th round
  template.split('').forEach((c, i) => {
    inc(letterCount, c)
    const pair = template.slice(i, i + 2)
    if (pair.length > 1) {
      inc(pairCounter, pair)
    }
  })


  // for (let i = 0; i < template.length - 1; ++i) {
  //   const c = template[i]
  //   inc(letterCount, c)
  //   const pair = template.slice(i, i + 2)
  //   //if (pair.length > 1) {
  //     pairCounter[pair] = 1
  //   //}
  // }


  const steps = 40
  for (let i = 0 ; i < steps; ++i) {
    let newPairs = {}
    Object.keys(pairCounter).forEach(k => {
      const v = pairCounter[k]
      const d = projection[k]
      inc(newPairs, k[0]+d, v)
      inc(newPairs, d+k[1], v)
      inc(letterCount, d, v)
    })
    pairCounter = {...newPairs}
  }

  const most = max(Object.values(letterCount))
  const least = min(Object.values(letterCount), most)

  console.log(pairCounter)
  const result = most - least
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))