<template>
  <div class="_editor">
    <slot v-if="pageExists" />
    <DeleteDynamicPage v-if="pageExists" @deletePage="deletePage" />
    <CreateDynamicPage v-else :page="page" @createPage="createPage" />
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
    return {
      pageExists: false
    }
  },

  async fetch () {
    // Try get layout
    try {
      await this.$content(this.page).fetch()
      this.pageExists = true
    } catch (err) {}
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
