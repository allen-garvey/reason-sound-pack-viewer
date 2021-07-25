import PacksIndex from './vue/packs/index/index.vue';
import PacksShow from './vue/packs/show/show.vue';
import TextListPage from './vue/common/text-list-page.vue';
import PatchListPage from './vue/common/patch-list-page.vue';
import { enumeratePacks } from './model-helpers';

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
                        return Array.from(this.patchTagsSet.values()).sort();
                    },
                    itemRouteName: 'patchTagsShow'
                };

                return props;
            },
        },
        {
            path: '/patch-tags/:id',
            name: 'patchTagsShow',
            component: PatchListPage,
            props: (route) => {
                const props = {
                    title: route.params.id,
                    getPatches(){
                        const patchKey = route.params.id;

                        return enumeratePacks(this.packsMap).map((pack) => 
                            pack.patches
                                .filter(patch => patch.tags.has(patchKey))
                                .map(patch => {
                                    patch.packId = pack.id;
                                    return patch;
                                })
                        ).flat();
                    },
                };

                return props;
            },
        },
        {
            path: '/creators',
            name: 'creatorsIndex',
            component: TextListPage,
            props: (route) => {
                const props = {
                    title: 'Creators',
                    getItems(){
                        const creatorsSet = new Set();
                        enumeratePacks(this.packsMap).forEach((pack) => {
                            creatorsSet.add(pack.author);
                        });
                        return Array.from(creatorsSet.values()).sort();
                    },
                    itemRouteName: 'creatorsShow'
                };

                return props;
            },
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
                        return Array.from(this.packTagsSet.values()).sort();
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
        {
            path: '/devices',
            name: 'devicesIndex',
            component: TextListPage,
            props: (route) => {
                const props = {
                    title: 'Devices',
                    getItems(){
                        return Array.from(this.patchDevicesSet.values()).sort();
                    },
                    itemRouteName: 'devicesShow'
                };

                return props;
            },
        },
        {
            path: '/devices/:id',
            name: 'devicesShow',
            component: PatchListPage,
            props: (route) => {
                const props = {
                    title: route.params.id,
                    getPatches(){
                        const deviceKey = route.params.id;

                        return enumeratePacks(this.packsMap).map((pack) => 
                            pack.patches
                                .filter(patch => patch.devices.has(deviceKey))
                                .map(patch => {
                                    patch.packId = pack.id;
                                    return patch;
                                })
                        ).flat();
                    },
                };

                return props;
            },
        },
    ];
}