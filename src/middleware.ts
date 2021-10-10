import * as fs from 'fs/promises'
import * as path from 'path'
import express from 'express'

const app = express()

app.get('/', (_req, res) => {
  res.json({ it: 'works!' })
})

app.post('/', (_req, res) => {
  fs.writeFile(path.resolve(config.rootDir, 'editor/test.txt'), 'test 2')
  res.send('test')
})

const config = {
  rootDir: ''
}

function getMiddleware (rootDir: string) {
  config.rootDir = rootDir

  return {
    handle: app
  }
}

export { getMiddleware }
