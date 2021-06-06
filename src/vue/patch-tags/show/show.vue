<template>
<div class="container">
    <header class="header">
        <site-title></site-title>
    </header>
    <main :class="$style['main']">
        <patch-list 
            :patches="patches"
            :media-id="mediaId"
            :parent-name="patchKey"
            @audio-start="bubbleAudioStart"
            @audio-stop="bubbleAudioStop"
        />
    </main>
</div>
</template>

<style lang="scss" module>
.main {
    margin-top: 1.5rem;
	padding-bottom: 10em;
}
</style>

<script>
import SiteTitle from '../../common/site-title.vue';
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
        SiteTitle,
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