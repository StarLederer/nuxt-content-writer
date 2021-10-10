import * as fs from 'fs/promises'
import * as path from 'path'
import express from 'express'
import { NuxtOptions } from '@nuxt/types'

const config = {
  rootDir: ''
}

const app = express()

app.use(express.json())

//
//
// Requests

// GET request
app.get('/*', async (req, res) => {
  const contents = await fs.readdir(path.resolve(config.rootDir + req.url))
  res.status(200).send({
    contents
  })
})

// POST request
app.post('/*', (req, res) => {
  const filePath = req.body.path.replace(/\.[^/.]+$/, '')
  fs.writeFile(
    path.resolve(config.rootDir, 'homepageArticle.json'),
    JSON.stringify({ article: filePath })
  )
  res.status(200)
})

//
//
// Export
function getMiddleware (nuxtOptions: NuxtOptions) {
  config.rootDir = nuxtOptions.rootDir + '/content'

  return {
    handle: app
  }
}

export { getMiddleware }
