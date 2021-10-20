<template>
  <DynamicPage :content-file="contentFile">
    <SectionRenderer
      :slices-dir="'articles'"
      :layout-file="contentFile"
    />
  </DynamicPage>
</template>

<script>
export default {
  data () {
    return {
      layout: [],
      header: {},
      contentFile: `${this.$nuxt.$route.path}`
    }
  }
}
</script>
