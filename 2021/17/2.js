import { first, last } from '../helpers'

const solve = ([ x1, x2 ], [ y1, y2 ]) => {
  const MAXT = 500
  let count = 0

  const target = {
    x: [x1, x2],
    y: [y1, y2]
  }

  const throwProjectile = (vx, vy) => {
    const b = { x:0, y:0}

    for (let t = 0; t < MAXT; ++t) {
      // adjust projectile position
      b.x += vx 
      b.y += vy

      if (b.x >= first(target.x) && b.x <= last(target.x) && b.y <= last(target.y) && b.y >= first(target.y)) {
        return true
      }

      // adjust velocity
      vx = Math.max(vx - 1, 0)
      vy -= 1
    }

    return false
  }

  const bruteForce = () => {
    for (let x = 0; x < 350; ++x) {
      for (let y = -100; y < 100; ++y) {
        if (throwProjectile(x, y)) {
          ++count
        }
      }
    }
  }

  bruteForce()
  return `Result: ${count}`
}

console.log("Test", solve([20, 30], [-10, -5]))
console.log("Data", solve([277, 318], [-92, -53]))