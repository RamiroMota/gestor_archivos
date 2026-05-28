/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js' // Soporte para componentes interactivos de Flowbite
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores minimalista estilo TeraBox (fresco, tecnológico y limpio)
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563eb', // Color de acento primario
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        slate: {
          50: '#0f172a',
          100: '#0f172a',
          200: '#1e293b',
          300: '#334155',
          400: '#475569',
          500: '#64748b',
          600: '#cbd5e1',
          700: '#e2e8f0',
          800: '#f1f5f9',
          900: '#ffffff',
          950: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // Habilitamos Flowbite
  ],
  darkMode: 'class', // Permite alternar entre modo oscuro y claro de forma flexible
}
