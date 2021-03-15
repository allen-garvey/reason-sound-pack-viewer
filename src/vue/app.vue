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
     <media-controls 
        v-if="isFinishedLoading"
        :title="mediaTitle"
     />
</div>
</template>

<style lang="scss" module>
</style>

<script>
import { getPacks } from '../ajax.js';
import LoadingIndicator from './common/loading-indicator.vue';
import MediaControls from './common/media-controls.vue';

let audio = null;

export default {
    components: {
        LoadingIndicator,
        MediaControls,
    },
    created(){
        audio = new Audio();
        getPacks().then((packsMap) => this.packsMap = packsMap);
    },
    data(){
        return {
            packsMap: null,
            mediaTitle: '',
        };
    },
    computed: {
        isFinishedLoading(){
            return this.packsMap !== null;
        },
    },
    methods: {
        startAudio({title, url}){
            this.mediaTitle = title;
            audio.src = url;
            audio.load();
            audio.play();
        },
        stopAudio(){
            this.mediaTitle = '';
            audio.pause();
        },
    },
};
</script>