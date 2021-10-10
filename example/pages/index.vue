<template>
  <main>
    <SelectFile :dir="'articles'">
      Select article
    </SelectFile>
    <NuxtContent :document="article" />
  </main>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const selection = await $content('homepageArticle').fetch()
    const article = await $content(selection.article).fetch()
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
</style>
