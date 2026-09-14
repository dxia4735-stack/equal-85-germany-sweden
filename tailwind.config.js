const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Arial', ...defaultTheme.fontFamily.sans],
      display: ['Arial', ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
    },
    extend: { animation: { 'spin-slow': 'spin 3s linear infinite' } },
  },
  plugins: [],
};
