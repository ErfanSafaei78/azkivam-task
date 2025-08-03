import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./composables/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.ts",
  ],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
};
