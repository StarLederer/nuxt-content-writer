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
app.post('/*', async (req, res) => {
  const filePath = path.resolve(config.rootDir + req.url)
  const fileData = req.body

  await fs.writeFile(filePath, JSON.stringify(fileData))
  res.status(200)
})

// DELETE request

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
