import css from '../sass/style.scss';
import { createApp } from 'vue';
import App from './vue/app.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { getRoutes } from './routes';

const router = createRouter({
    routes: getRoutes(),
    history: createWebHistory(),
    scrollBehavior (to, from, savedPosition) {
        return savedPosition || { top: 0 };
    }
});

const app = createApp(App);
app.use(router);
app.mount('#app');



