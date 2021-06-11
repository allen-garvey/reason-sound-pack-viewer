import PacksIndex from './vue/packs/index/index.vue';
import PacksShow from './vue/packs/show/show.vue';
import PatchTagsShow from './vue/patch-tags/show/show.vue';
import CreatorsIndex from './vue/creators/index/index.vue';
import TextListPage from './vue/common/text-list-page.vue';

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
            component: TextListPage,
            props: (route) => {
                const props = {
                    title: 'Patch Tags',
                    getItems(){
                        return Array.from(this.patchTagsSet.entries()).map(([key, dupKey]) => key).sort();
                    },
                    itemRouteName: 'patchTagsShow'
                };

                return props;
            },
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
            component: TextListPage,
            props: (route) => {
                const props = {
                    title: 'Pack Tags',
                    getItems(){
                        return Array.from(this.packTagsSet.entries()).map(([key, dupKey]) => key).sort();
                    },
                    itemRouteName: 'packTagsShow'
                };

                return props;
            },
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