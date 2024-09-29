export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './assets/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],

  darkMode: 'selector',

  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      dark: '#111',
      transparent: 'transparent',
      current: 'currentColor',
      yellow: '#FFD168',
    },

    fontFamily: {
      sans: '"3270", system-ui',
    },

    extend: {
      maxWidth: {
        '4xl': '53.75rem',
      },

      zIndex: {
        '-1': '-1',
        'top': 999,
      },

      spacing: {
        '4.5': '1.125rem', // 18px
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '26': '6.5rem', // 104px

        // Desktop navigation padding top for filling nav spacing
        'navbar-height': 'var(--navbar-height)',

        // containers
        'container': '1.25rem',
        'container-tight': '1.25rem',
        'container-desktop': '6.25rem',
        'container-desktop-tight': '12.5rem',
      },

      boxShadow: {
        '2xl': '0px -4px 20px 0px rgba(46, 46, 46, 0.05)',
        '3xl': '0px -4px 20px 0px rgba(85, 32, 18, 0.05)',
      },

      flexGrow: {
        0.5: '0.5',
        2: '2',
      },

      borderWidth: {
        1.5: '1.5px',
        2: '2px',
      },

      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
      },
    },
  },
}
