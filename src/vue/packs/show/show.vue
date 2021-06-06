<template>
<div class="container">
    <header class="header">
        <site-title></site-title>
    </header>
    <main :class="$style['main']">
        <h2>{{ pack.title }}</h2>
        <cover-image
            :class="$style.coverImageContainer"
            :is-playing="isPackPlaying"
            :src="pack.coverPhoto"
            @controls-clicked="packClicked(pack)"
        />
        <p>{{ pack.author }}</p>
        <p>{{ pack.description }}</p>
        <patch-list 
            :patches="pack.patches"
            :media-id="mediaId"
            :parent-name="pack.title"
            @audio-start="bubbleAudioStart"
            @audio-stop="bubbleAudioStop"
        />
    </main>
</div>
</template>

<style lang="scss" module>
$cover-image-dimensions: 300px;

.main{
	padding-bottom: 10em;
}

.coverImageContainer {
    height: $cover-image-dimensions;
    width: $cover-image-dimensions;
}

</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../../jukebox.js';
import SiteTitle from '../../common/site-title.vue';
import CoverImage from '../../common/cover-image.vue';
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
        CoverImage,
        PatchList,
    },
    computed: {
        pack(){
            return this.packsMap[this.$route.params.id];
        },
        isPackPlaying(){
            return this.pack.id === this.mediaId;
        }
    },
    methods: {
        patchClicked(patch){
            if(this.isPatchPlaying(patch)){
                this.$emit('audioStop');
            }
            else {
                this.$emit('audioStart', {
                    url: `${AUDIO_PREVIEW_URL_PREFIX}${patch.previewUrl}`,
                    title: `${this.pack.title} - ${patch.name}`,
                    id: this.patchId(patch),
                });
            }
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