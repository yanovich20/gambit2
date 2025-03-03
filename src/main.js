import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import  sfc  from './components/sfc.vue'
import { createPinia } from 'pinia'

let pinia = createPinia();
createApp(App).use(pinia).component("sfc",sfc).mount('#app');
