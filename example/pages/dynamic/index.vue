<template>
  <div class="container">
    <header>
      <h1>Dynamic page index</h1>
      <p>
        You can find a list of links to all dynamic pages under /pages/dynamic
        below
      </p>
    </header>
    <main>
      <NuxtLink
        v-for="page in pages"
        :key="page.slug"
        :to="`${$nuxt.$route.path}/${page.slug.replace(/\.[^/.]+$/, '')}`"
      >
        {{ page.slug }}
      </NuxtLink>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const pages = await $content('dynamic-pages')
      .only(['slug'])
      .fetch()
      .then(res => res)

    return {
      pages
    }
  }
}
</script>

<style>
a {
  display: block;
}
</style>
