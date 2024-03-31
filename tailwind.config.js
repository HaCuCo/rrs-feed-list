/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['src/**/*.{ts,html,css,scss}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
  },
};
