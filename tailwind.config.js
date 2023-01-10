/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@gits-id/**/src/**/*.{vue,js,ts,jsx,tsx,css}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  presets: [require('./preset')]
}
