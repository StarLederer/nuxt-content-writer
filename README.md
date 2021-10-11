# nuxt-editor

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-content-writer` dependency to your project

```bash
yarn add nuxt-editor # or npm install nuxt-editor
```

2. Add `nuxt-content-writer` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    'nuxt-content-writer',
  ],
  nuxtEditor: {
    // module options
  }
}
```

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
