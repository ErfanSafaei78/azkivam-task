// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@nuxt/image"],
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css", "~/assets/css/fonts.css"],
  runtimeConfig: {
    public: {
      baseUrl: "https://interview-api.azkivam.com/api/v1",
    }
  },
  ssr: true
});
