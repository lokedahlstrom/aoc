import { readInts } from '../helpers'

const add = (item, v) => {
  v.splice(0, 0, item)
  return v
}

const solve = data => {
  //For example, [1,2] + [[3,4],5] becomes [[1,2],[[3,4],5]]
  const addition = () => {
    let a = [1,2]
    let b = [[3,4], 5]
    
    b = add(a, b)
    console.log(b)
  }

  const foo = (x, a) => {
    let res = x + a
    if (x > 9) 
      return 0
    return res
  }

  // [[[[[9,8],1],2],3],4] becomes [[[[0,9],2],3],4] (the 9 has no regular number to its left, so it is not added to any regular number).
  const a = [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]
  const r = [[[[0,9],2],3],4]

  const print2 = a => {
    console.log('print2')
    const s = JSON.stringify(a)
    let p = 0
    let num = []
    s.split('').forEach((c, i) => {
      if (c = '[')
        ++p
      if (c >= '0' && c <= '9')
        num.push(c)
    })

    console.log(num)
  }

  let zap = true
  const print = (a, level, left, right) => {
    return a.map((v, i) => {
      if (typeof v === 'object' && level < 4) {
        return print(v, level+1, i > 0 ? a.slice(i-1, 1) : [], a.slice(i+1))
      }

      if (level > 3 && zap) {
        zap = false
        let [x,y] = a
        console.log(a, 'left', left, 'right', right, v)
        let res = []
        if (left.length > 0 && right.length === 0) {
          console.log('left')
          const [ l ]  = left
          x = foo(x, l)
          y = 0
        }

        if (right.length > 0 && left.length === 0) {
          console.log('right')
          const [ l ]  = right
          y = foo(y, l)
          x = 0
        }

        if (left.length && right.length) {
          console.log('both')
          return [[x, y], right]
        }

        console.log('fff', [x,y])
        return [x,y]
      }
      
      console.log(level, v)
      return level < 3 ? v : []
    })
  }

  
  console.log(JSON.stringify(print2(a)))

  // console.log(JSON.stringify(print(a, 0, [], [])))

  return `Result: ${0}`
}

console.log("Test", solve(readInts('./test')))
//console.log("Data", solve(readInts('./data')))