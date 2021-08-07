<template>
<div>
    <div 
        class="container"
        v-if="isFinishedLoading"
    >
        <header>
            <site-title></site-title>
            <div :class="$style.subtitle">
                Preview the sound packs included with <a href="https://www.reasonstudios.com/" target="_blank" rel="noopener">Reason+</a>
            </div>
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
                :creators-map="creatorsMap"
                :media-id="mediaId"
                :patch-tags-map="patchTagsMap"
                :pack-tags-map="packTagsMap"
                :patch-devices-map="patchDevicesMap"
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
        :audio-volume="audioVolume"
        @audio-restart="restartAudio"
        @audio-stop="stopAudio"
        @volume-changed="adjustVolume"
     />
</div>
</template>

<style lang="scss" module>
.main {
    margin-top: 1.5rem;
	padding-bottom: 8em;
}

.subtitle {
    margin: 0.5em 0 0;
}

.nav {
    margin-top: 0.5em;
}

.navList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1em;

    li {
        width: 50%;
        margin-bottom: 1em;
    }

    @media screen and (min-width: 418px) {
        li {
            width: auto;
            margin-bottom: 1em;
        }

        li + li {
            margin-left: 1em;
        }
    }
}

.navActive {
    color: red;
}
</style>

<script>
import { getPacks } from '../ajax.js';
import userSettings from '../user-settings';
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
        this.audioVolume = userSettings.getUserVolume();
        audio.addEventListener('loadeddata', () => {
            this.playState = playStates.IS_PLAYING;
            audio.volume = this.audioVolume;
        });
        audio.addEventListener('ended', () => {
            this.playState = playStates.IS_PAUSED;
        });
        getPacks().then(({packsMap, packTagsMap, patchTagsMap, patchDevicesMap, creatorsMap}) => {
            this.packsMap = packsMap;
            this.packTagsMap = packTagsMap;
            this.patchTagsMap = patchTagsMap;
            this.patchDevicesMap = patchDevicesMap;
            this.creatorsMap = creatorsMap;
        });
    },
    data(){
        return {
            packsMap: null,
            packTagsMap: null,
            patchTagsMap: null,
            patchDevicesMap: null,
            creatorsMap: null,
            mediaTitle: '',
            mediaId: null,
            playState: playStates.IS_EMPTY,
            audioVolume: 0,
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
        adjustVolume(value){
            audio.volume = value;
            this.audioVolume = value;
            userSettings.saveUserVolume(value);
        },
    },
};
</script>