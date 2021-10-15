import fs from 'fs/promises'
import path from 'path'

class StorageFile {
    private filePath: string
    private fileDir: string
    private fileData: any

    constructor (filePath: string) {
      this.filePath = filePath
      this.fileDir = path.dirname(filePath)
      this.fileData = {}
    }

    async setField (key: string, value: any) {
      this.fileData[key] = value
      await this.saveFile()
    }

    async saveFile () {
    // Create fileDir if it does not exists
      try {
        fs.access(this.fileDir)
      } catch (err: any) {
        if (err.code === 'ENOENT') {
          fs.mkdir(this.fileDir)
        } else {
          throw new Error('Failed to access file')
        }
      }

      // Write file
      await fs.writeFile(this.filePath, JSON.stringify(this.fileData))
    }
}

export default StorageFile
