<template>
<pack-list
    :packs="packs"
    :is-pack-playing="isPackPlaying"
    @pack-clicked="packClicked"
/>
</template>

<style lang="scss" module>
</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../../jukebox.js';
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