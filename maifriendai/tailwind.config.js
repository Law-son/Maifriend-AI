/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px"
      },
      colors: {
        primaryDark: "hsl(320, 10%, 18%)",
        lightDark: "hsl(253, 10%, 36%)",
        lightBlue: "hsl(226, 85%, 80%)",
        deepBlue: "hsl(235, 60%, 59%)",
        mintGreen: "hsl(160, 24%, 85%)"
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}