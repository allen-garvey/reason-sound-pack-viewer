<template>
<div class="container">
    <header class="header">
        <site-title></site-title>
    </header>
    <main :class="$style['home-main']">
        <pack-list
            :packs="packs"
        >
        </pack-list>
    </main>
</div>
</template>

<style lang="scss" module>
.home-main{
	padding-bottom: 10em;
}
.controls{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
}
</style>

<script>
import { getPacks } from '../../ajax.js';
import SiteTitle from '../common/site-title.vue';
import PackList from './pack-list.vue';

export default {
    props: {
        
    },
    components: {
        SiteTitle,
        PackList,
    },
    created(){
        getPacks().then((packsMap) => this.packsMap = packsMap);
    },
    data(){
        return {
            packsMap: {},
        };
    },
    computed: {
        packs(){
            return Object.keys(this.packsMap).map((key) => this.packsMap[key]);
        },
    },
};
</script>