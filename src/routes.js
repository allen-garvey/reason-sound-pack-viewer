import PacksIndex from './vue/packs/index/index.vue';
import PacksShow from './vue/packs/show/show.vue';

export function getRoutes(){
    return [
        {
            path: '/',
            name: 'packsIndex',
            component: PacksIndex,
        },
        {
            path: '/pack/:id',
            name: 'packsShow',
            component: PacksShow,
        },
    ];
}