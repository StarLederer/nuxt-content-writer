<template>
  <main>
    <SelectFile :storage="'homepageArticle'" :dir="'articles'">
      Select article
    </SelectFile>
    <NuxtContent :document="article" />
  </main>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    let article

    try {
      const selection = await $content('homepageArticle').fetch()
      const articleName = selection.selected.replace(/\.[^/.]+$/, '')
      article = await $content(articleName).fetch()
    } catch (err) {
      article = null
    }

    return {
      article
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
