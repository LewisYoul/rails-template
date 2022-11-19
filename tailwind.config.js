module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/views/**/*.turbo_stream.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    './app/javascript/**/*.ts',
    './app/javascript/**/*.jsx'
  ],
  theme: {
    fontFamily: {
      'sans': ['Lato']
    },
    extend: {
      colors: {
        'purple': {
          100: '#EAE2F8',
          200: '#CFBCF2',
          300: '#A081D9',
          400: '#8662C7',
          500: '#724BB7',
          600: '#653CAD',
          700: '#51279B',
          800: '#421987',
          900: '#34126F',
          DEFAULT: '#240754',
        },
      }
    }
  },
}
