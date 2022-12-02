import { read } from '../helpers'

/*
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0
 
fold along y=7
fold along x=5
*/
 
const m = {
  //lines to columns
}
   
let LINES = 0
let WIDTH = 0
  
const init = () => {
  for (let y = 0; y < LINES; ++y) {
    m[y] = {}
    for (let x = 0; x < WIDTH; ++x) {
      m[y][x] = ' '
    }
  }
}
  
const set = (x, y, v) => {
  m[y][x] = v
}
  
const get = (x, y) => {
  return m[y][x]
}
  
const foldy = (m, y) => {
  let j = LINES-1
  let k = 0
  for (; j > y; --j, ++k) {
    for (let z= 0; z < WIDTH; ++z) {
      const source = get(z, j) //m[j][z]
      const dest = get(z,k) //m[k][z]     
    
      set(z, k, source === '#' ? source : dest)
      //m[k][z] = source === '#' ? source : dest
    }
  }
  
  LINES = Math.floor(LINES / 2)
}
  
const foldx = (m, x) => {
  for (let j = 0; j < LINES; ++j) {
    let a = WIDTH-1
    let b = 0
    for (; a > x; --a, ++b) {
      const source = get(a, j)//m[j][a]
      const dest = get(b, j)//m[j][b]     
      set(b, j, source === '#' ? source : dest)
      //m[j][b] = source === '#' ? source : dest
    }
  }
  
  WIDTH = Math.floor(WIDTH / 2)
}
  
  
const print = () => {
  for (let y = 0; y < LINES; ++y) {
    let line = ''
    for (let x = 0; x < WIDTH; ++x) {
      line += m[y][x]
    }
    console.log(line)
  }
}
  
  /*
   
         |
    01234567890
  0 ...#..#..#.
  1 ....#......
  2 ...........
  3 #..........
  4 ...#....#.#
  5 ...........
  6 ...........
  7 ........... <---
  8 ........... 6
  9 ........... 5
  0 .#....#.##. 4
  1 ....#...... 3
  2 ......#...# 2
  3 #.......... 1
  4 #.#........ 0
   
  */

const solve = data => {
  let emptyPos = 0
  data.some((l, i) => {
    if (l.trim() === '') {
      emptyPos = i
      return true
    }
  })
  const positions = data.slice(0, emptyPos)
  const folds = data.slice(emptyPos+1)

  let foundY = false
  let foundX = false
  folds.forEach(l => {
    const [op, v] = l.substring(11).split('=')
    if (op === 'y' && !foundY) {
      LINES = v * 2 + 1
      foundY = true
    }
    else if (op === 'x' && !foundX) {
      WIDTH = v * 2 + 1
      foundX = true
    }
  })

  init()

  positions.forEach(l => {
    const [x, y] = l.split(',')

    //fold along x=655
    //fold along y=447
    set(x, y, '#')
  })

  folds.forEach(l => {
    const [op, v] = l.substring(11).split('=')
    if (op === 'y') {
      foldy(m, v)
    } else {
      foldx(m, v)
    }
  })

  let sum = 0
  for (let y = 0; y < LINES; ++y) {
    for (let x = 0; x < WIDTH; ++x) {
      sum += (get(x, y) === '#' ? 1 : 0)
    }
  }
  
  console.log(sum)

  // print()
  // foldy(m, 7)
  // foldx(m, 5)
  print()
 
  const result = 0
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))