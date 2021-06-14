<template>
<div>
    <h2>{{ pack.title }}</h2>
    <cover-image
        :class="$style.coverImageContainer"
        :is-playing="isPackPlaying"
        :src="pack.coverPhoto"
        @controls-clicked="packClicked(pack)"
    />
    <p>{{ pack.author }}</p>
    <p>{{ pack.description }}</p>
    <dl>
        <dt>Size:</dt>
        <dd>{{ packSize }}</dd>
    </dl>
    <ul :class="$style.tagsList">
        <li><h4 :class="$style.tagsHeading">Tags:</h4></li>
        <li
            v-for="tag in tags"
            :key="tag"
        >
            <router-link :to="{name: 'packTagsShow', params: {id: tag}}">{{ tag }}</router-link>
        </li>
    </ul>
    <patch-list 
        :patches="pack.patches"
        :media-id="mediaId"
        :get-pack="() => pack"
        @audio-start="bubbleAudioStart"
        @audio-stop="bubbleAudioStop"
    />
</div>
</template>

<style lang="scss" module>
$cover-image-dimensions: 300px;

.coverImageContainer {
    height: $cover-image-dimensions;
    width: $cover-image-dimensions;
}

.tagsHeading {
    margin: 0;
}

dl {
    display: flex;
    dd {
        margin-left: 1.35em;
    }
}

.tagsList {
    display: flex;
    margin: 0 0 2em;

    li + li {
        margin-left: 1em;
    }
}

</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../../jukebox.js';
import bubbleAudioEventsMixinBuilder from '../../mixins/bubble-audio-events';
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
        CoverImage,
        PatchList,
    },
    mixins: [bubbleAudioEventsMixinBuilder()],
    computed: {
        pack(){
            return this.packsMap[this.$route.params.id];
        },
        isPackPlaying(){
            return this.pack.id === this.mediaId;
        },
        tags(){
            return Array.from(this.pack.tags.entries()).map(([key, dup]) => key).sort();
        },
        packSize(){
            return `${(this.pack.size / 1000000).toFixed(2)} MB`;
        },
    },
    methods: {
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