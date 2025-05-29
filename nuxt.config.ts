import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  app: {
    rootAttrs: {
      id: 'arcs',
    },
    head: {
      title: 'Patrick Stillhart // Developer',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'theme-color',
          content: '#FFD168',
        },
        {
          name: 'msapplication-TileColor',
          content: '#FFD168',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: '#FFD168',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:title',
          content: 'Patrick Stillhart // Developer',
        },
        {
          name: 'description',
          content: 'Fan of great frontends, fullstack developer myself with a special passion for 3D and animations. Here to make the web more fun.',
        },
        {
          property: 'og:description',
          content: 'Fan of great frontends, fullstack developer myself with a special passion for 3D and animations. Here to make the web more fun.',
        },
        {
          property: 'og:image',
          content: 'https://stillh.art/favicon.png',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          href: '/favicon.png',
        },
      ],
      style: [
        {
          innerHTML: `@font-face {
            font-family: "3270";
            font-display: block;
            src: url("/assets/font/3270Narrow500.ttf") format("truetype");
          }`,
        },
      ],
    },
    pageTransition: {
      enterActiveClass: 'transition opacity-100 duration-100',
      leaveActiveClass: 'transition opacity-100 duration-100',
      enterFromClass: 'opacity-0',
      leaveToClass: 'opacity-0',
      mode: 'out-in',
    },
  },

  modules: [
    [
      '@nuxt/eslint',
      {
        config: { stylistic: true },
      },
    ],
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    [
      'nuxt-security',
      {
        headers: {
          contentSecurityPolicy: {
            'script-src': [
              '\'self\'', // Fallback value, will be ignored by most modern browsers (level 3)
              'https:', // Fallback value, will be ignored by almost any browser (level 2)
              '\'unsafe-inline\'', // Fallback value, will be ignored by almost any browser (level 2)
              '\'strict-dynamic\'', // Strict CSP via 'strict-dynamic', supported by most modern browsers (level 3)
              '\'nonce-{{nonce}}\'', // Enables CSP nonce support for scripts in SSR mode, supported by almost any browser (level 2)
              'static.cloudflareinsights.com',
            ],
            'connect-src': [
              '\'self\'',
              'https:',
              'static.cloudflareinsights.com',
            ],
          },
        },
      },
    ],
  ],
})
