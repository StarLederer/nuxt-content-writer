module.exports = {
  transform: {
    '\\.(js|ts)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    ]
  },
  moduleNameMapper: {
    nuxt-editor: '<rootDir>/src'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**']
}
