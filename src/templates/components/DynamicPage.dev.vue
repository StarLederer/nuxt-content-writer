<template>
  <div class="_editor">
    <slot v-if="pageExists" />
    <DeleteDynamicPage v-if="pageExists" @deletePage="deletePage" />
    <CreateDynamicPage
      v-if="!pageExists && !isLoading"
      :page="page"
      @createPage="createPage"
    />
    <DynamicPageLoading v-if="isLoading" />
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      required: true
    }
  },

  data () {
    // Try get layout
    this.$axios
      .$get(`/_editor/${this.page}.json`)
      .then(() => {
        this.pageExists = true
      })
      .catch(() => {
        this.pageExists = false
      })
      .finally(() => {
        this.isLoading = false
      })

    return {
      isLoading: true,
      pageExists: false
    }
  },

  methods: {
    async createPage () {
      this.isLoading = true

      await this.$axios.$post(`/_editor/${this.page}.json`, {
        key: 'layout',
        value: []
      })

      setTimeout(() => {
        this.pageExists = true
        this.isLoading = false
      }, 10)
    },

    async deletePage () {
      this.isLoading = true

      await this.$axios.$delete(`/_editor/${this.page}.json`)

      this.pageExists = false
      this.isLoading = false
    }
  }
}
</script>
