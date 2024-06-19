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
        :audio-volume="audioVolume"
        :current-audio-time="currentAudioTime"
        :audio-length="audioLength"
        :is-audio-loaded="isAudioLoaded"
        :on-track-seek-requested="setCurrentTrackTime"
        @audio-restart="restartAudio"
        @audio-stop="stopAudio"
        @volume-changed="adjustVolume"
     />
</div>
</template>

<style lang="scss" module>
.main {
    margin-top: 1.25rem;
	padding-bottom: 8rem;
}

.subtitle {
    margin: 0.1em 0 0;
    font-size: 0.8rem;
}

.nav {
    margin-top: 1em;
}

.navList {
    display: flex;
    flex-wrap: wrap;

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
            this.audioLength = Math.floor(audio.duration);
        });
        audio.addEventListener('ended', () => {
            this.playState = playStates.IS_PAUSED;
        });
        audio.addEventListener('timeupdate', (e) => {
			this.currentAudioTime = Math.floor(e.target.currentTime);
		});
        audio.addEventListener('error', (e) => {
            this.playState = playStates.IS_ERROR;
            this.mediaId = null;
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
            mediaTitle: null,
            mediaId: null,
            playState: playStates.IS_EMPTY,
            audioVolume: 0,
            audioLength: 0,
            currentAudioTime: 0,
        };
    },
    computed: {
        isFinishedLoading(){
            return this.packsMap !== null;
        },
        audioTitle(){
            switch(this.playState){
                case playStates.IS_EMPTY:
                    return null;
                case playStates.IS_ERROR:
                    return {
                        message: 'There was an error loading the audio preview', 
                    };
                case playStates.IS_LOADING:
                    return {
                        message: 'Loading…',
                    };
                default:
                    return this.mediaTitle;
            }
        },
        isAudioLoaded(){
            return this.playState === playStates.IS_PAUSED || this.playState === playStates.IS_PLAYING;
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
        setCurrentTrackTime(seconds){
            audio.currentTime = seconds;
        },
    },
};
</script>