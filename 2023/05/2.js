import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const toNumber = s => Number(s)
const notEmpty = s => s.trim() !== ''
const isDigit = c => c >= '0' && c <= '9'
const isEven = n => n % 2 === 0

class Range {
  constructor(low, range) {
    this.low = low
    this.high = low + range
  }

  in(other) {
    return this.low >= other.low && this.high <= other.high
  }

  print() {
    return '[' + this.low + ', ' + this.high + ']'
  }
}
  
const getSectionMap = (lines, start, dict) => {
  let line = lines[start]
  while (line && isDigit(line[0])) {
    const numbers = line.split(' ')
    const destination = Number(numbers[0])
    const source = Number(numbers[1])
    const range = Number(numbers[2])

    dict[source] = {
      destination,
      range
    }

    line = lines[++start]
  }

  return start
}

const getDestination = (seedRange, dict) => {
  const keys = Object.keys(dict)
  let res = seedRange

  keys.map(toNumber).some(k => {
    const { destination, range } = dict[k]
    const num = Number(k)
    const sourceRange = new Range(num, range)
    //const destRange = new Range(destination, range)
    const delta = destination - num
    console.log('delta', delta)

    if (seedRange.in(sourceRange)) {
      res = new Range(destination + delta, 0)
      return true
    }

    return false
  })

  return res
}

const solve = input => {
  const lines = input.filter(notEmpty)
  
  const seedToSoil = {}
  const soilToFertilizer = {}
  const fertilizerToWater = {}
  const waterToLight = {}
  const lightToTemperature = {}
  const temperatureToHumidity = {}
  const humidityToLocation = {}

  const seeds = lines[0].substring(7)
    .split(' ')
    .map(toNumber)
    .reduce((acc, cur, i, arr) => {
      if (isEven(i)) {
        acc.push(arr.slice(i, i + 2))
      }
      return acc
    }, [])

  let start = 2
  start = getSectionMap(lines, start, seedToSoil)
  start = getSectionMap(lines, start+1, soilToFertilizer)
  start = getSectionMap(lines, start+1, fertilizerToWater)
  start = getSectionMap(lines, start+1, waterToLight)
  start = getSectionMap(lines, start+1, lightToTemperature)
  start = getSectionMap(lines, start+1, temperatureToHumidity)
  start = getSectionMap(lines, start+1, humidityToLocation)

  //  const res = seeds.map(pair => {
  //   const range = new Range(pair[0], pair[1])
  //   console.log(range.print())
  //   const soil  = getDestination(range, seedToSoil)
  //   console.log('soil', soil.print())
  //   const fert  = getDestination(soil, soilToFertilizer)
  //   const water = getDestination(fert, fertilizerToWater)
  //   const light = getDestination(water, waterToLight)
  //   const temp  = getDestination(light, lightToTemperature)
  //   const humid = getDestination(temp, temperatureToHumidity)
  //   return getDestination(humid, humidityToLocation)
  // })

    const range = new Range(79, 14)
    const soil  = getDestination(range, seedToSoil)
    console.log('soilToFertilizer')
    const fert  = getDestination(soil, soilToFertilizer)
    console.log('fertilizerToWater')
    const water = getDestination(fert, fertilizerToWater)
    console.log('waterToLight')
    const light = getDestination(water, waterToLight)
    console.log('lightToTemperature')
    const temp  = getDestination(light, lightToTemperature)
    console.log('temperatureToHumidity')
    const humid = getDestination(temp, temperatureToHumidity)
    console.log('humidityToLocation')
    const loc   = getDestination(humid, humidityToLocation)

  console.log(soil.low, fert.low, water.low, light.low, temp.low, humid.low, loc.low)

  // res.sort((a,b) => a.low - b.low)
  // console.log(res)
}

console.log(`Result: ${solve(read('test'))}`)
//console.log(`Result: ${solve(read('input'))}`)
