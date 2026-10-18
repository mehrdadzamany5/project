/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#FAF8F5', 2: '#F3EDE4', 3: '#EFE6DA' },
        brown: { DEFAULT: '#8B5A3C', dark: '#734830' },
        ink: '#2B2B2B',
        muted: '#6B6259',
        slate: '#4A4F4A',
        gold: '#E0A526',
        line: '#E8E1D6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}
