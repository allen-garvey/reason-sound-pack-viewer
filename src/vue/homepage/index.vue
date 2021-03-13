<template>
<div class="container">
    <header class="header">
        <site-title></site-title>
    </header>
    <main :class="$style['main']">
        <pack-list
            :packs="packs"
            @pack-clicked="packClicked"
        >
        </pack-list>
    </main>
</div>
</template>

<style lang="scss" module>
.main{
	padding-bottom: 10em;
}
</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../jukebox.js';
import { getPacks } from '../../ajax.js';
import SiteTitle from '../common/site-title.vue';
import PackList from './pack-list.vue';

let audio = null;

export default {
    props: {
        
    },
    components: {
        SiteTitle,
        PackList,
    },
    created(){
        getPacks().then((packsMap) => this.packsMap = packsMap);
        audio = new Audio();
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
    methods: {
        packClicked(packId){
            const pack = this.packsMap[packId];
            audio.src = `${AUDIO_PREVIEW_URL_PREFIX}${pack.previewUrl}`;
            audio.load();
            audio.play();
        },
    },
};
</script>