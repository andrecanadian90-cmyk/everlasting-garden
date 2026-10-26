/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sunflower: {
          DEFAULT: '#eab308',
          foreground: '#1c1917',
          hover: '#ca8a04',
        },
        leaf: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
          dark: '#059669',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#18181b',
          muted: '#f4f4f5',
          'muted-dark': '#27272a',
        },
        ink: {
          DEFAULT: '#09090b',
          muted: '#71717a',
          light: '#a1a1aa',
        }
      }
    },
  },
  plugins: [],
}
