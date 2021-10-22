<template>
  <DynamicPage :page="contentFile">
    <SelectableContent :dir="sliceDir" :storage-file="contentFile" :storage-key="'content'" />
  </DynamicPage>
</template>

<script>
export default {
  data () {
    return {
      layout: [],
      header: {},
      contentFile: this.$nuxt.$route.path.substring(1, this.$nuxt.$route.path.length),
      sliceDir: 'written/slices'
    }
  }
}
</script>
