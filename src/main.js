import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import { API_URL } from './config';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'leaflet/dist/leaflet.css';

import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import "primeicons/primeicons.css";

axios.defaults.baseURL = API_URL;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            darkModeSelector: 'dark',
        }
    }
});
app.mount('#app');



