import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        zinc: {
          800: '#2E3033',
          850: '#292B2E',
          900: '#1F2123',
        },
      },
      boxShadow: {
        header: '0px 4px 8px 0px rgba(0, 0, 0, 0.15)',
        'news-item': '0px 4px 4px 0px rgba(0, 0, 0, 0.10)',
      },
      gridTemplateColumns: {
        hero: '368px 1fr',
        'forum-and-recent-posts': '1fr 328px',
        'news-content': '1fr 904px',
        'topic-view': '1fr 280px',
      },
      backgroundImage: {
        'gradient-hero':
          'linear-gradient(220deg, rgba(41, 43, 46, 0.00) 14.37%, rgba(6, 121, 255, 0.22) 90.28%)',
      },
      dropShadow: {
        'title-text': '1px 2px 4px rgba(0, 0, 0, 0.40);',
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
