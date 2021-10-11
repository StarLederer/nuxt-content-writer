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
  const fileDir = path.dirname(filePath)
  const fileData = req.body

  try {
    // Create fileDir if it does not exists
    try {
      fs.access(fileDir)
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        fs.mkdir(fileDir)
      } else {
        res.status(500).send()
        return
      }
    }

    // Write file
    await fs.writeFile(filePath, JSON.stringify(fileData))
    res.status(200).send()
  } catch (err) {
    res.status(500).send()
  }
})

// DELETE request
app.delete('/*', async (req, res) => {
  const filePath = path.resolve(config.rootDir + req.url)

  try {
    await fs.unlink(filePath)
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
