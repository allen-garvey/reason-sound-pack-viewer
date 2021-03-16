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
        <ul>
            <li 
                v-for="patch in pack.patches" 
                :key="patch.id"
                :class="$style.patch"
            >
                <span :class="$style.iconContainer" @click="patchClicked(patch)">
                    <svg :class="$style.icon">
                        <use xlink:href="#icon-play" v-if="!isPatchPlaying(patch)" />
                        <use xlink:href="#icon-pause" v-if="isPatchPlaying(patch)" />
                    </svg>
                </span>
                <span>{{ patch.name }}</span>
            </li>
        </ul>
    </main>
</div>
</template>

<style lang="scss" module>
$icon-controls-dimensions: 40px;
$cover-image-dimensions: 300px;

.main{
	padding-bottom: 10em;
}

.coverImageContainer {
    height: $cover-image-dimensions;
    width: $cover-image-dimensions;
}

.patch {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 0 0 1em;
}

.iconContainer {
    cursor: pointer;
    display: inline-block;
    margin-right: 2rem;
    height: $icon-controls-dimensions;
    width: $icon-controls-dimensions;

    &:hover {
        color: #666;
    }
}

.icon {
    max-height: 100%;
    max-width: 100%;
}
</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../jukebox.js';
import SiteTitle from '../common/site-title.vue';
import CoverImage from '../common/cover-image.vue';

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
    },
    data(){
        return {
        };
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
        patchId(patch){
            return `${this.pack.id}-${patch.id}`;
        },
        isPatchPlaying(patch){
            return this.patchId(patch) === this.mediaId;
        },
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
        packClicked(pack){
            if(this.isPackPlaying){
                this.$emit('audioStop');
            }
            else {
                this.$emit('audioStart', {
                    url: `${AUDIO_PREVIEW_URL_PREFIX}${this.pack.previewUrl}`,
                    title: this.pack.title,
                    id: this.pack.id,
                });
            }
        },
    },
};
</script>