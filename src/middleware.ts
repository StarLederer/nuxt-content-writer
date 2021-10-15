import * as fs from 'fs/promises'
import * as path from 'path'
import express from 'express'
import { NuxtOptions } from '@nuxt/types'
import StorageFileManager from './StorageFileManager'

const config = {
  rootDir: ''
}

//
//
// StorageFileManager
const fileManager = new StorageFileManager()

//
//
// Express

const app = express()

app.use(express.json())

//
//
// Requests

// GET request
app.get('/*', async (req, res) => {
  try {
    const dir = path.resolve(config.rootDir + req.url)
    const contents = await fs.readdir(dir)
    res.status(200).send({
      contents
    })
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      res.status(404).send({ contents: [] })
    } else {
      res.status(500).send()
    }
  }
})

// POST request
app.post('/*', async (req, res) => {
  const filePath = path.resolve(config.rootDir + req.url)
  const fileData = req.body

  try {
    const file = await fileManager.getFile(filePath)
    await file.setField(fileData.key, fileData.value)
  } catch (err) {
    res.status(500).send()
  }

  res.status(200).send()
})

// DELETE request
app.delete('/*', async (req, res) => {
  const filePath = path.resolve(config.rootDir + req.url)

  try {
    await fs.unlink(filePath)
    fileManager.unlistFile(filePath)
    res.status(200).send()
  } catch (err) { res.status(500).send() }
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
