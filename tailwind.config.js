/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D4FF',
        secondary: '#1A1A1A',
        accent: '#00A8E8',
        dark: {
          50: '#2D3748',
          100: '#1F2937',
          200: '#1a1a2e',
          300: '#16213e',
          400: '#0f3460',
          500: '#0a2647',
        },
        neon: {
          green: '#00D4FF',
          red: '#00D4FF',
          blue: '#00D4FF',
          purple: '#00D4FF',
        },
      },
      fontFamily: {
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'neon-green': 'inset 0 0 40px rgba(0, 212, 255, 0.9), inset 0 0 80px rgba(0, 212, 255, 0.6)',
        'neon-red': 'inset 0 0 40px rgba(0, 212, 255, 0.9), inset 0 0 80px rgba(0, 212, 255, 0.6)',
        'neon-blue': 'inset 0 0 40px rgba(0, 212, 255, 0.9), inset 0 0 80px rgba(0, 212, 255, 0.6)',
      },
    },
  },
  plugins: [],
}

