import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const insertAt = (s, i, c) => s.slice(0, i) + c + s.slice(i)
const sum = (acc, x) => acc + x
const splitString = a => a.split('')
const getGalaxies = counter => (dict, r, y) => 
  r.forEach((c, x) => c === '#' ? dict[++counter] = [y, x] : null)

const uniquePairs = a => {
  let set = new Set()
  const count = a.length
  for (let i = 0; i < count; ++i) {
    for (let j =0; j < count; ++j) {
      if (i !== j) {
        const foo = [a[i], a[j]]
        foo.sort()
        set.add(foo[0]+"#"+foo[1])
      }
    }
  }

  return [...set]
}

const makeSquare = (lines, w) => {
  let newLines = []
  lines.forEach(l => {
    if (l.length < w) {
      l += (new Array(w - l.length).fill('.').join(''))
    }
    newLines.push(l)
  })
  return newLines
}

const widest = lines => {
  let max = 0
  lines.forEach(l => max = Math.max(max, l.length))
  return max
}

const expandV = lines => {
  let indices = []
  for (let y = 0; y < lines[0].length; ++y) {
    if (lines[y].split('').every(c => c === '.'))
     indices.push(y)
  }

  indices.reverse().forEach(i => {
    lines.splice(i, 0, lines[i])
  })

  return lines
}

const expandH = lines => {
  let indices = []
  for (let x = 0; x < lines[0].length; ++x) {
   if (lines.every(l => l[x] === '.'))
    indices.push(x)
  }

  indices.reverse()
  for (let y = 0; y < lines.length; ++y) {
    indices.forEach(i => {
      lines[y] = insertAt(lines[y], i, '.')
    })
  }
  
  return lines
}

const solve = lines => {
  const square = makeSquare(lines, widest(lines))
  const expanded = expandH(expandV(lines))
  const matrix = expanded.map(splitString)
  const countedGalaxyHarvester = getGalaxies(0)
  const galaxies = {}
  matrix.forEach((row, y) => countedGalaxyHarvester(galaxies, row, y))

  const pairs = uniquePairs(Object.keys(galaxies))

  const distances = pairs.map((p, i) => {
    const ids = p.split('#')
    const from = galaxies[ids[0]]
    const to = galaxies[ids[1]]

    const distance = Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1])
    return distance
  })

  return distances.reduce(sum)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
