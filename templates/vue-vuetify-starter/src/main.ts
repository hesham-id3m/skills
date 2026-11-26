import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from './plugins/vuetify'
import { applyDocumentDirection, readInitialLocale } from './i18n'
import router from './router'
import App from './App.vue'
import './style.css'

applyDocumentDirection(readInitialLocale())

createApp(App).use(vuetify).use(router).mount('#app')
