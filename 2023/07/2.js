import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const FiveOfAKind = 7
const FourOfAKind = 6
const FullHouse = 5
const ThreeOfAKind = 4
const TwoPair = 3
const Pair = 2
const HighCard = 1

const ranks = [ 'J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A' ]

const faceToRank = {
  'J': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
  '8': 7,
  '9': 8,
  'T': 9,
  'Q': 10,
  'K': 11,
  'A': 12
}

const compareCard = (l, r) => faceToRank[l] - faceToRank[r]

const rankHand = h => {
  const frequencies = Array(13).fill(0)
  h.forEach(c => frequencies[faceToRank[c]]++)
  let numPairs = 0
  let hasThree = false
  let hasFour = false
  let hasFive = false
  let pairs = []

  frequencies.forEach((f, i) => {
    switch (f) {
      case 1:
        break
      case 2:
        numPairs++
        pairs.push(ranks[i])
        break
      case 3:
        hasThree = true
        break
      case 4:
        hasFour = true
        break
      case 5:
        hasFive = true
        break
    }
  })

  const jokers = frequencies[faceToRank['J']]

  if (hasFive)
    return FiveOfAKind
  if (hasFour) {
    if (jokers)
      return FiveOfAKind
    return FourOfAKind
  }
  if (hasThree && numPairs === 1) {
    if (jokers)
      return FiveOfAKind
    return FullHouse
  }
  if (hasThree) {
    if (jokers)
      return FourOfAKind
    return ThreeOfAKind
  }
  if (numPairs === 2) {
    if (jokers === 1)
      return FullHouse
    if (jokers === 2)
      return FourOfAKind
    return TwoPair
  }
  if (numPairs === 1) {
    if (jokers)
      return ThreeOfAKind
    return Pair
  }

  if (jokers)
    return Pair
  return HighCard
}

const compareHighCard = (al, ar) => {
  let i = 0
  while (i < al.length && compareCard(al[i], ar[i]) === 0)
    ++i
  return compareCard(al[i], ar[i])
}

const compareHand = (l, r) => {
  const rankLeft = rankHand(l)
  const rankRight = rankHand(r)

  if (rankLeft < rankRight)
    return -1
  if (rankLeft > rankRight)
    return 1

  // resolve tie
  return compareHighCard(l, r)
}

const solve = input => {
  const hands = input.map(line => line.split(' '))
    .map(h => {
      const hand = h[0].split('')
      const bid = Number(h[1])
      return [hand, bid]
    })
    .sort((l, r) => compareHand(l[0], r[0]))
  
  return hands.reduce((acc, h, i) => acc + (i+1) * h[1], 0)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
