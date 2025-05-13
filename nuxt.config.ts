// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  nitro: {
    imports: {
      // autoimport all guards from the server/guards directory
      dirs: ["./server/guards"],
    },
  },
});
