import { Module, NuxtOptions } from '@nuxt/types'
import { name, version } from '../package.json'
import { getMiddleware } from './middleware'

type CustomizableComponenets = 'CreateDynamicPage' | 'DeleteDynamicPage' | 'DynamicPageLoading';

export interface ModuleOptions {
  contentWriter: {
    customizeComponenets: CustomizableComponenets[];
  };
}
const CONFIG_KEY = 'nuxtEditor'

type NuxtOptionsWithContentWriter = NuxtOptions & ModuleOptions;

const nuxtModule: Module<ModuleOptions> = function () {
  const options: NuxtOptionsWithContentWriter = this.nuxt.options
  const moduleOptions = options.contentWriter

  //
  //
  // Make it easier to addTemplate
  const that = this

  function addTemplate (name: string) {
    that.addTemplate({
      fileName: `contentWriter/${name}`,
      src: require.resolve(`./templates/${name}`)
    })
  }

  //
  //
  // Add common components
  addTemplate('components/SelectableContent.comm.vue')

  if (options.dev) {
    //
    //
    // Add dev css
    addTemplate('style.scss')

    //
    //
    // Add dev server middleware
    this.addServerMiddleware({
      path: '/_editor',
      handler: getMiddleware(options)
    })

    //
    //
    // Customizable dev components
    const possibleCC: CustomizableComponenets[] = [
      'CreateDynamicPage',
      'DeleteDynamicPage',
      'DynamicPageLoading'
    ]

    for (let i = 0; i < possibleCC.length; ++i) {
      if (!moduleOptions.customizeComponenets.includes(possibleCC[i])) {
        addTemplate(`components/customizable/${possibleCC[i]}.dev.vue`)
      }
    }

    //
    //
    // Add dev components
    addTemplate('components/DynamicPage.dev.vue')
    addTemplate('components/SelectableContent.dev.vue')
    addTemplate('components/SelectFile.dev.vue')
    addTemplate('components/SelectFiles.dev.vue')

    //
    //
    // Add dev plugin
    this.addPlugin({
      fileName: 'contentWriter/plugin.js',
      src: require.resolve('./templates/plugin.dev.js'),
      options: moduleOptions
    })
  } else {
    //
    //
    // Add production components
    addTemplate('components/Empty.prod.vue.js')
    addTemplate('components/Passthrough.prod.vue')

    //
    //
    // Add production plugin
    this.addPlugin({
      fileName: 'contentWriter/plugin.js',
      src: require.resolve('./templates/plugin.prod.js')
    })
  }
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
