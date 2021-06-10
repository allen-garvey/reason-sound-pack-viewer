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
                            :to="{name: 'packTagsIndex'}"
                            :active-class="$style.navActive">Pack Tags</router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'patchTagsIndex'}"
                            :active-class="$style.navActive">Patch Tags</router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'creatorsIndex'}"
                            :active-class="$style.navActive">Creators</router-link>
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