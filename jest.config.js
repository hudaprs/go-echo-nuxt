module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'vue'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest',
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
    '.*\\.(vue)$': '@vue/vue3-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!(nuxt3|unenv))']
}
