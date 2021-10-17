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
          <article
            v-for="card in cards"
            :key="card.slug"
          >
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
    } catch (err) { }

    try {
      const cardNames = layout.cards
      for (let i = 0; i < cardNames.length; ++i) {
        cards[i] = await $content(
          'cards',
          cardNames[i].replace(/\.[^/.]+$/, '')
        ).fetch()
      }
    } catch (err) { }

    try {
      const article1Name = layout.article1.replace(/\.[^/.]+$/, '')
      article1 = await $content('articles', article1Name).fetch()
    } catch (err) { }

    try {
      const article2Name = layout.article2.replace(/\.[^/.]+$/, '')
      article2 = await $content('articles', article2Name).fetch()
    } catch (err) { }

    return {
      cards,
      article1,
      article2
    }
  }
}
</script>

<style>
/* Generic styles */
:root {
  --primary-100: #e6fcf3;
  --primary-400: #4de7a8;
  --primary-500: #00dc82;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  font-family: "DM Sans", sans-serif;
}

body {
  color: rgb(0, 30, 38);

  font-size: 1rem;
  line-height: 1.5;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: 400;
  margin-bottom: 1rem;
}

h1:last-child,
h2:last-child,
h3:last-child,
h4:last-child,
h5:last-child,
h6:last-child,
p:last-child {
  margin-bottom: 0;
}

/* Specific styles */
.container {
  position: relative;
  max-width: 44rem;
  margin: 8rem auto;
  padding: 0 2rem;
}

header,
section {
  margin-bottom: 2rem;
}

section:last-child {
  margin-bottom: 0;
}

article {
  margin-bottom: 2rem;
}

h1,
h2 {
  font-family: "DM Serif Display", serif;
}

h1 {
  color: rgb(0, 53, 67);
  font-size: 3rem;
  line-height: 1.5;
}

h1 span {
  color: var(--primary-500);
  font: inherit;
}

h2 {
  font-size: 1.875rem;
}

h3 {
  font-weight: 700;
}

.grid
{
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

.grid > article
{
  margin: 0;
  padding: 2rem;
  background: rgba(250, 250, 250);
  border-radius: 0.375rem;
}

/*
 * _select-file style
 *
 * This is optional and is purely meant to improve
 * the content writing experience. It is recommended
 * to only include this in dev mode.
 */
._select-file {
  margin-bottom: 1rem;
}

._select-file .label {
  padding: 0.625rem 1rem;

  background: rgb(230, 240, 240);
  color: rgb(0, 53, 67);
  border-radius: 0.375rem;

  font-size: 0.875rem;
  font-weight: 500;
}

._select-file ul {
  background: rgb(250, 250, 250);
  box-shadow: 0 0 0 transparent;
  border-radius: 0.375rem;

}

._select-file:hover ul {
  box-shadow: 0 0.5rem 1rem rgba(0, 53, 67, 0.05);
  transition: box-shadow 200ms, opacity 50ms;
}

._select-file li {
  background: none;
  border-radius: 0.375rem;
}

._select-file button,
._select-file input,
._select-file .primary {
  padding: 0.625rem 1rem;

  color: rgb(0, 53, 67);

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;

  transition: 150ms;
}

._select-file button.secondary,
._select-file button.new-file {
  color: rgba(0, 53, 67, 0.4);
}

._select-file input {
  color: rgb(0, 53, 67);
  background: var(--primary-100);
}

._select-file button:hover,
._select-file input:hover {
  color: #000;
  background: rgb(240, 240, 240);
}

._select-file input:hover {
  background: #fff;
}

._select-file input[type="text"]::placeholder {
  color: rgba(0, 53, 67, 0.4);
}

._select-file input[type="text"]:focus {
  background: #fff;
  border: 1px solid var(--primary-500);
  border-radius: 0.375rem 0 0 0.375rem;
}

._select-file input[type="submit"] {
  background: var(--primary-500);
  border-radius: 0 0.375rem 0.375rem 0;
}

._select-file input[type="submit"]:hover {
  background: var(--primary-400);
}
</style>
