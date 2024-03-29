import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const first = a => a.at(0)
const toNumber = s => Number(s)
const notEmpty = s => s.trim() !== ''
const isDigit = c => c >= '0' && c <= '9'
  
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

const getDestination = (key, dict) => {
  const keys = Object.keys(dict)
  const source = Number(key)
  let res = source

  keys.map(toNumber).some(k => {
    const { destination, range } = dict[k]
    const num = Number(k)

    if (source >= num && source <= (num + range)) {
      const delta = source - num
      res = destination + delta
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

  const seeds = lines[0].substring(7).split(' ')

  let start = 2
  start = getSectionMap(lines, start, seedToSoil)
  start = getSectionMap(lines, start+1, soilToFertilizer)
  start = getSectionMap(lines, start+1, fertilizerToWater)
  start = getSectionMap(lines, start+1, waterToLight)
  start = getSectionMap(lines, start+1, lightToTemperature)
  start = getSectionMap(lines, start+1, temperatureToHumidity)
  start = getSectionMap(lines, start+1, humidityToLocation)

  const res = seeds.map(seed => {
    const soil  = getDestination(seed, seedToSoil)
    const fert  = getDestination(soil, soilToFertilizer)
    const water = getDestination(fert, fertilizerToWater)
    const light = getDestination(water, waterToLight)
    const temp  = getDestination(light, lightToTemperature)
    const humid = getDestination(temp, temperatureToHumidity)
    const loc   = getDestination(humid, humidityToLocation)

    return loc
  })

  return Math.min(...res)
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)
