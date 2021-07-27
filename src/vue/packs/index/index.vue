<template>
<div>
    <h2>{{ title }} <items-count :count="packs.length" /></h2>
    <pack-list
        :packs="packs"
        :is-pack-playing="isPackPlaying"
        @pack-clicked="packClicked"
    />
</div>
</template>

<style lang="scss" module>

</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../../jukebox.js';
import { isMediaPlaying } from '../../models/media-helpers';
import PackList from './pack-list.vue';
import ItemsCount from '../../common/items-count.vue';

export default {
    props: {
        packsMap: {
            type: Object,
            required: true,
        },
        creatorsMap: {
            type: Map,
            required: true,
        },
        packTagsMap: {
            type: Map,
            required: true,
        },
        mediaId: {
            required: true,
        },
        playState: {
            type: Number,
            required: true,
        },
        getPacks: {
            type: Function,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    components: {
        PackList,
        ItemsCount,
    },
    data(){
        return {
        };
    },
    computed: {
        packs(){
            return this.getPacks();
        },
    },
    methods: {
        isPackPlaying(packId){
            return isMediaPlaying(packId, this.mediaId, this.playState);
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