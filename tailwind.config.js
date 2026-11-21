/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-2': 'var(--paper-2)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        brand: { red: 'var(--red)', 'red-dark': 'var(--red-dark)', tan: 'var(--tan)' },
        line: 'var(--line)',
        card: 'var(--card)',
        surface: 'var(--white)',
        silver: 'var(--silver)',
      },
      fontFamily: {
        display: ['var(--font)'],
        mono: ['var(--mono)'],
        sans: ['var(--font)'],
      },
    },
  },
  plugins: [],
}
