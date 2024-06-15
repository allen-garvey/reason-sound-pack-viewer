import PacksIndex from './vue/packs/index/index.vue';
import PacksShow from './vue/packs/show/show.vue';
import TextListPage from './vue/common/text-list-page.vue';
import PatchListPage from './vue/common/patch-list-page.vue';
import { enumeratePacks } from './model-helpers';
import authorSites from './author-sites';

export function getRoutes() {
    return [
        {
            path: '/',
            name: 'home',
            redirect: '/packs',
        },
        {
            path: '/packs',
            name: 'packsIndex',
            component: PacksIndex,
            props: (route) => {
                const props = {
                    title: 'Packs',
                    getPacks() {
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
                    getItems() {
                        return Array.from(this.patchTagsMap.keys()).sort();
                    },
                    getItemLength(patchTag) {
                        return this.patchTagsMap.get(patchTag).length;
                    },
                    itemRouteName: 'patchTagsShow',
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
                    getPatches() {
                        const patchKey = route.params.id;
                        const patches = [];
                        const packsSet = this.patchTagsMap.get(patchKey).set;

                        for (const packId of packsSet.keys()) {
                            const pack = this.packsMap[packId];
                            pack.patches.forEach((patch) => {
                                if (patch.tags.has(patchKey)) {
                                    patch.packId = pack.id;
                                    patches.push(patch);
                                }
                            });
                        }
                        return patches.reverse();
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
                    getItems() {
                        return Array.from(this.creatorsMap.keys()).sort();
                    },
                    getItemLength(creator) {
                        return this.creatorsMap.get(creator).length;
                    },
                    itemRouteName: 'creatorsShow',
                };

                return props;
            },
        },
        {
            path: '/creators/:id',
            name: 'creatorsShow',
            component: PacksIndex,
            props: (route) => {
                const id = route.params.id;

                const props = {
                    title: id,
                    externalUrl: authorSites[id] || '',
                    getPacks() {
                        return this.creatorsMap
                            .get(id)
                            .map((id) => this.packsMap[id])
                            .reverse();
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
                    getItems() {
                        return Array.from(this.packTagsMap.keys()).sort();
                    },
                    getItemLength(packTag) {
                        return this.packTagsMap.get(packTag).length;
                    },
                    itemRouteName: 'packTagsShow',
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
                    getPacks() {
                        return this.packTagsMap
                            .get(route.params.id)
                            .map((id) => this.packsMap[id])
                            .reverse();
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
                    getItems() {
                        return Array.from(this.patchDevicesMap.keys()).sort();
                    },
                    getItemLength(device) {
                        return this.patchDevicesMap.get(device).length;
                    },
                    itemRouteName: 'devicesShow',
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
                    getPatches() {
                        const deviceKey = route.params.id;
                        const patches = [];
                        const packsSet =
                            this.patchDevicesMap.get(deviceKey).set;

                        for (const packId of packsSet.keys()) {
                            const pack = this.packsMap[packId];
                            pack.patches.forEach((patch) => {
                                if (patch.devices.has(deviceKey)) {
                                    patch.packId = pack.id;
                                    patches.push(patch);
                                }
                            });
                        }
                        return patches.reverse();
                    },
                };

                return props;
            },
        },
    ];
}
