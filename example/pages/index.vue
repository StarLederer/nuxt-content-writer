<template>
  <div class="container">
    <header>
      <h1>
        <span>Nuxt-content-writer</span>
        + Nuxt/content example
      </h1>
      <p>
        Article changers below are SelectFile components. Selecting different
        files will change the source code of this page and permanently alter it.
        The SelectFile component is only available in dev mode and is not
        included in production.
      </p>
    </header>

    <section>
      <h2>About this example</h2>
      <p>
        You can hover over the "select article" lables to bring up a list of
        available article files which is a feture of this module. The articles
        themselves are rendered with the nuxt/content module. You can also
        double-click to edit them, which is also a feature of nuxt/content.
      </p>
      <p>
        This example demonstrates how you can use the combination of
        nuxt-content-writer and nuxt/content to give more independence to your
        content writers. Using these two modules it is possible to enable them
        to significantly alter the page without your(a developer's) help.
      </p>
    </section>

    <main>
      <section>
        <h2>Try playing with the articles below</h2>
        <article>
          <SelectFile
            :storage-file="'layout'"
            :storage-key="'article1'"
            :dir="'articles'"
          >
            Select article
          </SelectFile>
          <NuxtContent :document="article1" />
        </article>

        <article>
          <SelectFile
            :storage-file="'layout'"
            :storage-key="'article2'"
            :dir="'articles'"
          >
            Select article
          </SelectFile>
          <NuxtContent :document="article2" />
        </article>
      </section>

      <section>
        <h2>Try rearranging cards</h2>
        <SelectFiles
          :storage-file="'layout'"
          :storage-key="'cards'"
          :dir="'cards'"
        >
          Arrange cards
        </SelectFiles>
        <div class="grid">
          <article v-for="card in cards" :key="card.slug">
            <NuxtContent :document="card" />
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    let layout
    const cards = []
    let article1, article2

    try {
      layout = await $content('layout').fetch()
    } catch (err) {}

    try {
      const cardNames = layout.cards
      for (let i = 0; i < cardNames.length; ++i) {
        cards[i] = await $content(
          'cards',
          cardNames[i].replace(/\.[^/.]+$/, '')
        ).fetch()
      }
    } catch (err) {}

    try {
      const article1Name = layout.article1.replace(/\.[^/.]+$/, '')
      article1 = await $content('articles', article1Name).fetch()
    } catch (err) {}

    try {
      const article2Name = layout.article2.replace(/\.[^/.]+$/, '')
      article2 = await $content('articles', article2Name).fetch()
    } catch (err) {}

    return {
      cards,
      article1,
      article2
    }
  }
}
</script>
