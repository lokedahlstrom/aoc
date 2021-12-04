const calc = arr => arr.reduce((acc, curr, i) => acc + (curr > arr[i-1] ? 1 : 0), 0)
