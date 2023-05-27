<template>
<div>
    <div :class="$style.heading">
        <h2>{{ title }} <items-count :count="packs.length" /></h2>
        <div :class="$style.externalUrl" v-if="externalUrl">
            <a :href="externalUrl" target="_blank" rel="noopener">Website</a>
        </div>
    </div>
    <pack-list
        :packs="packs"
        :is-pack-playing="isPackPlaying"
        @pack-clicked="packClicked"
    />
</div>
</template>

<style lang="scss" module>
    .heading {
        margin-bottom: 1rem;
    }

    .externalUrl {
        margin-top: 0.5rem;
    }
</style>

<script>
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
        externalUrl: {
            type: String,
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
                    url: pack.previewUrl,
                    title: pack.title,
                    id: pack.id,
                });
            }
        },
    },
};
</script>