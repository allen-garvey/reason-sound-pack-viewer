<template>
<div>
    <div 
        class="container"
        v-if="isFinishedLoading"
    >
        <header class="header">
            <site-title></site-title>
            <nav :class="$style.nav">
                <ul :class="$style.navList">
                    <li>
                        <router-link
                            :to="{name: 'packsIndex'}"
                            :active-class="$style.navActive">Packs</router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'creatorsIndex'}"
                            :active-class="$style.navActive">Creators</router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'devicesIndex'}"
                            :active-class="$style.navActive">Devices</router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'packTagsIndex'}"
                            :active-class="$style.navActive">Pack Tags</router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'patchTagsIndex'}"
                            :active-class="$style.navActive">Patch Tags</router-link>
                    </li>
                </ul>
            </nav>
        </header>
        <main :class="$style.main">
            <router-view
                :packs-map="packsMap"
                :media-id="mediaId"
                :patch-tags-set="patchTagsSet"
                :pack-tags-set="packTagsSet"
                :patch-devices-set="patchDevicesSet"
                :play-state="playState"
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
        :play-state="playState"
        :media-id="mediaId"
        @audio-restart="restartAudio"
        @audio-stop="stopAudio"
     />
</div>
</template>

<style lang="scss" module>
.main {
    margin-top: 1.5rem;
	padding-bottom: 10em;
}

.nav {
    margin-top: 0.5em;
}

.navList {
    display: flex;

    li + li {
        margin-left: 1em;
    }
}

.navActive {
    color: red;
}
</style>

<script>
import { getPacks } from '../ajax.js';
import playStates from './models/play-states';
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
            this.playState = playStates.IS_PLAYING;
        });
        audio.addEventListener('ended', () => {
            this.playState = playStates.IS_PAUSED;
        });
        getPacks().then(({packsMap, packTagsSet, patchTagsSet, patchDevicesSet}) => {
            this.packsMap = packsMap;
            this.packTagsSet = packTagsSet;
            this.patchTagsSet = patchTagsSet;
            this.patchDevicesSet = patchDevicesSet;
        });
    },
    data(){
        return {
            packsMap: null,
            packTagsSet: null,
            patchTagsSet: null,
            patchDevicesSet: null,
            mediaTitle: '',
            mediaId: null,
            playState: playStates.IS_EMPTY,
        };
    },
    computed: {
        isFinishedLoading(){
            return this.packsMap !== null;
        },
        audioTitle(){
            switch(this.playState){
                case playStates.IS_EMPTY:
                    return '';
                case playStates.IS_LOADING:
                    return 'Loading…';
                default:
                    return this.mediaTitle;
            }
        },
    },
    methods: {
        startAudio({title, url, id}){
            if(this.mediaId !== id){
                this.mediaId = id;
                this.mediaTitle = title;
                audio.src = url;
                this.playState = playStates.IS_LOADING;
                audio.load();
                audio.play();
            }
            else {
                this.restartAudio();
            }
        },
        stopAudio(){
            this.playState = playStates.IS_PAUSED;
            audio.pause();
        },
        restartAudio(){
            this.playState = playStates.IS_PLAYING;
            audio.play();
        },
    },
};
</script>