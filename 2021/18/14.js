import { get } from 'lodash'

const digit = c => c >= '0' && c <= '9'

const input = '[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]'

let snails = []


const add = (level, reg, left) => ({ level, reg, left })
const first = v => v[0]
const last = v => v[v.length-1]

const data = input.split('')

const parseLevel = 

const parse = (data, level, left) => {
  console.log(data, level, left)
  if (data === null || data === undefined || level === 1) 
    return
  data.forEach((c, i) => {
    switch (c) {
      case '[':
        parse(data.slice(i+1), level+1, true)
        return
      case ',':
        parse(data.slice(i+1), level-1, false)
        return
      case ']':
        return
    }

    if (digit(c)) {
      snails.push(add(level, parseInt(c), left))
      return
    }
  })
}

const explode = () => {
  let index = -1
  if (!snails.some((x, i) => {
    index = i
    return x.level === 5
  })) {
    console.log('no explode needed')
    return false
  }

  const boom1 = snails[index]
  const boom2 = snails[index+1]
  snails.splice(index+1, 1)

  const left = snails[index-1]
  const right = snails[index+1]

  const x = boom1.reg
  const y = boom2.reg

  if (left) {
    left.reg += x
  }
  if (right) {
    right.reg += y
  }

  boom1.level -= 1
  boom1.reg = 0

  return true
}

const times = (c, n) => {
  let s = ''
  for (let i = 0; i < n; ++i) {
    s += c
  }

  if (c === ']')
    s += ','
  return s
}

const makeString = () => {
  let s = ''
  let prev = snails[0]
  s += times('[', prev.level) + prev.reg + ','
  for (let i = 1; i < snails.length; ++i) {
    let node = snails[i]
    let next = snails[i+1]

    if (node.level === prev.level && !prev.left && node.left) {
      s += '],['
    }

    // if (next && next.level === node.level && node.left && !next.left) {
    //   s += '/'
    // }

    let diff = node.level - prev.level
    const p = diff < 0 ? ']' : '['
    s += times(p, Math.abs(diff)) //+ (diff > 0 ? ',' : '')

    if (diff && !prev.left && node.left) {
      s += '],['
    }

    s += node.reg + ','

    // if (node.left !== prev.left && node.level == prev.level) {

    // } else {
    //   s += '],'
    // }

   

    // if (prev.left && !node.left && prev.level === node.level) {
    //   s += '],'
    // }

    prev = node
  }
  s += times(']', prev.level)
  s = s.replaceAll(',]', ']')

  return s.slice(0, -1)
}
parse(data, 0, true)
console.log(snails)
console.log(makeString())
explode()

