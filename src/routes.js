import PacksIndex from './vue/packs/index/index.vue';
import PacksShow from './vue/packs/show/show.vue';
import PatchTagsIndex from './vue/patch-tags/index/index.vue';
import PatchTagsShow from './vue/patch-tags/show/show.vue';
import CreatorsIndex from './vue/creators/index/index.vue';
import PackTagsIndex from './vue/pack-tags/index/index.vue';

export function getRoutes(){
    return [
        { 
            path: '/', 
            name: 'home',
            redirect: '/packs' 
        },
        {
            path: '/packs',
            name: 'packsIndex',
            component: PacksIndex,
            props: (route) => {
                const props = {
                    title: 'Packs',
                    packsFilter(packs){
                        return packs;
                    }
                };

                return props;
            },
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
        {
            path: '/creators',
            name: 'creatorsIndex',
            component: CreatorsIndex,
        },
        {
            path: '/creators/:id',
            name: 'creatorsShow',
            component: PacksIndex,
            props: (route) => {
                const props = {
                    title: route.params.id,
                    packsFilter(packs){
                        return packs.filter((pack) => pack.author === route.params.id);
                    }
                };

                return props;
            },
        },
        {
            path: '/pack-tags',
            name: 'packTagsIndex',
            component: PackTagsIndex,
        },
        {
            path: '/pack-tags/:id',
            name: 'packTagsShow',
            component: PacksIndex,
            props: (route) => {
                const props = {
                    title: route.params.id,
                    packsFilter(packs){
                        return packs.filter((pack) => pack.tags.has(route.params.id)).sort((packA, packB) => {
                            return packA.title > packB.title ? -1 : 1;
                        });
                    }
                };

                return props;
            },
        },
    ];
}