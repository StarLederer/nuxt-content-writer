import StorageFile from './StorageFile'

class StoregaFileManager {
    filePaths: string[]
    files: StorageFile[]

    constructor () {
      this.filePaths = []
      this.files = []
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
}

export default StoregaFileManager
