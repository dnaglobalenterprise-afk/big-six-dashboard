import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'office-bg': '#1a1a2e',
        'office-card': '#16213e',
        'office-accent': '#0f3460',
        'agent-online': '#00d26a',
        'agent-busy': '#ffa500',
        'agent-away': '#808080',
        'dna-green': '#2d5016',
        'defy-blue': '#1e3a8a',
        'blacktop-gray': '#374151',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
export default config
