import Vue from 'vue'
import SelectFile from './SelectFile.vue'
// import type { Plugin } from '@nuxt/types'

console.log('imported')

Vue.component(SelectFile.name, SelectFile)

export default function (ctx, inject) {
  // Fully typed plugin
  console.log('loaded', ctx && 'with context', !!inject && 'and with inject')
}
