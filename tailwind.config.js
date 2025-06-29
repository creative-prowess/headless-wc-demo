module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}", 
  ],
  
  safelist: ['bg-brand','bg-brandblue','uppercase','leading-snug','text-custom-65','bg-darker','bg-bluedark','bg-dark', 'hover:bg-accent', 'text-white'], // ✅ Add this
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: 'rgb(4 24 34 / 97%)',
        brandblue: '#034c8c',
        darker: 'rgb(4 24 34)',
        bluedark: 'rgb(6 36 51)',
        dark: '#034c8c',
        accent: '#ff6347', // Tomato-like red for CTA
        muted: '#6b7280',
      },
      fontSize: {
        'custom-65':  ['clamp(2rem, 5vw, 55px)', { lineHeight: '1.2' }],
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
  plugins: [
  ],
}