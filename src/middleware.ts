import * as fs from 'fs/promises'
import * as path from 'path'
import express from 'express'
import { NuxtOptions } from '@nuxt/types'
import objectPath from 'object-path'
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

// GET .json handler
async function jsonHandler (req: express.Request, res: express.Response) {
  try {
    const filePath = path.resolve(config.rootDir + req.path)
    const fileExists = await fileManager.checkFileExists(filePath)

    if (fileExists) {
      const file = fileManager.getFile(filePath)
      const fileData = await file.getData()

      // Get keys from query ?key=example
      const keys = req.query.key

      if (keys) {
        // We have received at least one key
        function getFromFileData (key: string): any {
          const value = objectPath.get(fileData, key)
          return value
        }

        if (Array.isArray(keys)) {
          // Keys is an array ?key=example1&key=example2
          const values = []
          for (let i = 0; i < keys.length; ++i) {
            values[i] = getFromFileData(keys[i] as string)
          }
          res.status(200).send({ values })
        } else {
          // Keys is a single key
          res.status(200).send({ value: getFromFileData(keys as string) })
        }
      } else {
        // We have not received any keys
        res.status(200).send(fileData)
      }
    } else {
      res.status(404).send({})
    }
  } catch (err: any) {
    res.status(500).send({ err: 'err' })
  }
}

// GET dir handler
async function dirHandler (req: express.Request, res: express.Response) {
  try {
    const dir = path.resolve(config.rootDir + req.path)
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
}

// GET request
app.get('/*', async (req, res) => {
  if (/\.json/.test(req.path)) {
    // requested a .json url
    await jsonHandler(req, res)
  } else {
    // requested anything else
    await dirHandler(req, res)
  }
})

// POST request
app.post('/*', async (req, res) => {
  const filePath = path.resolve(config.rootDir + req.path)
  const fileData = req.body

  try {
    const file = fileManager.getFile(filePath)
    await file.setField(fileData.key, fileData.value)
  } catch (err) {
    res.status(500).send()
  }

  res.status(200).send()
})

// DELETE request
app.delete('/*', async (req, res) => {
  const filePath = path.resolve(config.rootDir + req.path)

  try {
    await fs.unlink(filePath)
    fileManager.unlistFile(filePath)
    res.status(200).send()
  } catch (err) {
    res.status(500).send()
  }
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
