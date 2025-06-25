/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}" // ✅ <-- Add this if missing
  ],
  safelist: ['bg-brand', 'hover:bg-accent', 'text-white'], // ✅ Add this
  theme: {
    extend: {
      colors: {
        brand: '#034c8c',
        accent: '#dc2626', // Tomato-like red for CTA
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.05)',
        hover: '0 6px 25px rgba(0,0,0,0.08)',
      },
      transitionTimingFunction: {
        'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        'section': '5rem',
      },
    },
  },
  plugins: [],
}