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
import { definePreset } from '@primeuix/themes';

axios.defaults.baseURL = API_URL;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const MyPreset = definePreset(Lara, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.dark-theme'
        }
    }
});
app.mount('#app');



