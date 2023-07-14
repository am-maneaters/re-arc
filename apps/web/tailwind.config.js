import calcitePreset from './calcite-preset';

/** @type {import('tailwindcss').Config} */
export default {
  // Use manual theming rather than Tailwind's automatic dark mode
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [calcitePreset],
  theme: {
    extend: {
      boxShadow: {
        '3xl':
          '0 4px 16px 0 rgba(0, 0, 0, 0.18), 0 2px 8px 0 rgba(0, 0, 0, 0.34)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
