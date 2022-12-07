import { readFileSync } from 'fs'

export const read = file => {
  const text = readFileSync(file).toString('utf-8')
  return text.split('\n')
}

const solve = lines => {
  let currentPath = undefined
  let disk = {
  }

  const up = () => {
    const i = currentPath.lastIndexOf('/')
    currentPath = currentPath.slice(0, Math.max(1, i))
  }

  const cd = name => {  
    if (!currentPath)
      currentPath = name
    else {
      if (currentPath == '/') 
        currentPath += name
      else
        currentPath += '/' + name
    }

    if (!disk[currentPath]) {
      disk[currentPath] = { files: [], dirs: [] }
    }
  } 

  const exec = s => {
    const [ cmd, arg ] = s.split(' ')
    switch (cmd) {
      case 'cd':
        if (arg === '..') {
          up()
        } else {
          cd(arg)
        }
        break
      default:
        // ignore ls
        break
    }
  }
  const addDir = s => disk[currentPath].dirs.push(s)
  const addFile = (size, name) => disk[currentPath].files.push({ size, name })

  lines.forEach(line => {
    if (line.length) {
      switch (line[0]) {
        case '$':
          exec(line.slice(2).trim())
          break
        case 'd':
          addDir(line.slice(3).trim())
          break
        default:
          const [ size, name ] = line.split(' ')
          addFile(parseInt(size), name)
      }
    }
  })

  currentPath = undefined
  const sum = p => {
    cd(p)
    
    let dirsum = 0
    disk[currentPath].dirs.forEach(sd => {
      dirsum += sum(sd)
    })
    
    dirsum += disk[currentPath].files.reduce((acc, f) => acc + f.size, 0)

    disk[currentPath].size = dirsum
    up()
    return dirsum
  }

  sum('/')

  const unusedSpace = 70000000 - disk['/'].size
  const toDelete = 30000000 - unusedSpace
  
  const candidates = Object.values(disk)
      .map(d => d.size)
      .filter(d => d >= toDelete)
      .sort((a, b) => a - b)

  return candidates[0]
}

console.log(`Result: ${solve(read('test'))}`)
console.log(`Result: ${solve(read('input'))}`)