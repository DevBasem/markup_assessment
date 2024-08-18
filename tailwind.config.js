/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primaryBG': '#f2f5fa',
        'secondaryBG': '#ffffff',
        'primaryAccent': '#4723f5',
        'secondaryAccent': '#f6f4fe',
        'primaryText': '#000000',
        'secondaryText': '#7a8085',
      },
    },
  },
  plugins: [],
}

