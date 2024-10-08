<template>
<ul>
    <li 
        v-for="patch in patches" 
        :key="patch.id"
        :class="$style.patch"
    >
        <span :class="$style.iconContainer">
            <button @click="patchClicked(patch)" :disabled="!patchHasAudioPreview(patch)">
                <svg 
                    :class="[$style.icon, patchHasAudioPreview(patch) && $style.enabledIcon]"
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
            </button>
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
                    v-for="device of devicesForPack(patch.devices)"
                    :key="device"
                    :class="deviceClass(device)"
                >
                    {{ device }}
                </li>
            </ul>
            <reason-plus-link 
                :class="$style.reasonPlusLink"
                :pack-id="getPack(patch).id"
                v-if="shouldShowReasonPlusLink"
            />
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

.deviceList, .reasonPlusLink {
    font-size: 0.8rem;
}

.deviceList {
    display: flex;
    flex-wrap: wrap;
    color: #888;
}

.device {
    margin-right: 1em;
}

.instrumentDevice {
    color: #7c564b;
}

@media (prefers-color-scheme: dark) {
    .icon {
        color: #fff;
    }

    .instrumentDevice {
        color: #a97c70;
    }
}
</style>

<script>
import { isMediaPlaying } from '../models/media-helpers';
import ReasonPlusLink from '../common/reason-plus-link.vue';
import { sortDevices } from '../../devices';
import { isInstrument } from '../../devices';

export default {
    props: {
        patches: {
            type: Array,
            required: true,
        },
        mediaId: {
            required: true,
        },
        playState: {
            type: Number,
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
        shouldShowReasonPlusLink: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        ReasonPlusLink,
    },
    methods: {
        patchId(patch){
            return patch.id;
        },
        patchHasAudioPreview(patch){
            return !!patch.previewUrl;
        },
        isPatchPlaying(patch){
            return isMediaPlaying(this.patchId(patch), this.mediaId, this.playState);
        },
        patchClicked(patch){
            if(!this.patchHasAudioPreview(patch)){
                return;
            }
            if(this.isPatchPlaying(patch)){
                this.$emit('audioStop');
            }
            else {
                const pack = this.getPack(patch);
                
                this.$emit('audioStart', {
                    url: patch.previewUrl,
                    title: {
                        packId: pack.id,
                        subtitle: patch.name,
                        packTitle: pack.title,
                    },
                    id: this.patchId(patch),
                });
            }
        },
        devicesForPack(devices){
            return sortDevices(Array.from(devices));
        },
        deviceClass(device){
            return {
                [this.$style.device]: true,
                [this.$style.instrumentDevice]: isInstrument(device),
            };
        },
    },
};
</script>