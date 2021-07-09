<template>
    <div :class="$style.container">
        <div
            :class="$style.buttonContainer"
            v-if="hasAudio"
        >
            <button @click="buttonClicked" tabindex="1">
                <svg 
                    :class="$style.icon"
                    viewBox="0 0 24 24"
                >
                    <use 
                        xlink:href="#icon-play"
                        v-if="isPaused" />
                    <use 
                        xlink:href="#icon-pause"
                        v-if="isPlaying" />
                </svg>
            </button>
        </div>
        <div>
            {{ title }}
        </div>
        <div :class="$style.volumeContainer" v-show="!isAudioEmpty">
            <svg 
                :class="$style.volumeIcon"
                viewBox="0 0 24 24"
            >
                <use 
                    xlink:href="#icon-volume"
                    v-if="audioVolume === 0" />
                <use 
                    xlink:href="#icon-volume-1"
                    v-else-if="audioVolume <= 0.6" />
                <use 
                    xlink:href="#icon-volume-2"
                    v-else />
            </svg>
             <input 
                tabindex="2"
                type="range"
                min="0"
                max="1"
                :value="audioVolume"
                step="0.05"
                :class="$style.volumeInput"
                @input="$emit('volumeChanged', parseFloat($event.target.value))"
            />
        </div>
    </div>
</template>

<style lang="scss" module>
$icon-controls-dimensions: 40px;

.container {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3.5em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #541604;
    color: #fff;
}

.buttonContainer {
    max-height: 100%;
    margin-right: 1em;

    button {
        color: #fff;
    }
}

.icon {
    max-height: 100%;
    width: $icon-controls-dimensions;
    cursor: pointer;
    
    &:hover {
        color: #888;
    }
}

.volumeContainer {
    display: flex;
    align-items: center;
    margin-left: 40px;
}

.volumeIcon {
    margin-right: 5px;
    max-height: 100%;
    width: 24px;
}

.volumeInput {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    background: greenyellow;
    border-radius: 5px;
    height: 10px;
    width: 100px;

    $volume-slider-handle-color: gray;
    $volume-slider-dimensions: 15px;
    $volume-slider-border-radius: 50%;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        
        width: $volume-slider-dimensions;
        height: $volume-slider-dimensions;
        border-radius: $volume-slider-border-radius;
        background: $volume-slider-handle-color;
    }

    &::-moz-range-thumb {
        width: $volume-slider-dimensions;
        height: $volume-slider-dimensions;
        border-radius: $volume-slider-border-radius;
        background: $volume-slider-handle-color;
    }
}
</style>

<script>
import playStates from '../models/play-states';

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        playState: {
            type: Number,
            required: true,
        },
        mediaId: {
            required: true,
        },
        audioVolume: {
            type: Number,
            required: true,
        },
    },
    computed: {
        isAudioEmpty(){
            return this.playState === playStates.IS_EMPTY;
        },
        hasAudio(){
            return this.playState !== playStates.IS_EMPTY && this.playState !== playStates.IS_LOADING;
        },
        isPlaying(){
            return this.playState === playStates.IS_PLAYING;
        },
        isPaused(){
            return this.playState === playStates.IS_PAUSED;
        },
        isLoading(){
            return this.playState === playStates.IS_LOADING;
        },
    },
    methods: {
        buttonClicked(){
            if(this.playState === playStates.IS_PAUSED){
                this.$emit('audioRestart');
            }
            else {
                this.$emit('audioStop');
            }
        }
    }
};
</script>