import { read, ints, range } from '../helpers'

class Fish {
  constructor(timer) {
    this.timer = timer
  }
  spawn() {
    this.timer = 6
    return new Fish(8)
  }
  tick() {
    if (this.timer === 0) {
      this.timer = 6
    } else {
      this.timer = this.timer - 1
    }
  }
}

const solve = data => {
  data = ints(data).flat()
  const days = 80
  let result = 0
  let fish = data.map(d => new Fish(d))
  

  range(days).forEach(d => {
    fish.forEach(f => {
      if (f.timer === 0) {
        fish.push(new Fish(8))
      }
      f.tick()
    })
  })

  result = fish.length  
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))
