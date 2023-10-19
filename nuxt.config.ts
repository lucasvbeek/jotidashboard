// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  runtimeConfig: {
    public: {
      areasUrl: 'https://jotihunt.nl/api/2.0/areas',
      articlesUrl: 'https://jotihunt.nl/api/2.0/articles'
    }
  },
  ssr: false,
  experimental: {
    payloadExtraction: true
  }
})
