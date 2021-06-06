<template>
<div>
    <div 
        class="container"
        v-if="isFinishedLoading"
    >
        <header class="header">
            <site-title></site-title>
        </header>
        <main :class="$style.main">
            <router-view
                :packs-map="packsMap"
                :media-id="mediaId"
                :patch-tags-set="patchTagsSet"
                @audio-start="startAudio"
                @audio-stop="stopAudio"
            />
        </main>
    </div>
    <loading-indicator
        v-if="!isFinishedLoading"
     />
     <media-controls 
        v-if="isFinishedLoading"
        :title="audioTitle"
     />
</div>
</template>

<style lang="scss" module>
.main{
    margin-top: 1.5rem;
	padding-bottom: 10em;
}
</style>

<script>
import { getPacks } from '../ajax.js';
import SiteTitle from './common/site-title.vue';
import LoadingIndicator from './common/loading-indicator.vue';
import MediaControls from './common/media-controls.vue';

let audio = null;

export default {
    components: {
        SiteTitle,
        LoadingIndicator,
        MediaControls,
    },
    created(){
        audio = new Audio();
        audio.addEventListener('loadeddata', () => {
            this.audioLoaded = true;
        });
        audio.addEventListener('ended', () => {
            this.clearAudioDisplay();
        });
        getPacks().then(({packsMap, patchTagsSet}) => {
            this.packsMap = packsMap;
            this.patchTagsSet = patchTagsSet;
        });
    },
    data(){
        return {
            packsMap: null,
            patchTagsSet: null,
            mediaTitle: '',
            mediaId: null,
            audioLoaded: false,
        };
    },
    computed: {
        isFinishedLoading(){
            return this.packsMap !== null;
        },
        audioTitle(){
            if(!this.mediaTitle){
                return '';
            }
            return this.audioLoaded ? this.mediaTitle : 'Loading…';
        },
    },
    methods: {
        startAudio({title, url, id}){
            this.mediaId = id;
            this.mediaTitle = title;
            audio.src = url;
            this.audioLoaded = false;
            audio.load();
            audio.play();
        },
        stopAudio(){
            this.clearAudioDisplay();
            audio.pause();
        },
        clearAudioDisplay(){
            this.mediaId = null;
            this.mediaTitle = '';
        }
    },
};
</script>