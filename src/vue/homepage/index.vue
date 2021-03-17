<template>
<div class="container">
    <header class="header">
        <site-title></site-title>
    </header>
    <main :class="$style['main']">
        <pack-list
            :packs="packs"
            :is-pack-playing="isPackPlaying"
            @pack-clicked="packClicked"
        >
        </pack-list>
    </main>
</div>
</template>

<style lang="scss" module>
.main{
    margin-top: 1.5rem;
	padding-bottom: 10em;
}
</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../jukebox.js';
import SiteTitle from '../common/site-title.vue';
import PackList from './pack-list.vue';

export default {
    props: {
        packsMap: {
            type: Object,
            required: true,
        },
        mediaId: {
            required: true,
        },
    },
    components: {
        SiteTitle,
        PackList,
    },
    data(){
        return {
        };
    },
    computed: {
        packs(){
            return Object.keys(this.packsMap).reverse().map((key) => this.packsMap[key]);
        },
    },
    methods: {
        isPackPlaying(packId){
            return packId === this.mediaId;
        },
        packClicked(packId){
            if(this.isPackPlaying(packId)){
                this.$emit('audioStop');
            }
            else{
                const pack = this.packsMap[packId];
                this.$emit('audioStart', {
                    url: `${AUDIO_PREVIEW_URL_PREFIX}${pack.previewUrl}`,
                    title: pack.title,
                    id: pack.id,
                });
            }
        },
    },
};
</script>