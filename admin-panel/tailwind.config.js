/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4D8A',
        pinkPrimary: '#FF4D8A',
        pinkLight: '#FFB3CF',
        pinkSoft: '#FFF0F6',
        pinkDark: '#D93672',
        pinkShadow: '#FFD9E6',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
