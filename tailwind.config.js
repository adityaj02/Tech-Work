/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
          "primary": "#ffafd6",
          "background": "#131313",
          "on-background": "#e2e2e2",
          "surface-container-low": "#1b1b1b",
          "outline-variant": "#514349",
          "on-surface-variant": "#d6c1c9",
          "primary-container": "#e38cb8",
          "on-primary": "#57173e"
      },
      fontFamily: {
          "headline": ["Space Grotesk", "sans-serif"],
          "body": ["Inter", "sans-serif"]
      },
      keyframes: {
          marquee: {
              '0%': { transform: 'translateX(0%)' },
              '100%': { transform: 'translateX(-50%)' }
          }
      },
      animation: {
          'marquee': 'marquee 20s linear infinite',
          'marquee-reverse': 'marquee 20s linear infinite reverse'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
