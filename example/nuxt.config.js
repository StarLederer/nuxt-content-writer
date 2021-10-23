export default {
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap', rel: 'stylesheet' }
    ]
  },

  css: ['@assets/style.scss'],

  modules: [
    // '@nuxt/typescript-build',
    '@nuxt/content',
    '@nuxtjs/axios',
    '../src/module.ts'
  ],

  contentWriter: {
    customizeComponenets: [
      // 'CreateDynamicPage'
      // 'DeleteDynamicPage'
    ]
  }
}
