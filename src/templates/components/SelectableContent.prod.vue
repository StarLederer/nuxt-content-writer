<template>
  <NuxtContent :document="content" />
</template>

<script>
export default {
  props: {
    storageFile: {
      type: String,
      default: 'editor-storage',
      required: true
    },
    storageKey: {
      type: String,
      default: 'storage',
      required: true
    },
    dir: {
      type: String,
      default: '',
      required: true
    }
  },

  data () {
    return {
      content: {}
    }
  },

  async fetch () {
    let layout

    try {
      layout = await this.$content(this.storageFile).fetch()
    } catch (err) {}

    try {
      const contentName = layout[this.storageKey].replace(/\.[^/.]+$/, '')
      this.content = await this.$content(`${this.dir}/${contentName}`).fetch()
    } catch (err) {}
  }
}
</script>
