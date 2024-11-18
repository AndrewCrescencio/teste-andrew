import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router'

import 'virtual:uno.css'
import '@/styles/main.scss'

const pinia = createPinia()

const head = createHead()

createApp(App)
  .use(router)
  .use(pinia)
  .use(head)
  .mount('#app')
