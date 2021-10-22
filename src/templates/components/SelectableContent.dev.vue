<template>
  <div class="_selectable-content">
    <SelectFile
      :dir="dir"
      :storage-file="storageFile"
      :storage-key="storageKey"
      @update="$fetch()"
    >
      Select slice
    </SelectFile>
    <NuxtContent :document="content" />
  </div>
</template>

<script>
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
      const contentName = file[this.storageKey].replace(/\.[^/.]+$/, '')
      this.content = await this.$content(`${this.dir}/${contentName}`).fetch()
    } catch (err) {}
  }
}
</script>
