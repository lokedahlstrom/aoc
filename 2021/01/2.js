const test = [ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ]

const calc = arr => arr.reduce((acc, curr, i) => acc + (curr > arr[i-1] ? 1 : 0), 0)

const slidingWindow = window => arr => arr.map((x, i) => arr.slice(i, i + window)).filter(x => x.length === window)

const sum = arr => arr.reduce((acc, x) => acc + x, 0)

const triplets = slidingWindow(3)

calc(triplets(daInput).map(sum))

//1497
