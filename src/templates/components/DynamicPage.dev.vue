<template>
  <div class="_editor">
    <slot v-if="pageExists" />
    <DeleteDynamicPage v-if="pageExists" @deletePage="deletePage" />
    <CreateDynamicPage v-if="!pageExists && !isLoading" :page="page" @createPage="createPage" />
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
    this.$content(this.page).fetch().then(() => {
      this.pageExists = true
      this.isLoading = false
    })

    return {
      isLoading: true,
      pageExists: false
    }
  },

  methods: {
    async createPage () {
      this.pageExists = true

      await fetch(`/_editor/${this.page}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: 'layout',
          value: []
        })
      })

      this.$fetch()
    },

    async deletePage () {
      await fetch(`/_editor/${this.page}.json`, {
        method: 'DELETE'
      })

      this.pageExists = false
      this.$forceUpdate()
    }
  }
}
</script>
