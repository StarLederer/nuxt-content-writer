<template>
  <NuxtContent :document="content" />
</template>

<script>
import objectPath from 'object-path'

export default {
  props: {
    storageFile: {
      type: String,
      required: true
    },
    storageKey: {
      type: String,
      required: true
    },
    dir: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      content: {}
    }
  },

  async fetch () {
    let file

    try {
      file = await this.$content(this.storageFile).fetch()
    } catch (err) {}

    try {
      const contentName = objectPath.get(file, this.storageKey).replace(/\.[^/.]+$/, '')
      this.content = await this.$content(`${this.dir}/${contentName}`).fetch()
    } catch (err) {}
  }
}
</script>
