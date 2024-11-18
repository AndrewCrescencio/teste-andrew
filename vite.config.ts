import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'

import Layouts from 'vite-plugin-vue-layouts'

import webfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue'],
      dts: 'src/typed-router.d.ts',
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    vue(),

    // https://github.com/feat-agency/vite-plugin-webfont-dl
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap',
    ]),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
  ],
})
