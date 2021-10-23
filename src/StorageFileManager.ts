import fs from 'fs/promises'
import StorageFile from './StorageFile'

class StorageFileManager {
  private filePaths: string[];
  private files: StorageFile[];

  constructor () {
    this.filePaths = []
    this.files = []
  }

  async checkFileExists (filePath: string) : Promise<boolean> {
    try {
      await fs.stat(filePath)
      return true
    } catch (err) { }

    return false
  }

  getFile (filePath: string) {
    const i = this.filePaths.indexOf(filePath)
    if (i >= 0) {
      return this.files[i]
    }

    const newFile = new StorageFile(filePath)
    this.files.push(newFile)
    this.filePaths.push(filePath)

    return newFile
  }

  unlistFile (filePath: string) {
    const i = this.filePaths.indexOf(filePath)
    if (i >= 0) {
      this.filePaths.splice(i, 1)
    }
  }
}

export default StorageFileManager
