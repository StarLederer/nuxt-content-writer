import { Module, NuxtOptions } from '@nuxt/types'
import { name, version } from '../package.json'
import { getMiddleware } from './middleware'

export interface ModuleOptions {}
const CONFIG_KEY = 'nuxtEditor'

const nuxtModule: Module<ModuleOptions> = function () {
  const options: NuxtOptions = this.nuxt.options

  if (!options.dev) {
    return
  }

  this.addServerMiddleware({
    path: '/_editor',
    handler: getMiddleware(options)
  })

  this.addTemplate({
    fileName: 'editor/SelectFile.vue',
    src: require.resolve('./templates/SelectFile.vue')
  })

  this.addPlugin({
    fileName: 'editor/test.js',
    src: require.resolve('./templates/plugin')
  })
};
(nuxtModule as any).meta = { name, version }

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]?: Partial<ModuleOptions>;
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]?: Partial<ModuleOptions>;
  } // Nuxt 2.9 - 2.13
}

export default nuxtModule
