import HomePage from './vue/homepage/index.vue';
import ShowPage from './vue/showpage/show.vue';

export function getRoutes(){
    return [
        {
            path: '/',
            component: HomePage,
        },
        {
            path: '/pack/:id',
            name: 'show',
            component: ShowPage,
        },
    ];
}