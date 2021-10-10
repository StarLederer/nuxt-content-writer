// import * as fs from 'fs/promises'

import Vue from 'vue'
import SelectFile from './SelectFile.vue'
// this.list = await fs.readdir(__dirname)
// import type { Plugin } from '@nuxt/types'

Vue.component(SelectFile.name, SelectFile)

// const list = await fs.readdir(__dirname)

// console.log(options)

export default function (ctx, inject) {
  // Fully typed plugin
  // console.log(ctx)
  // console.log(inject)
  // console.log('loaded', ctx && 'with context', !!inject && 'and with inject')
}
