/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'fusion-circle-black': "url('/fusion-circle-black.avif')",
        'fusion-rainbow-gradient': "url('/rainbow-gradient.avif')",
        'starry-night': "url('/starry-night.avif')",
        'fusion-wave-gradient': "url('/wave-gradient.avif')",
      },
      colors: {
        'fusion-purple': '#7750cc',
        'fusion-red': '#EE2B4F',
        'fusion-blue': '#9AD1E3',
        'fusion-pink': '#ff80b5',
        'gold':{
          100:'##FFDE2E',
          200:'#FFD700',
        },
        'duo':{
          100:'#F05C79',
          200:'#EC3257',
        },
        'bronze':{
          100:'#824d39',
          200:'#73412e',
        },
        'silver':{
          100:'#929292',
          200:'#7B7B7B',
        },
      }
    },
  },
  plugins: [],
}
