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
                    getPacks(){
                        return enumeratePacks(this.packsMap).reverse();
                    },
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
                        return Array.from(this.patchTagsMap.keys()).sort();
                    },
                    getItemLength(patchTag){
                        return this.patchTagsMap.get(patchTag).length;
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
                        return Array.from(this.creatorsMap.keys()).sort();
                    },
                    getItemLength(creator){
                        return this.creatorsMap.get(creator).length;
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
                    getPacks(){
                        return this.creatorsMap.get(route.params.id).map((id) => this.packsMap[id]);
                    },
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
                        return Array.from(this.packTagsMap.keys()).sort();
                    },
                    getItemLength(packTag){
                        return this.packTagsMap.get(packTag).length;
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
                    getPacks(){
                        return this.packTagsMap.get(route.params.id).map((id) => this.packsMap[id]);
                    },
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
                        return Array.from(this.patchDevicesMap.keys()).sort();
                    },
                    getItemLength(device){
                        return this.patchDevicesMap.get(device).length;
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