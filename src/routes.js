import HomePage from './vue/homepage/index.vue';

export function getRoutes(){
    return [
        {
            path: '/',
            component: HomePage,
        },
        // {
        //     path: '/pack/:id',
        //     component: ShowPage,
        // },
    ];
}