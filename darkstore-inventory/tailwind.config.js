module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#4f46e5',
        dark: {
          DEFAULT: '#1f2937',
          light: '#374151'
        }
      }
    }
  },
  plugins: [],
}