// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@gits-id/ui-nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  runtimeConfig: {
    public: {
      BASE_URL: 'http://localhost:8000/api'
    }
  },
  css: ['~/assets/css/tailwind.css'],
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',

      // Stores
      './stores',

      // Api
      './api'
    ]
  }
})
