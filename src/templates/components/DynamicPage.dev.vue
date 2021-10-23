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
    fetch(`/_editor/${this.page}.json`)
      .then((res) => {
        if (res.status === 200) {
          this.pageExists = true
        } else {
          this.pageExists = false
        }
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

      this.pageExists = true
      this.isLoading = false
    },

    async deletePage () {
      this.isLoading = true

      await fetch(`/_editor/${this.page}.json`, {
        method: 'DELETE'
      })

      this.pageExists = false
      this.isLoading = false
    }
  }
}
</script>
