const fs = require('fs')

const read = file => {
  const text = fs.readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const lines = read('./data5')