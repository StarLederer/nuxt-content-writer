<template>
  <div class="container">
    <DynamicPage :page="contentFile">
      <SelectableContent :dir="sliceDir" :storage-file="contentFile" :storage-key="'content'" />
    </DynamicPage>
  </div>
</template>

<script>
export default {
  data () {
    return {
      layout: [],
      header: {},
      contentFile: 'dynamic-pages/' + this.$nuxt.$route.path.split('/').pop(),
      sliceDir: 'dynamic-pages/slices'
    }
  }
}
</script>
