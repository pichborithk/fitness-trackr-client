/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#EFF7EB',
          200: '#D4F5C4',
          300: '#B8F09E',
          400: '#94ED6B',
          500: '#6FE835',
          600: '#4DB01E',
          700: '#30770E',
          800: '#215906',
          900: '#133801',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        lora: ['Lora', 'san-serif'],
      },
      boxShadow: {
        full_white: '0px 0px 5px 1px rgba(212,245,196,0.3)',
      },
    },
  },
  plugins: [],
};
