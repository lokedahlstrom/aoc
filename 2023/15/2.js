import { readFileSync } from 'fs'

const GroupLabel = 1
const GroupOperation = 2
const GroupNumber = 3

const read = file => readFileSync(file).toString('utf-8')
const first = a => a.at(0)
const last = a => a.at(-1)

const hash = s => {
  return s.split('').reduce((acc, c) => {
    acc += c.charCodeAt(0)
    acc *= 17
    acc %= 256
    return acc
  }, 0)
}

const getBox = (boxes, label) => {
  const hashedLabel = hash(label)
  if (boxes[hashedLabel] === undefined) {
    boxes[hashedLabel] = []
  }
  return boxes[hashedLabel]
}

const getLabelFocal = (label, focalLength) => label + ' ' + focalLength
const isLabel = (s, label) => s.substring(0, label.length) === label

const executeEqual = (boxes, label, focalLength) => {
  const box = getBox(boxes, label)

  let idx = -1
  for (let i = 0; i < box.length; ++i) {
    if (isLabel(box[i], label)) {
      idx = i
      break
    }
  }

  const hashed = hash(label)
  const newLabel = getLabelFocal(label, focalLength)
  if (idx !== -1) {
    boxes[hashed][idx] = newLabel 
  } else {
    boxes[hashed].push(newLabel)
  }
}

const executeMinus = (boxes, label) => {
  const box = getBox(boxes, label)
  boxes[hash(label)]= box.filter(l => !isLabel(l, label))
}

const solve = line => {
  const boxes = {}
  line.split(',').forEach(s => {
    const matches     = first([...s.matchAll(/(\w+)([\-\=])(\d+)?/g)])
    const label       = matches[GroupLabel]
    const operation   = matches[GroupOperation]
    const focalLength = matches[GroupNumber]

    switch (operation) {
      case '=':
        executeEqual(boxes, label, focalLength)
        break
      case '-':
        executeMinus(boxes, label)
        break
    }
  })

  return Object.keys(boxes).reduce((sum, k) => {
    return sum + boxes[k].reduce((acc, cur, idx) => {
      return acc + (Number(k)+1) * (idx+1) * last(cur.split(' '))
    }, 0)
  }, 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
