<template>
<ul>
    <li 
        v-for="patch in patches" 
        :key="patch.id"
        :class="$style.patch"
    >
        <span :class="$style.iconContainer">
            <svg 
                :class="[$style.icon, patchHasAudioPreview(patch) && $style.enabledIcon]"
                @click="patchClicked(patch)"
                viewBox="0 0 24 24"
            >
                <use 
                    xlink:href="#icon-play"
                    v-if="!isPatchPlaying(patch) && patchHasAudioPreview(patch)" />
                <use 
                    xlink:href="#icon-pause"
                    v-if="isPatchPlaying(patch)" />
                <use 
                    xlink:href="#icon-x"
                    v-if="!patchHasAudioPreview(patch)" />
            </svg>
        </span>
        <div>
            <div>
                <span :class="$style.patchName">{{ patch.name }}</span>
                <router-link 
                    :to="{name: 'packsShow', params: {id: getPack(patch).id}}"
                    :class="$style.packLink"
                    v-if="shouldShowPackLink"
                >
                    {{ getPack(patch).title }}
                </router-link>
            </div>
            <ul :class="$style.deviceList">
                <li
                    v-for="device of patch.devices"
                    :key="device"
                    :class="$style.device"
                >
                    {{ device }}
                </li>
            </ul>
        </div>
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
    display: inline-block;
    margin-right: 2rem;
    height: $icon-controls-dimensions;
    width: $icon-controls-dimensions;
}

.icon {
    max-height: 100%;
    width: $icon-controls-dimensions;
    opacity: 0.3;

    &.enabledIcon {
        cursor: pointer;
        opacity: 1;
        
        &:hover {
            color: #666;
        }
    }
}

.patchName {
    min-width: 13em;
}

.packLink {
    margin-left: 2em;
}

.deviceList {
    display: flex;
    flex-wrap: wrap;
    color: #888;
    font-size: 0.8rem;
}

.device {
    margin-right: 1em;
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
        patchHasAudioPreview(patch){
            return !!patch.previewUrl;
        },
        isPatchPlaying(patch){
            return this.patchId(patch) === this.mediaId;
        },
        patchClicked(patch){
            if(!this.patchHasAudioPreview(patch)){
                return;
            }
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