/** PostCSS pipeline for Tailwind v4 (avoids @tailwindcss/vite transform issues with some Vite 7 setups). */
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
