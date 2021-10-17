import { Module, NuxtOptions } from '@nuxt/types'
import { name, version } from '../package.json'
import { getMiddleware } from './middleware'

export interface ModuleOptions {}
const CONFIG_KEY = 'nuxtEditor'

const nuxtModule: Module<ModuleOptions> = function () {
  const options: NuxtOptions = this.nuxt.options

  if (options.dev) {
    // Add dev css
    this.addTemplate({
      fileName: 'editor/style.scss',
      src: require.resolve('./templates/style.scss')
    })

    // Server middleware
    this.addServerMiddleware({
      path: '/_editor',
      handler: getMiddleware(options)
    })

    // Dev editor components
    this.addTemplate({
      fileName: 'editor/SelectFile.dev.vue',
      src: require.resolve('./templates/SelectFile.dev.vue')
    })

    this.addTemplate({
      fileName: 'editor/SelectFiles.dev.vue',
      src: require.resolve('./templates/SelectFiles.dev.vue')
    })

    // Dev plugin
    this.addPlugin({
      fileName: 'editor/plugin.js',
      src: require.resolve('./templates/plugin.dev')
    })
  } else {
    // Production editor component (empty)
    this.addTemplate({
      fileName: 'editor/Empty.prod.vue.js',
      src: require.resolve('./templates/Empty.prod.vue')
    })

    // Production plugin
    this.addPlugin({
      fileName: 'editor/plugin.js',
      src: require.resolve('./templates/plugin.prod')
    })
  }
}

;(nuxtModule as any).meta = { name, version }

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]?: Partial<ModuleOptions>;
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]?: Partial<ModuleOptions>;
  } // Nuxt 2.9 - 2.13
}

export default nuxtModule
