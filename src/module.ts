import * as fs from 'fs/promises'
import * as path from 'path'
import { Module, NuxtOptions } from '@nuxt/types'
import { name, version } from '../package.json'
import { getMiddleware } from './middleware'

export interface ModuleOptions {}
const CONFIG_KEY = 'nuxtEditor'

class ContentEditor {
  rootDir: string = '';

  constructor (rootDir: string) {
    this.rootDir = rootDir
  }

  async testFile () {
    await fs.writeFile(path.resolve(this.rootDir, 'editor/test-file.txt'), 'Test')
  }
}

const nuxtModule: Module<ModuleOptions> = function () {
  const options: NuxtOptions = this.nuxt.options

  if (!options.dev) { return }

  const rootDir = options.rootDir
  const $editor = new ContentEditor(rootDir)

  this.nuxt.$editor = $editor

  this.addServerMiddleware({
    path: '/_editor',
    handler: getMiddleware(options.rootDir)
  })

  this.addTemplate({
    fileName: 'editor/SelectFile.vue',
    src: require.resolve('./templates/SelectFile.vue')
  })

  this.addPlugin({
    fileName: 'editor/test.js',
    src: require.resolve('./templates/plugin'),
    options: {
      $editor
    }
  })
}

;(nuxtModule as any).meta = { name, version }

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]?: Partial<ModuleOptions>;
  } // Nuxt 2.14+
}

export default nuxtModule
