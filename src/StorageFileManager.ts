import StorageFile from './StorageFile'

class StorageFileManager {
  private filePaths: string[];
  private files: StorageFile[];

  constructor () {
    this.filePaths = []
    this.files = []
  }

  async getFile (filePath: string) {
    const i = this.filePaths.indexOf(filePath)
    if (i >= 0) {
      return this.files[i]
    }

    const newFile = new StorageFile(filePath)
    await newFile.loadFile()
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
