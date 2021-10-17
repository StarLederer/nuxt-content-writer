import fs from 'fs/promises'
import path from 'path'

class StorageFile {
  private hasLoaded = false;

  private filePath: string;
  private fileDir: string;
  private fileData: any;
  private load: Promise<any>;

  constructor (filePath: string) {
    this.filePath = filePath
    this.fileDir = path.dirname(filePath)
    this.fileData = {}

    this.load = fs.readFile(this.filePath, 'utf8')
    this.load.then((res) => {
      this.hasLoaded = true
      this.fileData = JSON.parse(res)
    })
    this.load.catch(() => {
      this.hasLoaded = true
      // if (err.code !== 'ENOENT') {
      //   throw new Error(`Failed to read file ${this.filePath}`)
      // }
    })
  }

  async setField (key: string, value: any) {
    this.fileData[key] = value
    await this.saveFile()
  }

  async getData () {
    if (this.hasLoaded) {
      return this.fileData
    } else {
      const res = JSON.parse(await this.load)
      return res
    }
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
