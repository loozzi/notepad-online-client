import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"
import VueClipboard from 'vue-clipboard2'

import router from "./routes"

createApp(App)
    .use(Toast, {})
    .use(router)
    .use(VueClipboard)
    .mount('#app')
