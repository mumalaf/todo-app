module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          800: '#1E293B',
          900: '#0F172A'
        },
        violet: {
          100: '#EDE9FE',
          600: '#7C3AED'
        },
        purple: {
          100: '#F3E8FF',
          200: '#E9D5FF',
          500: '#A855F7'
        },
        rose: {
          500: '#F43F5E'
        },
        lime: {
          300: '#BEF264'
        },
        amber: {
          800: '#92400E'
        }
      },
      fontFamily: {
        'nanum': ['NanumSquare', 'sans-serif']
      },
      fontSize: {
        '16px': '16px',
        '18px': '18px',
        '20px': '20px'
      },
      fontWeight: {
        'regular': '400',
        'bold': '700'
      },
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1024px'
      }
    }
  },
  plugins: []
}