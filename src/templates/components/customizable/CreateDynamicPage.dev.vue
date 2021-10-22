<template>
  <main class="_create-dynamic-page">
    <h2>Page does not exist {{ page }}</h2>
    <p>Would you like to create it?</p>
    <button @click="$emit('createPage')">
      Create page
    </button>
  </main>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      required: true
    }
  }
}
</script>
