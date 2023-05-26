<template>
<div>
    <h2 :class="$style.title">{{ pack.title }}</h2>
    <cover-image
        :class="$style.coverImageContainer"
        :is-playing="isPackPlaying"
        :src="pack.coverPhoto"
        :pack-title="pack.title"
        @controls-clicked="packClicked(pack)"
    />
    <p>
        <router-link
            :to="{name: 'creatorsShow', params: {id: pack.author}}"
        >{{ pack.author }}
        </router-link>
    </p>
    <p>{{ pack.description }}</p>
    <dl>
        <dt>Created:</dt>
        <dd>{{ pack.created }}</dd>
    </dl>
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
    <reason-plus-link
        :class="$style.reasonPlusLink"
        :pack-id="pack.id"
    />
    <patch-list 
        :patches="pack.patches"
        :media-id="mediaId"
        :play-state="playState"
        :get-pack="() => pack"
        @audio-start="bubbleAudioStart"
        @audio-stop="bubbleAudioStop"
    />
</div>
</template>

<style lang="scss" module>
$cover-image-dimensions: 300px;

.title {
    // margin-bottom: 8px;
    margin-bottom: 0.4rem;
}

.coverImageContainer {
    height: $cover-image-dimensions;
    width: $cover-image-dimensions;
}

.tagsHeading {
    margin: 0;
}

dl {
    display: flex;
    dt {
        min-width: 4em;
    }
    dd {
        margin-left: 1.35em;
    }
}

.tagsList {
    display: flex;
    margin: 0 0 1em;

    li + li {
        margin-left: 1em;
    }
}

.reasonPlusLink {
    margin: 0 0 2em;
}

</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../../jukebox.js';
import { isMediaPlaying } from '../../models/media-helpers';
import bubbleAudioEventsMixinBuilder from '../../mixins/bubble-audio-events';
import CoverImage from '../../common/cover-image.vue';
import PatchList from '../../common/patch-list.vue';
import ReasonPlusLink from '../../common/reason-plus-link.vue';

export default {
    props: {
        packsMap: {
            type: Object,
            required: true,
        },
        mediaId: {
            required: true,
        },
        playState: {
            type: Number,
            required: true,
        },
    },
    components: {
        CoverImage,
        PatchList,
        ReasonPlusLink,
    },
    mixins: [bubbleAudioEventsMixinBuilder()],
    computed: {
        pack(){
            return this.packsMap[this.$route.params.id];
        },
        isPackPlaying(){
            return isMediaPlaying(this.pack.id, this.mediaId, this.playState);
        },
        tags(){
            return Array.from(this.pack.tags.values()).sort();
        },
        packSize(){
            return `${(this.pack.size / 1048576).toFixed(2)} MB`;
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