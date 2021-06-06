<template>
<patch-list 
    :patches="patches"
    :media-id="mediaId"
    :get-pack="getPackForPatch"
    @audio-start="bubbleAudioStart"
    @audio-stop="bubbleAudioStop"
/>
</template>

<style lang="scss" module>
</style>

<script>
import PatchList from '../../common/patch-list.vue';

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
        PatchList,
    },
    data(){
        return {
        };
    },
    computed: {
        patchKey(){
            return this.$route.params.id;
        },
        patches(){
            return Object.keys(this.packsMap)
                .map((packKey) => {
                    const pack = this.packsMap[packKey];
                    return pack.patches
                    .filter(patch => patch.tags.has(this.patchKey))
                    .map(patch => {
                        patch.packId = pack.id;
                        return patch;
                    })
                }).flat();
        },
    },
    methods: {
        getPackForPatch(patch){
            return this.packsMap[patch.packId];
        },
        bubbleAudioStart(event){
            this.$emit('audioStart', event);
        },
        bubbleAudioStop(event){
            this.$emit('audioStop');
        },
    },
};
</script>