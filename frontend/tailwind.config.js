/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0B0B0F',
        'bg-surface': '#15151C',
        'bg-surface-elevated': '#1E1E27',
        'accent-primary': '#6366F1',
        'accent-secondary': '#A855F7',
        'text-primary': '#F5F5F7',
        'text-secondary': '#9CA3AF',
        'border-subtle': '#2A2A35',
        'state-success': '#22C55E',
        'state-error': '#EF4444',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
      },
      borderRadius: {
        card: '16px',
        btn: '8px',
      },
      spacing: {
        '4.5': '18px',
      },
    },
  },
  plugins: [],
};
