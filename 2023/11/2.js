import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const sum = (acc, x) => acc + x
const splitString = a => a.split('')
const getGalaxies = counter => (dict, r, y, expRow, expCol) => {
  r.forEach((c, x) => {
    if (c === '#') {
      let ny = y
      let nx = x
      expCol.forEach(p => {
        if (x > p)
          nx += 1000000 - 1
      })
      expRow.forEach(p => {
        if (y > p)
          ny += 1000000 - 1
      })

      dict[++counter] = [ny,nx]
    }
  })
}

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

const expandV = lines => {
  let indices = []
  for (let y = 0; y < lines[0].length; ++y) {
    if (lines[y].split('').every(c => c === '.'))
     indices.push(y)
  }

  return indices.reverse()
}

const expandH = lines => {
  let indices = []
  for (let x = 0; x < lines[0].length; ++x) {
   if (lines.every(l => l[x] === '.'))
    indices.push(x)
  }

  return indices.reverse()
}

const solve = lines => {
  const rowExpansionIndices = expandV(lines)
  const colExpansionIndices = expandH(lines)
  const matrix = lines.map(splitString)
  const countedGalaxyHarvester = getGalaxies(0)
  const galaxies = {}
  matrix.forEach((row, y) => countedGalaxyHarvester(galaxies, row, y, rowExpansionIndices, colExpansionIndices))

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
