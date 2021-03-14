<template>
<div>
    <router-view
        :packs-map="packsMap"
        @audio-start="startAudio"
        @audio-stop="stopAudio"
        v-if="isFinishedLoading"
    />
    <loading-indicator
        v-if="!isFinishedLoading"
     />
</div>
</template>

<style lang="scss" module>
</style>

<script>
import { getPacks } from '../ajax.js';
import LoadingIndicator from './common/loading-indicator.vue';

let audio = null;

export default {
    components: {
        LoadingIndicator,
    },
    created(){
        audio = new Audio();
        getPacks().then((packsMap) => this.packsMap = packsMap);
    },
    data(){
        return {
            packsMap: null,
        };
    },
    computed: {
        isFinishedLoading(){
            return this.packsMap !== null;
        },
    },
    methods: {
        startAudio({title, url}){
            audio.src = url;
            audio.load();
            audio.play();
        },
        stopAudio(){
            audio.pause();
        },
    },
};
</script>