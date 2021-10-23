# nuxt-content-writer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> nuxt-content-writer expands @nuxt/content module functionality by
> allowing you to edit your /content directory visually right from inside your Nuxt app

- [📖 **Release Notes**](https://github.com/HermanLederer/nuxt-content-writer/releases)

## Features

- A file picker component
- Delete or create new files
- Rename files (coming soon)
- Customizable editors
- Quick wrapper for NuxtContent to load and select content easily
- Create, edit and delete pages visually
- Minimum production build size impact

## Setup

1. Add `nuxt-content-writer` and its dependencies to your project

```bash
yarn add @nuxt/content # or npm install @nuxt/content
yarn add @nuxtjs/axios # or npm install @nuxtjs/axios 
yarn add nuxt-content-writer # or npm install nuxt-content-writer
```

2. Add `nuxt-content-writer` and its dependencies to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    'nuxt-content-writer',
  ],
  nuxtEditor: {
    // module options
  }
}
```

## How to use

There is no guide yet but you can see how to use the available components, create a visual editor for dyanmic pages and customize editors in [the eample](https://github.com/HermanLederer/nuxt-content-writer).

If you would like to explore the source code it is usseful to know that files that end with .dev are not included in the production build at all, and files with .prod are not included in dev at all. Similarly to that, css classes that start with an _ are never found in the production build. [The eample](https://github.com/HermanLederer/nuxt-content-writer) still adds costumization to those classes in production mode, but that was done to make the example simpler. Ideally you want to have a local plugin in your Nuxt app that only inludes these customizations in dev mode.

## Development

1. Clone this repository
2. Install dependencies using `yarn install`
3. Start development server using `yarn dev`

## License

[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-content-writer/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-content-writer
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-content-writer.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-content-writer
[github-actions-ci-src]: https://github.com/HermanLederer/nuxt-content-writer/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/HermanLederer/nuxt-content-writer/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/HermanLederer/nuxt-content-writer.svg
[codecov-href]: https://codecov.io/gh/HermanLederer/nuxt-content-writer
[license-src]: https://img.shields.io/npm/l/nuxt-content-writer.svg
[license-href]: https://npmjs.com/package/nuxt-content-writer
