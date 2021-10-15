<template>
  <main>
    <SelectFile :storage-file="'homepageArticles'" :storage-key="'article1'" :dir="'articles'">
      Select article1
    </SelectFile>
    <NuxtContent :document="article1" />

    <SelectFile :storage-file="'homepageArticles'" :storage-key="'article2'" :dir="'articles'">
      Select article2
    </SelectFile>
    <NuxtContent :document="article2" />
  </main>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    let article1, article2

    try {
      const selection = await $content('homepageArticles').fetch()
      const article1Name = selection.article1.replace(/\.[^/.]+$/, '')
      const article2Name = selection.article2.replace(/\.[^/.]+$/, '')
      article1 = await $content(article1Name).fetch()
      article2 = await $content(article2Name).fetch()
    } catch (err) {
      article1 = null
      article2 = null
    }

    return {
      article1,
      article2
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

main {
  position: relative;
  max-width: 44rem;
  margin: 8rem auto;
  padding: 0 2rem;
}

h3, h4, h5, h6, p {
  margin-bottom: 1rem;
}
</style>
