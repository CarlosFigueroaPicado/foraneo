const nativewind = require('nativewind/tailwind/native');

const palette = {
  orange: '#FF6B3B',
  yellow: '#F3CF22',
  green: '#3EFF74',
  aqua: '#6BE8E8',
  graphite: '#606060',
  navy: '#27348B',
  red: '#E30613',
  cream: '#F8FFDC',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [nativewind],
  theme: {
    extend: {
      colors: {
        primary: palette.orange,
        secondary: palette.yellow,
        success: palette.green,
        info: palette.aqua,
        danger: palette.red,
        neutral: {
          50: '#F8F9FB',
          100: '#F1F2F6',
          200: '#E2E4EB',
          300: '#C9CCD6',
          400: '#A3A8B6',
          500: palette.graphite,
          600: '#4C4C4C',
          700: '#333333',
          800: '#1F1F1F',
          900: '#0F0F0F',
        },
        background: {
          default: '#FFFFFF',
          subtle: palette.cream,
          elevated: '#FDFCF9',
        },
        accent: {
          navy: palette.navy,
          coral: palette.orange,
          lime: palette.green,
        },
      },
      fontFamily: {
        sans: ['Inter-Regular', 'System'],
        display: ['Inter-Bold', 'System'],
        medium: ['Inter-Medium', 'System'],
        semibold: ['Inter-SemiBold', 'System'],
        light: ['Inter-Light', 'System'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '38px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
      },
      spacing: {
        13: '52px',
        15: '60px',
        18: '72px',
      },
      borderRadius: {
        '4xl': '36px',
      },
      dropShadow: {
        card: '0px 12px 30px rgba(39, 52, 139, 0.12)',
      },
    },
  },
  plugins: [],
};
