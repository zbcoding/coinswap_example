/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      screens: {
        xs: '350px',
      },
      colors: {
        //action color
        defaultColor: '#052cc0',
        //nonaction color
        defaultAlt: '#060F8F',
        dBlue: '#20E4FF',
        dGreen: '#00AB84',
        dGreenAlt1: '#00C389',
        dGreenAlt2: '#21FFBE',
        dGray: '#003057',
        dBackground: '#060f8f8f'
      }
    },
  },
  plugins: [],
}


