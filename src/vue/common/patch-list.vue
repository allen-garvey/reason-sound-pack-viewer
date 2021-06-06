<template>
<ul>
    <li 
        v-for="patch in patches" 
        :key="patch.id"
        :class="$style.patch"
    >
        <span :class="$style.iconContainer" @click="patchClicked(patch)">
            <svg :class="$style.icon">
                <use xlink:href="#icon-play" v-if="!isPatchPlaying(patch)" />
                <use xlink:href="#icon-pause" v-if="isPatchPlaying(patch)" />
            </svg>
        </span>
        <span :class="$style.patchName">{{ patch.name }}</span>
        <router-link 
            :to="{name: 'packsShow', params: {id: getPack(patch).id}}"
            :class="$style.packLink"
            v-if="shouldShowPackLink"
        >
            {{ getPack(patch).title }}
        </router-link>
    </li>
</ul>
</template>

<style lang="scss" module>
$icon-controls-dimensions: 40px;

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

.patchName {
    min-width: 13em;
}

.packLink {
    margin-left: 2em;
}
</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../jukebox.js';

export default {
    props: {
        patches: {
            type: Array,
            required: true,
        },
        mediaId: {
            required: true,
        },
        getPack: {
            type: Function,
            required: true,
        },
        shouldShowPackLink: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        patchId(patch){
            return patch.id;
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
                    title: `${this.getPack(patch).title} - ${patch.name}`,
                    id: this.patchId(patch),
                });
            }
        },
    },
};
</script>