import PacksIndex from './vue/packs/index/index.vue';
import PacksShow from './vue/packs/show/show.vue';
import PatchTagsIndex from './vue/patch-tags/index/index.vue';
import PatchTagsShow from './vue/patch-tags/show/show.vue';

export function getRoutes(){
    return [
        {
            path: '/',
            name: 'home',
            component: PacksIndex,
        },
        {
            path: '/packs',
            name: 'packsIndex',
            component: PacksIndex,
        },
        {
            path: '/pack/:id',
            name: 'packsShow',
            component: PacksShow,
        },
        {
            path: '/patch-tags',
            name: 'patchTagsIndex',
            component: PatchTagsIndex,
        },
        {
            path: '/patch-tags/:id',
            name: 'patchTagsShow',
            component: PatchTagsShow,
        },
    ];
}