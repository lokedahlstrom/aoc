import { read } from '../helpers'

const decodeRow = d => {
  const [_, signal_input] = d.split('|')
  const signals = signal_input.trim().split(' ')
  return signals.filter(a => 
    a.length === 2 ||
    a.length === 3 || 
    a.length === 4 || 
    a.length === 7
  ).length
}

const solve = data => {
  const result = data.reduce((acc, r) => acc + decodeRow(r), 0)
  return `Result: ${result}`
}

console.log("Test", solve(read('./test')))
console.log("Data", solve(read('./data')))