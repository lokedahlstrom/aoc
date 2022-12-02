import { readInts } from '../helpers'

const isDigit = c => c >= '0' && c <= '9'

let nodes = []

const node = (left, right, regular) => ({ left, right, regular })

const parse = (data, left, right) => {
  const lo = data[0]
  const ro = data[1]
  if (typeof lo === 'object') {
    parse(lo, ++left, right)
  } else {
    nodes.push(node(left, right, data))
  }
  if (typeof ro === 'object') {
    parse(ro, left, ++right)
  } else {
    nodes.push(node(left, right, data))
  }
}

const solve = data => {
  const tree = parse(data, 0, 0)
  console.log(nodes)
 // print()
  const result = 0
  return `Result: ${result}`
}
// [[3,[2,[8,0]]],[9,[5,[7,0]]]].
solve([[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]])

//