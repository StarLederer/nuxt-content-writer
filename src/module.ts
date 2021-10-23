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

  function addDevComponenet (name: string) {
    that.addTemplate({
      fileName: `contentWriter/${name}`,
      src: require.resolve(`./templates/${name}`)
    })
  }

  function addProdComponenet (name: string) {
    that.addTemplate({
      fileName: `contentWriter/${name}`,
      src: require.resolve(`./templates/${name}`)
    })
  }

  //
  //
  // Add common js
  this.addTemplate({
    fileName: 'contentWriter/navigateObject.js',
    src: require.resolve('./templates/navigateObject.js')
  })

  if (options.dev) {
    //
    //
    // Add dev css
    this.addTemplate({
      fileName: 'contentWriter/style.scss',
      src: require.resolve('./templates/style.scss')
    })

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
        addDevComponenet(`components/customizable/${possibleCC[i]}.dev.vue`)
      }
    }

    //
    //
    // Add dev components
    addDevComponenet('components/DynamicPage.dev.vue')
    addDevComponenet('components/SelectableContent.dev.vue')
    addDevComponenet('components/SelectFile.dev.vue')
    addDevComponenet('components/SelectFiles.dev.vue')

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
    addProdComponenet('components/Empty.prod.vue.js')
    addProdComponenet('components/Passthrough.prod.vue')
    addProdComponenet('components/SelectableContent.prod.vue')

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
