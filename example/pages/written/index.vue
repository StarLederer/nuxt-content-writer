<template>
  <main>
    <NuxtLink
      v-for="page in pages"
      :key="page.slug"
      :to="`${$nuxt.$route.path}/${page.slug.replace(/\.[^/.]+$/, '')}`"
    >
      {{ page.slug }}
    </NuxtLink>
  </main>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const pages = await $content('written')
      .only(['slug'])
      .fetch()
      .then(res => res)

    return {
      pages
    }
  }
}
</script>
