//import { sortedLastIndexBy } from 'lodash'
const fs = require('fs')
const { execPath } = require('process')
const read = file => {
  const text = fs.readFileSync(file).toString('utf-8')
  return text.split('\n')
}
const first = v => v[0]
const last = v => v[v.length - 1]

const isDigit = c => c >= '0' && c <= '9'

const add = (x, a) => {
  let res = x + a
  if (x > 9) 
    return 0
  return res
}

let snails = []

const solve = (data) => {  

  const addLevel = level => ({ level, numbers: [] })

  const createInputString = (data) => {
    let finalData = '['
    const inner = data.join(',')
    finalData += inner + ']'

    return finalData
  }

  const createInputString2 = (l, r) => {
    return '[' + l + ',' + r + ']'
  }

  const parse = (data) => {
    snails = []
    
    let level = 0
    const items = data.split('')
    for (let i = 0; i < items.length; ++i) {
      const c = items[i]
      if (c === '[') {
        snails.push(addLevel(++level))
      }
      if (c === ']') {
        snails.push(addLevel(--level))
        // --level
      }
      if (isDigit(c)) {
        let res = c
        const n = items.slice(i, i + 2)
        if (isDigit(last(n))) {
          ++i
          res += last(n)
          // console.log('foud', c, last(n))
        }
        last(snails).numbers.push(parseInt(res))
      }
    }
  }


  const makeString = () => {
    let s = ''
    let curLevel = 0
    snails.forEach((c, i) => {
      const lower = c.level < curLevel
      if (curLevel !== c.level) {
        s += c.level < curLevel ? ']' : '['
        curLevel = c.level
      }
      
    //   let cont = false
    //  // console.log('>>', JSON.stringify(c.numbers))
    //   const f = c.numbers[0]
    //   if (typeof f === 'object')
    //     cont = true
    //   s += (cont ? '[':'') + c.numbers.join(',') + (cont ? ']':'')

      c.numbers.forEach(n => {
        let cont = false
        if (typeof n === 'object')
          cont = true
        s += (cont ? '[':'') + n + (cont ? ']':'') + ','
      })
      if (c.numbers.length)
        s = s.slice(0,-1)
    })

    s = s.replace("][", "],[")
    s = s.replace(/(\d)(\[)/g, '$1,$2')
    s = s.replace(/(\])(\d)/g, '$1,$2')
    s = s.replaceAll('][', '],[')

    return s
  }

  const removeLevel2 = (l, i) => {
    let found = []
    let cur = i
    
    const next = (isLeft) => isLeft ? --cur : ++cur
    const stop = (isLeft) => isLeft ? cur === 0 : cur >= snails.length

    for (; !stop(true); next(true)) {
      const s = snails[cur]
      if (s.level == l) {
        found.push(cur)
        break
      }
    }

    cur = i
    for (; !stop(false); next(false)) {
      const s = snails[cur]
      if (s.level == l) {
        found.push(cur)
        break
      }
    }
    
    found.reverse().forEach(i => {
      snails.splice(i, 1)
    })
  }

  const removeLevel = (l, isLeft) => {
    let found = []
    snails.forEach((s,i) => {
      if (s.level === l)
        found.push(i)
    })

    let toremove = []
    if (isLeft) {
      toremove = found.filter((c, i) => i < 2)
    } else {
      toremove = found.filter((c, i) => i >= 2)
    }

    if (toremove.length === 0)
      toremove = found
    
    let count = 0
    toremove.reverse().forEach(i => {
      if (count < 2)
        snails.splice(i, 1)
      ++count
    })
  }

  const split = () => {
    let index = -1
    if (!snails.some((l, i) => {
      let res = l.numbers.some(r => r > 9)
      if (res) {
        index = i
        return true
      }
    })) {
      return false
    }

    let numIndex = -1
    snails[index].numbers.some((n,i) => {
      if (n > 9) {
        numIndex = i
        return true
      }
    })
    const node = snails[index]
    const num = node.numbers[numIndex]
    const x = Math.floor(num / 2)
    const y = Math.ceil(num / 2)
    let newNums = [...node.numbers]
    newNums.splice(numIndex, 1, [x,y])
    snails.splice(index, 1, {level:4, numbers: [...newNums]})
    return true
  }

  const split2 = () => {
    let s = makeString()

    const pattern = /\d\d/
    const firstOccurrence = pattern.exec(s)
    if (!firstOccurrence) {
      return false
    }
    
    const index = firstOccurrence.index
    const num = s.slice(index, index+2)
    const x = Math.floor(num / 2)
    const y = Math.ceil(num / 2)

    const news = s.slice(0, index) + '[' + x + ',' + y + ']' + s.slice(index+2)
    parse(news)
    return true
  }

  const explode = () => {
    parse(makeString())
    
    let index = 0
    let hasExploded = false

    if (!snails.some(l => l.level > 4))
      return false

    // if (snails.some(l => l.numbers.some(r => r > 9)))
    //   return false

    const l = first(snails.filter((s, i) => {
      if (s.level === 5) {
        if (!hasExploded) {
          index = i
          hasExploded = true
        }
        return true
      }
    }))

    let [x, y] = l.numbers

    const findLeft = i => {
      while (--i >= 0) {
        const l = snails[i]
        if (l.numbers.length) {
          return [i, l]
        }
      }
      return []
    }

    const findRight= i => {
      while (++i < snails.length) {
        const l = snails[i]
        if (l.numbers.length) {
          return [i, l]
        }
      }
      return []
    }

    let newx = x
    let newy = y

    // get left if any
    let [li, left] = findLeft(index)
    if (li === undefined) {
      newx = 0
    } else {
      newx = add(x, first(left.numbers))
      if (Math.abs(left.level - l.level) > 1) {
        newx = 0
        let [xx, ...rest] = left.numbers
        left.numbers = [xx += x, ...rest]
      } else {
        removeLevel2(left.level, index)
        //left.level -= 1
      }
    }

    // get right if any
    let [ri, right] = findRight(index)
    if (ri === undefined) {
      newy = 0
    } else {
      newy = add(y, first(right.numbers))
      if (Math.abs(right.level - l.level) > 1) {
        newy = 0
        let [yy, ...rest] = right.numbers
        right.numbers = [yy += y, ...rest]
      } else {
        removeLevel2(right.level, index)
        //right.level -= 1
      }
    }

    l.numbers = [newx, newy]

    return hasExploded
  }

  const explode2 = () => {
    parse(makeString())
    
    let index = 0
    let hasExploded = false

    if (!snails.some(l => l.level > 4))
      return false

    // if (snails.some(l => l.numbers.some(r => r > 9)))
    //   return false

    const l = first(snails.filter((s, i) => {
      if (s.level === 5) {
        if (!hasExploded) {
          index = i
          hasExploded = true
        }
        return true
      }
    }))

    let [x, y] = l.numbers

    const findLeft = i => {
      while (--i >= 0) {
        const l = snails[i]
        if (l.numbers.length) {
          return [i, l]
        }
      }
      return []
    }

    const findRight= i => {
      while (++i < snails.length) {
        const l = snails[i]
        if (l.numbers.length) {
          return [i, l]
        }
      }
      return []
    }

    let newx = x
    let newy = y

    // get left if any
    let [li, left] = findLeft(index)
    let [ri, right] = findRight(index)

    newx = li === undefined ? 0 : x
    newy = ri === undefined ? 0 : y

    // if (li !== undefined) {
    //   console.log('left',left)
    //   left.numbers = [first(left.numbers) + x, 0]
    // }

    // get right if any
    
    // if (ri !== undefined) {
    //   //removeLevel2(5, index)
    //   console.log(right)
    //   right.numbers = [right.numbers[0] + y]
    // }
    // console.log(snails)

    if (li) {
      console.log(left.level)
      left.numbers = left.level === 4 ? [last(left.numbers) + x, 0] : [last(left.numbers) + x]
    }

    

    if (ri) {
      const [rx, ...rest] = right.numbers
      if (right.level === 5) {
        right.numbers = [0, [rx + x, ...rest]]
      }
      else
      right.numbers = right.level === 4 ? [rx +y, ...rest] : [first(right.numbers) + y]
    }

    // l.level = 4
    // l.numbers = [
    //   li === undefined ? 0 : last(left.numbers) + x,
    //   ri === undefined ? 0: first(right.numbers) + y
    // ]
    console.log(snails)

    //snails.splice(index-1, 3)
    snails.splice(index-2, 3)
    
    return hasExploded
  }

  // parse('[[[[0,[3,2]],[3,3]],[4,4]],[5,5]]')
  // explode2()
  // console.log(makeString())
  // return
  let left = data[0]
  for (let i = 1; i < data.length; ++i) {
    const theString = createInputString2(left, data[i])
    console.log('combne', theString)
    parse(theString)
    //console.log(snails)
    explode2()
    // console.log(snails)
    //explode2()
    // while (explode2() || split2()) {
    //   console.log(makeString())
    // }
    left = makeString()
  }
  
  //parse(makeString())
  //split()
  
  //parse(makeString())
  // split2()
  // split2()
  // split2()
  // split2()

  // parse(makeString())
  // console.log(explode())

  //parse(makeString())
  //split()
  // console.log(snails)
  // console.log(explode())
  // console.log(snails)
  // console.log(explode())
  ///console.log(snails)
  const result = makeString()
  console.log(result)
}

//solve()
console.log("Test", solve(read('./test2')))


// console.log("Test", solve('[[[[[9,8],1],2],3],4]', '[[[[0,9],2],3],4]'))
// console.log("Test", solve('[7,[6,[5,[4,[3,2]]]]]', '[7,[6,[5,[7,0]]]]'))
// console.log("Test", solve('[[6,[5,[4,[3,2]]]],1]', '[[6,[5,[7,0]]],3]'))
// console.log("Test", solve('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]', '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'))
// console.log("Test", solve('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]', '[[3,[2,[8,0]]],[9,[5,[7,0]]]]'))
// console.log("Test", solve('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]', '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]'))