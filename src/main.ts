import './main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'
import { initializeApp } from '@firebase/app'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
  firebaseApp: initializeApp({
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: "cook-book-admin.firebaseapp.com",
    projectId: "cook-book-admin",
    storageBucket: "cook-book-admin.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: "G-S9P5S4GTBD"
  }),
  modules: [VueFireAuth()],
})

app.mount('#app')
