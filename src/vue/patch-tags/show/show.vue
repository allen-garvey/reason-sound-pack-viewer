<template>
<patch-list 
    :patches="patches"
    :media-id="mediaId"
    :parent-name="patchKey"
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
            return Object.keys(this.packsMap).map((packKey) => this.packsMap[packKey].patches.filter(patch => patch.tags.has(this.patchKey))).flat();
        },
    },
    methods: {
        bubbleAudioStart(event){
            this.$emit('audioStart', event);
        },
        bubbleAudioStop(event){
            this.$emit('audioStop');
        },
    },
};
</script>