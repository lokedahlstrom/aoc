import { first, last } from '../helpers'

const solve = ([ x1, x2 ], [ y1, y2 ]) => {
  const MAXT = 500

  const target = {
    x: [x1, x2],
    y: [y1, y2]
  }

  const throwProjectile = (vx, vy) => {
    const b = { x:0, y:0}
    let maxY = 0

    let result = []

    for (let t = 0; t < MAXT; ++t) {
      // adjust projectile position
      b.x += vx 
      b.y += vy

      maxY = Math.max(b.y, maxY)

      if (b.x >= first(target.x) && b.x <= last(target.x) && b.y <= last(target.y) && b.y >= first(target.y)) {
        return maxY
      }

      // adjust velocity
      vx = Math.max(vx - 1, 0)
      vy -= 1
    }

    return 0
  }

  const bruteForce = () => {
    let maxY = 0
    for (let x = 0; x < 318; ++x) {
      for (let y = 0; y < 500; ++y) {
        const result = throwProjectile(x, y)
        if (result !== undefined) {
          maxY = Math.max(maxY, result)
        }
      }
    }

    return maxY
  }

  const result = bruteForce()
  return `Result: ${result}`
}

console.log("Test", solve([20, 30], [-10, -5]))
console.log("Data", solve([277, 318], [-92, -53]))