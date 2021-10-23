import fs from 'fs/promises'
import path from 'path'

class StorageFile {
  private hasLoaded = false;

  private filePath: string;
  private fileDir: string;
  private fileData: any;

  constructor (filePath: string) {
    this.filePath = filePath
    this.fileDir = path.dirname(filePath)
    this.fileData = {}

    fs.readFile(this.filePath, 'utf8')
      .then((res) => {
        this.fileData = JSON.parse(res)
      })
      .catch(() => {
        throw new Error(`Failed to read file ${this.filePath}`)
      })
      .finally(() => {
        this.hasLoaded = true
      })
  }

  async setField (key: string, value: any) {
    this.fileData[key] = value
    await this.saveFile()
  }

  async getData () {
    while (!this.hasLoaded) {
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    return this.fileData

    // For some reason, this does not work
    // hasLoaded is false at the time of checking the if statement
    // but then it turns out that the promise is already fulfilled.
    // I gues it getst fulfilled jsut between the two operations somehow
    // if (this.hasLoaded) {
    //   return this.fileData
    // } else {
    //   const res = JSON.parse(await this.load)
    //   return res
    // }
  }

  async saveFile () {
    // Create fileDir if it does not exists
    try {
      fs.access(this.fileDir)
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        fs.mkdir(this.fileDir)
      } else {
        throw new Error(`Failed make directory ${this.fileDir}`)
      }
    }

    // Write file
    await fs.writeFile(this.filePath, JSON.stringify(this.fileData))
  }
}

export default StorageFile
