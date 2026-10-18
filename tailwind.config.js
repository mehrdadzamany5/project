/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        cream: '#F7F5F1',
        sand: '#EEE8DF',
        white: '#FFFFFF',
        // Ink
        ink: '#24231F',
        'ink-2': '#77736B',
        'ink-3': '#999187',
        // Warm accents
        accent: '#876447',
        'accent-dark': '#5C4635',
        olive: '#8A8C70',
        success: '#5F7A5A',
        // Hairlines
        line: '#E6E0D8',
        'line-soft': '#EFEAE3',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      maxWidth: {
        shell: '1440px',
        content: '1320px',
      },
      spacing: {
        section: '5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(36,35,31,0.04)',
        lift: '0 18px 40px -24px rgba(36,35,31,0.28)',
        panel: '0 30px 70px -40px rgba(36,35,31,0.45)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
