import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: {
          DEFAULT: '#0B0B0B',
          card: '#0F0F0F',
          elevated: '#141414',
          hover: '#181818',
        },
        crimson: {
          DEFAULT: '#D7192F',
          dark: '#7A101B',
          deep: '#450A0A',
          light: '#FF2A42',
          glow: 'rgba(215, 25, 47, 0.35)',
        },
        muted: {
          DEFAULT: '#8A8A8A',
          light: '#A3A3A3',
          dark: '#525252',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          medium: 'rgba(255, 255, 255, 0.15)',
          crimson: 'rgba(215, 25, 47, 0.4)',
        },
      },
      fontFamily: {
        poster: ['var(--font-poster)', 'Antonio', 'Bebas Neue', 'Anton', 'Oswald', 'sans-serif'],
        display: ['var(--font-display)', 'Bebas Neue', 'Antonio', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'var(--font-serif)', 'Playfair Display', 'Bodoni Moda', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Bodoni Moda', 'Georgia', 'serif'],
        thingos: ['var(--font-thingos)', 'Cormorant Garamond', 'Playfair Display', 'serif'],
        script: ['var(--font-script)', 'Caveat', 'Dancing Script', 'cursive'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter2: '-0.06em',
        tighter3: '-0.08em',
        tightest: '-0.09em',
        poster: '-0.03em',
        ultra: '0.25em',
      },
      boxShadow: {
        glow: '0 0 50px -10px rgba(215, 25, 47, 0.35)',
        'glow-lg': '0 0 100px -20px rgba(215, 25, 47, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
