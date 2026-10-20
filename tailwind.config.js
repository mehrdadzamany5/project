/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#050606',
        charcoal: '#171A18',
        forest: '#26352C',
        olive: '#77785D',
        bronze: '#A58B5B',
        paper: '#F5F5F2',
        stone: '#EAEAE5',
        ink: '#232522',
        muted: '#777A74',
        line: '#DEDFD8',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      maxWidth: {
        shell: '1440px',
      },
      letterSpacing: {
        label: '0.22em',
        wide2: '0.14em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
